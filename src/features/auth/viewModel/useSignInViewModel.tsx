import { useState, useContext } from "react";
import { GlobalUserContext } from "@/src/context/userContext";
import { Alert } from "react-native";
import { router } from "expo-router";
import { authUser } from "@/src/services/firebase/auth";

export const useSignInViewModel = () => {
  const { setUser } = useContext(GlobalUserContext);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (email: string, password: string) => {
    setLoading(true);

    try {
      const response = await authUser(email, password);
      console.log(response);
      setUser(response);
    } catch (error: any) {
      Alert.alert("Oops! Algo deu errado:", `${error}`);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handleSignIn,
  };
};
