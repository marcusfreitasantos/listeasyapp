import { useState } from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import { resetPassword } from "@/src/services/firebase/auth";

export const useResetPasswordViewModel = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handlePasswordReset = async (email: string) => {
    setLoading(true);

    try {
      await resetPassword(email);
      Alert.alert(
        "Sucesso!",
        "O e-mail para redifinição de senha foi enviado.",
        [
          {
            text: "Confirmar",
          },
        ]
      );
    } catch (error: any) {
      Alert.alert("Oops! Algo deu errado:", `${error}`);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handlePasswordReset,
  };
};
