import {
  getAuth,
  FirebaseAuthTypes,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  sendPasswordResetEmail,
  updateEmail,
  signInAnonymously,
  EmailAuthProvider,
} from "@react-native-firebase/auth";
import { getApp } from "@react-native-firebase/app";
import { useObservabilityViewModel } from "@/src/features/observability/viewModel/useObservabilityViewModel";

const { withPerformanceTrace } = useObservabilityViewModel();

const firebaseAuth = getAuth(getApp());

/* -------------------------------------------------------------------------- */
/*                              Error Handling                                */
/* -------------------------------------------------------------------------- */

const firebaseErrorMap: Record<string, string> = {
  "auth/email-already-in-use": "services.firebase_auth.email_already_exist",
  "auth/invalid-email": "services.firebase_auth.invalid_email",
  "auth/weak-password": "services.firebase_auth.weak_password",
  "auth/user-not-found": "services.firebase_auth.user_not_found",
};

const resolveFirebaseError = (error: unknown, fallbackKey: string): string => {
  if (typeof error === "object" && error !== null && "code" in error) {
    const code = (error as { code?: string }).code;
    if (code && firebaseErrorMap[code]) {
      return firebaseErrorMap[code];
    }
  }
  return fallbackKey;
};

/* -------------------------------------------------------------------------- */
/*                                   Auth                                     */
/* -------------------------------------------------------------------------- */

export const registerUser = async (
  email: string,
  password: string,
  displayName?: string,
): Promise<FirebaseAuthTypes.UserCredential> => {
  return withPerformanceTrace("auth_register", async () => {
    try {
      const credential = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password,
      );

      if (displayName) {
        await updateProfile(credential.user, { displayName });
      }

      return credential;
    } catch (error) {
      throw new Error(resolveFirebaseError(error, "unknown_error"));
    }
  });
};

export const loginUser = async (
  email: string,
  password: string,
): Promise<FirebaseAuthTypes.UserCredential> => {
  return withPerformanceTrace("auth_login", async () => {
    try {
      return await signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch {
      throw new Error("services.firebase_auth.wrong_credentials");
    }
  });
};

export const logoutUser = async (): Promise<void> => {
  try {
    await signOut(firebaseAuth);
  } catch {
    throw new Error("services.firebase_auth.logout_error");
  }
};

export const loginAnonymously =
  async (): Promise<FirebaseAuthTypes.UserCredential> => {
    return withPerformanceTrace("auth_anonymous_login", async () => {
      try {
        return await signInAnonymously(firebaseAuth);
      } catch {
        throw new Error("services.firebase_auth.anonymous_login_error");
      }
    });
  };

/* -------------------------------------------------------------------------- */
/*                              User Management                                */
/* -------------------------------------------------------------------------- */

export const updateUserProfile = async (
  user: FirebaseAuthTypes.User,
  displayName?: string,
  photoURL?: string | null,
): Promise<FirebaseAuthTypes.User | null> => {
  try {
    await updateProfile(user, {
      displayName,
      photoURL: photoURL ?? undefined,
    });

    return firebaseAuth.currentUser;
  } catch {
    throw new Error("services.firebase_auth.data_not_updated");
  }
};

export const updateUserEmailAddress = async (
  user: FirebaseAuthTypes.User,
  email: string,
): Promise<FirebaseAuthTypes.User | null> => {
  try {
    await updateEmail(user, email);
    return firebaseAuth.currentUser;
  } catch {
    throw new Error("services.firebase_auth.data_not_updated");
  }
};

export const resetUserPassword = async (email: string): Promise<void> => {
  try {
    await sendPasswordResetEmail(firebaseAuth, email);
  } catch (error) {
    throw new Error(
      resolveFirebaseError(
        error,
        "services.firebase_auth.reset_email_not_sent",
      ),
    );
  }
};

/* -------------------------------------------------------------------------- */
/*                       Anonymous → Email Registration                         */
/* -------------------------------------------------------------------------- */

export const convertAnonymousUser = async (
  email: string,
  password: string,
  displayName?: string,
): Promise<FirebaseAuthTypes.User | null> => {
  const user = firebaseAuth.currentUser;
  if (!user || !user.isAnonymous) return null;

  const credential = EmailAuthProvider.credential(email, password);

  await user.linkWithCredential(credential);

  if (displayName) {
    await updateProfile(user, { displayName });
  }

  return firebaseAuth.currentUser;
};
