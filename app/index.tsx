import { useState, useEffect, useContext } from "react";
import { GlobalUserContext } from "@/src/context/userContext";
import { SignInView } from "@/src/features/auth/view/SignInView";
import { getAuth, onAuthStateChanged } from "@react-native-firebase/auth";
import { useRouter } from "expo-router";
import { getSubscriptionByUserId } from "@/src/services/firebase/subscriptions";
import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components/native";
import { GlobalSubscriptionContext } from "@/src/context/subscriptionContext";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { SubscriptionEntity } from "@/src/features/subscriptions/model/subscription";
import { useInvitationsViewModel } from "@/src/features/invitation/viewModel/useInvitationsViewModel";

const SignIn = () => {
  const router = useRouter();
  const theme = useTheme();
  const { currentUser, setCurrentUser } = useContext(GlobalUserContext);
  const { currentSubscription, setCurrentSubscription } = useContext(
    GlobalSubscriptionContext
  );
  const [initializing, setInitializing] = useState(true);
  const { fetchUserInvites } = useInvitationsViewModel();

  const handleSubscriptionCheck = async (
    userData: FirebaseAuthTypes.UserCredential["user"]
  ) => {
    try {
      let subscriptionData = {
        id: "",
        stripeCustomerId: "",
        stripeSubscriptionStatus: "inactive",
        productId: "",
        stripeSubscriptionId: "",
        userId: userData.uid,
        userName: userData.displayName ?? "",
        userEmail: userData.email ?? "",
      };

      const subscription: SubscriptionEntity[] = await getSubscriptionByUserId(
        userData.uid
      );

      if (subscription.length) {
        subscriptionData = {
          id: subscription[0].id ?? "",
          stripeCustomerId: subscription[0].stripeCustomerId ?? "",
          stripeSubscriptionStatus:
            subscription[0].stripeSubscriptionStatus ?? "inactive",
          userId: userData.uid,
          userName: userData.displayName ?? "",
          userEmail: userData.email ?? "",
          productId: subscription[0].productId ?? "",
          stripeSubscriptionId: subscription[0].stripeSubscriptionId ?? "",
        };
      }

      return subscriptionData;
    } catch (error: any) {
      throw new Error(`Error fetching subscriber: ${error.message}`);
    }
  };

  const handleAuthStateChanged = async (user: any) => {
    if (user) {
      const subscriptionData = await handleSubscriptionCheck(user);
      setCurrentUser({
        user,
      });

      setCurrentSubscription(subscriptionData);
    }
    if (initializing) setInitializing(false);
  };

  const handleUserRedirect = async () => {
    const invites = await fetchUserInvites(currentUser?.user.email ?? "");
    if (invites?.length) {
      router.replace("/invitations");
    } else {
      router.replace("/lists");
    }
  };

  useEffect(() => {
    const subscriber = onAuthStateChanged(getAuth(), handleAuthStateChanged);
    return subscriber;
  }, []);

  useEffect(() => {
    if (currentUser && currentUser.user.email && currentSubscription)
      handleUserRedirect();
  }, [currentUser, currentSubscription]);

  if (initializing)
    return (
      <ActivityIndicator
        style={{ flex: 1, backgroundColor: theme.secondaryColor }}
        color={theme.primaryColor}
      />
    );

  if (!currentUser || !currentSubscription) {
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
