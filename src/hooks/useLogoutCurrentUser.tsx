import { useState, useContext } from "react";
import { GlobalUserContext } from "../context/userContext";
import { logoutUser } from "../services/firebase/auth";
import { useRouter } from "expo-router";
import { logAnalyticsEvent, logHandledError } from "../services/observability";

export const useLogoutCurrentUser = () => {
  const { setCurrentUser } = useContext(GlobalUserContext);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogoutUser = async () => {
    setLoading(true);
    try {
      await logoutUser();
      await logAnalyticsEvent("logout");
    } catch (e) {
      await logHandledError("logout", e);
    } finally {
      setCurrentUser(null);
      router.replace("/");
    }
  };

  return {
    handleLogoutUser,
    loading,
  };
};
