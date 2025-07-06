import { useState, useEffect, useContext } from "react";
import { GlobalUserContext } from "@/src/context/userContext";
import { SignInView } from "@/src/features/auth/view/SignInView";
import { View, Text } from "react-native";
import { getAuth, onAuthStateChanged } from "@react-native-firebase/auth";
import { useRouter } from "expo-router";

const SignIn = () => {
  const router = useRouter();
  const { currentUser, setCurrentUser } = useContext(GlobalUserContext);
  const [initializing, setInitializing] = useState(true);

  const handleAuthStateChanged = (user: any) => {
    if (user)
      setCurrentUser({
        user,
      });
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = onAuthStateChanged(getAuth(), handleAuthStateChanged);
    return subscriber;
  }, []);

  useEffect(() => {
    if (currentUser) {
      router.replace("/lists");
    }
  }, [currentUser]);

  if (initializing) return null;

  if (!currentUser) {
    return <SignInView />;
  }

  return null;
};

export default SignIn;
