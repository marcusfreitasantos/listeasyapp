import { useState, useContext } from "react";
import { GlobalUserContext } from "../context/userContext";
import { logoutUser } from "../services/firebase/auth";
import { useRouter } from "expo-router";
import { useObservabilityViewModel } from "@/src/features/observability/viewModel/useObservabilityViewModel";

export const useLogoutCurrentUser = () => {
  const { logAnalyticsEvent, logHandledError } = useObservabilityViewModel();
  const { setCurrentUser } = useContext(GlobalUserContext);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogoutUser = async () => {
    setLoading(true);
    try {
      await logAnalyticsEvent("logout");
      await logoutUser();
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
