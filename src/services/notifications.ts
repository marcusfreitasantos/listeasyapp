import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useTranslation } from "react-i18next";

import { Platform } from "react-native";
import {
  arrayUnion,
  doc,
  getFirestore,
  serverTimestamp,
  setDoc,
} from "@react-native-firebase/firestore";
import {
  logAnalyticsEvent,
  logHandledError,
} from "@/src/services/observability";

const defaultNotificationChannelId = "default";

type NotificationContentData = Record<string, unknown>;

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const getProjectId = (): string | undefined =>
  Constants.expoConfig?.extra?.eas?.projectId ?? Constants.easConfig?.projectId;

const allowsNotifications = (
  permissions: Notifications.NotificationPermissionsStatus,
): boolean => {
  const permissionStatus =
    permissions as Notifications.NotificationPermissionsStatus & {
      granted?: boolean;
    };

  return (
    Boolean(permissionStatus.granted) ||
    permissions.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
  );
};

const getMessageContent = (
  content: Notifications.NotificationContent,
): string => {
  const title = content.title ?? "";
  const body = content.body ?? "";

  return [title, body].filter(Boolean).join(" - ");
};

const stringifyNotificationData = (data: NotificationContentData): string => {
  try {
    return JSON.stringify(data);
  } catch {
    return "{}";
  }
};

export const configureAndroidNotificationChannel = async (): Promise<void> => {
  if (Platform.OS !== "android") return;

  await Notifications.setNotificationChannelAsync(
    defaultNotificationChannelId,
    {
      name: "Default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#222222",
      enableVibrate: true,
      lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
    },
  );
};

export const registerForPushNotifications = async (
  userUid: string,
): Promise<string | null> => {
  try {
    await configureAndroidNotificationChannel();

    if (!Device.isDevice) {
      if (__DEV__)
        console.warn("Push notifications require a physical device.");
      return null;
    }

    const existingPermissions = await Notifications.getPermissionsAsync();
    let hasPermission = allowsNotifications(existingPermissions);

    if (!hasPermission) {
      const requestedPermissions =
        await Notifications.requestPermissionsAsync();
      hasPermission = allowsNotifications(requestedPermissions);
    }

    if (!hasPermission) {
      await logAnalyticsEvent("push_notification_permission_denied", {
        userUid,
      });
      return null;
    }

    const projectId = getProjectId();

    if (!projectId) {
      throw new Error("Expo project id was not found.");
    }

    const token = (
      await Notifications.getExpoPushTokenAsync({
        projectId,
      })
    ).data;

    const userRef = doc(getFirestore(), "Users", userUid);
    const { i18n } = useTranslation();

    await setDoc(
      userRef,
      {
        expoPushToken: token,
        expoPushTokens: arrayUnion(token),
        notificationPlatform: Platform.OS,
        notificationsUpdatedAt: serverTimestamp(),
        userLanguage: i18n.language,
      },
      { merge: true },
    );

    await logAnalyticsEvent("push_notification_registered", {
      userUid,
      platform: Platform.OS,
    });

    return token;
  } catch (error) {
    await logHandledError("register_push_notifications", error, { userUid });
    return null;
  }
};

export const logNotificationOpened = async (
  response: Notifications.NotificationResponse,
  fallbackUserUid?: string,
): Promise<void> => {
  const content = response.notification.request.content;
  const data = (content.data ?? {}) as NotificationContentData;
  const userUid =
    typeof data.userUid === "string" ? data.userUid : (fallbackUserUid ?? "");

  await logAnalyticsEvent("notification_opened", {
    userUid,
    notification_title: content.title ?? "",
    notification_message_content: getMessageContent(content),
    notification_data: stringifyNotificationData(data),
  });
};

export const addNotificationOpenedListener = (
  handler: (response: Notifications.NotificationResponse) => void,
) => Notifications.addNotificationResponseReceivedListener(handler);

export const getLastNotificationResponse =
  Notifications.getLastNotificationResponse;
