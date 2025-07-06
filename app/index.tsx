import { useState, useEffect, useContext } from "react";
import { GlobalUserContext } from "@/src/context/userContext";
import { SignInView } from "@/src/features/auth/view/SignInView";
import { View, Text } from "react-native";
import { getAuth, onAuthStateChanged } from "@react-native-firebase/auth";

const SignIn = () => {
  const { currentUser, setCurrentUser } = useContext(GlobalUserContext);
  const [initializing, setInitializing] = useState(true);

  const handleAuthStateChanged = (user: any) => {
    setCurrentUser({
      user,
    });
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = onAuthStateChanged(getAuth(), handleAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  if (!currentUser) {
    return <SignInView />;
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Lists of user: {currentUser.user.displayName}</Text>
    </View>
  );
};

export default SignIn;
