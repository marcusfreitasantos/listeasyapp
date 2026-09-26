import { useContext, useEffect, useRef } from "react";
import { useRouter } from "expo-router";
import { GlobalUserContext } from "@/src/context/userContext";
import { useNotificationViewModel } from "@/src/features/notifications/viewModel/useNotificationViewModel";

const NotificationManager = () => {
  const router = useRouter();
  const { currentUser } = useContext(GlobalUserContext);
  const handledNotificationIds = useRef<Set<string>>(new Set());
  const {
    registerForPushNotifications,
    logNotificationOpened,
    addNotificationOpenedListener,
    getLastNotificationResponse,
  } = useNotificationViewModel();

  useEffect(() => {
    const userUid = currentUser?.user.uid;

    if (userUid) {
      void registerForPushNotifications(
        userUid,
        currentUser.user?.displayName ?? "",
        currentUser.user.email ?? "",
      );
    }
  }, [currentUser?.user.uid]);

  useEffect(() => {
    const handleNotificationResponse = (
      response: Parameters<typeof logNotificationOpened>[0],
    ) => {
      const notificationId = response.notification.request.identifier;

      if (handledNotificationIds.current.has(notificationId)) return;

      handledNotificationIds.current.add(notificationId);
      void logNotificationOpened(response, currentUser?.user.uid);
      router.replace("/lists");
    };

    const lastNotificationResponse = getLastNotificationResponse();

    if (lastNotificationResponse) {
      handleNotificationResponse(lastNotificationResponse);
    }

    const subscription = addNotificationOpenedListener(
      handleNotificationResponse,
    );

    return () => {
      subscription.remove();
    };
  }, [currentUser?.user.uid, router]);

  return null;
};

export default NotificationManager;
