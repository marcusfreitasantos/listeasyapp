import { useState, useContext, useEffect } from "react";
import { GlobalUserContext } from "@/src/context/userContext";
import { Alert } from "react-native";
import storage from "@react-native-firebase/storage";
import { updateUserData, updateUserEmail } from "@/src/services/firebase/auth";
import * as ImagePicker from "expo-image-picker";

export const useUpdateProfileViewModel = () => {
  const { currentUser, setCurrentUser } = useContext(GlobalUserContext);
  const [loading, setLoading] = useState(false);
  const fileMaxSize = 500;

  const handleImageUpload = async (fileLocalPath: string) => {
    try {
      const reference = storage().ref(
        `user_uploads/${currentUser?.user.uid}/profile_image_${currentUser?.user.uid}.png`
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
          "Imagem não enviada!",
          `O arquivo precisa ter no máximo ${fileMaxSize}kb.`
        );
        return;
      }

      return result.assets[0].uri;
    }
  };

  const handleUpdate = async (
    displayName: string,
    localPhotoURL: string | null
  ) => {
    setLoading(true);
    let photoURL = null;

    try {
      if (!currentUser) throw new Error("Invalid user");

      if (localPhotoURL && localPhotoURL !== currentUser.user.photoURL) {
        photoURL = (await handleImageUpload(localPhotoURL)) ?? null;
      }

      const response = await updateUserData(currentUser, displayName, photoURL);

      if (response) {
        Alert.alert("Sucesso!", "Seu perfil foi atualizado.", [
          {
            text: "Confirmar",
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
      Alert.alert("Oops! Algo deu errado:", `${error?.message || error}`);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handleUpdate,
    pickImage,
    fileMaxSize,
  };
};
