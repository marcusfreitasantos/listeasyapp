import { useState, useEffect, useContext } from "react";
import { GlobalUserContext } from "@/src/context/userContext";
import { SignInView } from "@/src/features/auth/view/SignInView";
import { getAuth, onAuthStateChanged } from "@react-native-firebase/auth";
import { useRouter } from "expo-router";
import { getSubscriberByUserId } from "@/src/services/firebase/subscriptions";
import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components/native";

const SignIn = () => {
  const router = useRouter();
  const theme = useTheme();
  const { currentUser, setCurrentUser } = useContext(GlobalUserContext);
  const [initializing, setInitializing] = useState(true);

  const handleSubscriptionCheck = async (userId: string) => {
    try {
      let subscriberData = {
        stripeCustomerId: null,
        stripeSubscriptionStatus: "inactive",
      };

      const subscriber = await getSubscriberByUserId(userId);

      if (subscriber.length) {
        subscriberData = {
          stripeCustomerId: subscriber[0].stripeCustomerId || null,
          stripeSubscriptionStatus:
            subscriber[0].stripeSubscriptionStatus || "inactive",
        };
      }

      return subscriberData;
    } catch (error: any) {
      throw new Error(`Error fetching subscriber: ${error.message}`);
    }
  };

  const handleAuthStateChanged = async (user: any) => {
    if (user) {
      const subscriberData = await handleSubscriptionCheck(user.uid);
      setCurrentUser({
        user,
        stripeCustomerId: subscriberData.stripeCustomerId,
        stripeSubscriptionStatus: subscriberData.stripeSubscriptionStatus,
      });
    }
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

  return (
    <ActivityIndicator
      style={{ flex: 1, backgroundColor: theme.secondaryColor }}
      color={theme.primaryColor}
    />
  );
};

export default SignIn;
