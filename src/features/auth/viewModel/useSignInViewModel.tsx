import { useState, useContext } from "react";
import { GlobalUserContext } from "@/src/context/userContext";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import { authUser, authUserAnonimously } from "@/src/services/firebase/auth";
import { useTranslation } from "react-i18next";

export const useSignInViewModel = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { setCurrentUser } = useContext(GlobalUserContext);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (email: string, password: string) => {
    setLoading(true);

    try {
      const response = await authUser(email, password);
      setCurrentUser(response);

      router.push("/lists");
    } catch (error: any) {
      Alert.alert(t("something_wrong"), `${error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleAnonymousSignIn = async () => {
    setLoading(true);

    try {
      const response = await authUserAnonimously();
      console.log(response);
      setCurrentUser(response);

      router.push("/lists");
    } catch (error: any) {
      Alert.alert(t("something_wrong"), `${error}`);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handleSignIn,
    handleAnonymousSignIn,
  };
};
