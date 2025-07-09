import { useState, useContext, useEffect } from "react";
import { GlobalUserContext } from "@/src/context/userContext";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import { updateUserData } from "@/src/services/firebase/auth";
import * as ImagePicker from "expo-image-picker";

export const useUpdateProfileViewModel = () => {
  const { currentUser, setCurrentUser } = useContext(GlobalUserContext);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleUpdate = async (
    displayName: string,
    email: string,
    photoURL: string
  ) => {
    setLoading(true);

    try {
      if (!currentUser) throw new Error("Invalid user");

      const response = await updateUserData(currentUser, displayName, photoURL);

      if (currentUser.user.email !== email) {
        console.log("You may need to handle Firebase email update separately.");
      }

      if (response) {
        setCurrentUser({
          additionalUserInfo: currentUser.additionalUserInfo,
          user: response,
        });
        Alert.alert("Sucesso!", "Seu perfil foi atualizado.");
      }
    } catch (error: any) {
      Alert.alert("Oops! Algo deu errado:", `${error?.message || error}`);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handleUpdate,
    pickImage,
  };
};
