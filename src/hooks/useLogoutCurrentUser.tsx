import { useState, useContext } from "react";
import { GlobalUserContext } from "../context/userContext";
import { userLogout } from "../services/firebase/auth";
import { useRouter } from "expo-router";

export const useLogoutCurrentUser = () => {
  const { setCurrentUser } = useContext(GlobalUserContext);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogoutUser = async () => {
    setLoading(true);
    try {
      await userLogout();
    } catch (e) {
      console.log(e);
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
