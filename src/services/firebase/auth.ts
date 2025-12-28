import auth, {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  FirebaseAuthTypes,
  updateProfile,
  signOut,
  sendPasswordResetEmail,
  updateEmail,
  signInAnonymously,
} from "@react-native-firebase/auth";
import axios from "axios";
import Constants from "expo-constants";

const listEasyApiKey = Constants.expoConfig?.extra?.listEasyApiKey ?? null;

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
        displayName: displayName || "",
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

    console.log(error);

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

export const updateUserData = async (
  userObj: FirebaseAuthTypes.UserCredential,
  displayName: string,
  photoURL: string | null
) => {
  try {
    await updateProfile(userObj.user, {
      displayName: displayName || "",
      photoURL: photoURL || "",
    });

    const userUpdated = getAuth().currentUser;

    return userUpdated;
  } catch (error: any) {
    console.log(error);
    throw new Error("Não foi possível atualizar seus dados.");
  }
};

export const updateUserEmail = async (
  userObj: FirebaseAuthTypes.UserCredential,
  email: string
) => {
  try {
    await updateEmail(userObj.user, email);
    const userUpdated = getAuth().currentUser;
    return userUpdated;
  } catch (error: any) {
    console.log(error);
    throw new Error("Não foi possível atualizar seu e-mail.");
  }
};

export const resetPassword = async (userEmail: string) => {
  try {
    await sendPasswordResetEmail(getAuth(), userEmail);
  } catch (error: any) {
    if (error.code === "auth/user-not-found") {
      throw new Error("Usuário não encontrado com este e-mail.");
    }
    if (error.code === "auth/invalid-email") {
      throw new Error("Endereço de e-mail inválido.");
    }
    throw new Error("Não foi possível enviar o e-mail de recuperação.");
  }
};

export const userLogout = async () => {
  try {
    const response = await signOut(getAuth());
    return response;
  } catch (error) {
    throw new Error(`Não foi possível fazer logout. ${error}`);
  }
};

export const authUserAnonimously = async () => {
  try {
    const response = await signInAnonymously(getAuth());
    return response;
  } catch (error) {
    throw new Error(`Não foi possível acessar sem cadastro. ${error}`);
  }
};

export const registerAnonymousUser = async (
  userEmail: string,
  userPass: string,
  displayName: string
): Promise<FirebaseAuthTypes.UserCredential | null> => {
  const user = auth().currentUser;
  if (!user) return null;

  const credential = auth.EmailAuthProvider.credential(userEmail, userPass);

  await user.linkWithCredential(credential);

  await user.updateProfile({
    displayName,
  });

  const updatedUser = auth().currentUser;

  if (updatedUser) {
    return {
      user: updatedUser,
    };
  } else {
    return null;
  }
};

export const getUserByEmail = async (email: string) => {
  if (!listEasyApiKey) throw new Error("No API KEY found.");

  const userData = await axios.get(
    `https://getuserbyemailinfirebaseauth-ttyxjwblsa-uc.a.run.app/?user_email=${email}`,
    {
      headers: {
        "x-api-key": listEasyApiKey,
      },
    }
  );

  return userData.data;
};
