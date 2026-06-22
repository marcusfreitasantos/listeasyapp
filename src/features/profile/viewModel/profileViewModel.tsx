import { useState, useContext, useEffect } from "react";
import { GlobalUserContext } from "@/src/context/userContext";
import { Alert } from "react-native";
import storage from "@react-native-firebase/storage";
import {
  updateUserProfile,
  deleteUserData,
} from "@/src/services/firebase/auth";
import * as ImagePicker from "expo-image-picker";
import { useTranslation } from "react-i18next";
import { FeatherIconName } from "@/@types/icons";
import { DynamicFormFiedls } from "@/src/components/dynamicForm";
import { useResetPasswordViewModel } from "../../auth/viewModel/useResetPasswordViewModel";
import { GlobalSubscriptionContext } from "@/src/context/subscriptionContext";
import { useLogoutCurrentUser } from "@/src/hooks/useLogoutCurrentUser";

export const useUpdateProfileViewModel = () => {
  const { handleLogoutUser } = useLogoutCurrentUser();
  const { t } = useTranslation();
  const { currentUser, setCurrentUser } = useContext(GlobalUserContext);
  const { currentSubscription } = useContext(GlobalSubscriptionContext);
  const [loading, setLoading] = useState(false);
  const fileMaxSize = 300;
  const [formFields, setFormFields] = useState<DynamicFormFiedls[] | []>([]);
  const { handlePasswordReset } = useResetPasswordViewModel();

  const handleImageUpload = async (fileLocalPath: string) => {
    try {
      const reference = storage().ref(
        `user_uploads/${currentUser?.user.uid}/profile_image_${currentUser?.user.uid}.png`,
      );

      await reference.putFile(fileLocalPath);
      const photoURL = await reference.getDownloadURL();
      return photoURL;
    } catch (e) {
      console.log("handleImageUpload__", e);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      if (
        result.assets[0].fileSize &&
        result.assets[0].fileSize > fileMaxSize * 1024
      ) {
        Alert.alert(
          t("file_not_sent"),
          t("file_max_size_warning", { file_size: `${fileMaxSize}kb` }),
        );
        return;
      }

      return result.assets[0].uri;
    }
  };

  const handleUpdate = async (
    displayName: string,
    localPhotoURL: string | null,
  ) => {
    setLoading(true);
    let photoURL = null;

    try {
      if (!currentUser) throw new Error(t("invalid_user"));

      if (localPhotoURL && localPhotoURL !== currentUser.user.photoURL) {
        photoURL = (await handleImageUpload(localPhotoURL)) ?? null;
      }

      const response = await updateUserProfile(
        currentUser.user,
        displayName,
        photoURL,
      );

      if (response) {
        Alert.alert(t("success"), t("profile_updated"), [
          {
            text: t("confirm"),
            onPress: () => {
              setCurrentUser({
                additionalUserInfo: currentUser.additionalUserInfo,
                user: response,
              });
            },
          },
        ]);
      }
    } catch (error: any) {
      Alert.alert(t("something_wrong"), `${error?.message || error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      setLoading(true);
      const result = await deleteUserData(
        currentUser?.user.uid ?? "",
        currentSubscription?.purchaseToken || "",
      );
      if (result.status === 200) {
        Alert.alert(t("success"), t("account_deleted"), [
          {
            text: t("logout"),
            onPress: () => handleLogoutUser(),
          },
        ]);
      } else {
        throw new Error(t("account_deletion_error"));
      }
    } catch (e) {
      Alert.alert(t("error"), t("account_deletion_error"), [
        {
          text: t("back"),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const confirmResetPassword = () => {
    Alert.alert(t("warning"), t("password_reset_email_sent"), [
      {
        text: t("cancel"),
      },
      {
        text: t("continue"),
        onPress: () => handlePasswordReset(currentUser?.user.email ?? ""),
      },
    ]);
  };

  const confirmDeleteAccount = () => {
    Alert.alert(t("warning"), t("delete_account_warning"), [
      {
        text: t("cancel"),
      },
      {
        text: t("continue"),
        onPress: () => handleDeleteAccount(),
      },
    ]);
  };

  useEffect(() => {
    if (currentUser) {
      const updatedFormFields = [
        {
          fieldName: "displayName",
          iconName: "user" as FeatherIconName,
          placeholder: t("name_lastname"),
          defaultValue: currentUser?.user.displayName ?? "",
          validationRules: {
            required: false,
          },
        },
      ];

      setFormFields(updatedFormFields);
    }
  }, [currentUser]);

  return {
    loading,
    handleUpdate,
    pickImage,
    fileMaxSize,
    formFields,
    confirmResetPassword,
    confirmDeleteAccount,
  };
};
