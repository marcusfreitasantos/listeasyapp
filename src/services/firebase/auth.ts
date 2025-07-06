import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  FirebaseAuthTypes,
  updateProfile,
  signOut,
} from "@react-native-firebase/auth";

export const registerUser = async (
  userEmail: string,
  userPass: string,
  displayName: string
) => {
  try {
    const response: FirebaseAuthTypes.UserCredential =
      await createUserWithEmailAndPassword(getAuth(), userEmail, userPass);

    if (displayName) {
      await updateProfile(response.user, {
        displayName: displayName || undefined,
      });
    }

    return response;
  } catch (error: any) {
    if (error.code === "auth/email-already-in-use") {
      throw new Error("Já existe um usuário com este e-mail!");
    }

    if (error.code === "auth/invalid-email") {
      throw new Error("Endereço e e-mail inválido!");
    }

    if (error.code === "auth/weak-password") {
      throw new Error(
        "A senha é muito fraca. Precisa ter no mínimo 6 caracteres."
      );
    }

    throw new Error("Erro desconhecido.");
  }
};

export const authUser = async (userEmail: string, userPass: string) => {
  try {
    const response = await signInWithEmailAndPassword(
      getAuth(),
      userEmail,
      userPass
    );

    return response;
  } catch (error) {
    throw new Error(
      `Não foi possível fazer login. E-mail ou senha incorretos.`
    );
  }
};

export const userLogout = async () => {
  try {
    signOut(getAuth()).then(() => console.log("User signed out!"));
  } catch (error) {
    throw new Error(`Não foi possível fazer logout. ${error}`);
  }
};
