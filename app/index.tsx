import { useState, useEffect, useContext } from "react";
import { GlobalUserContext } from "@/src/context/userContext";
import { SignInView } from "@/src/features/auth/view/SignInView";
import { getAuth, onAuthStateChanged } from "@react-native-firebase/auth";
import { useRouter } from "expo-router";
import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components/native";
import { GlobalSubscriptionContext } from "@/src/context/subscriptionContext";
import { useInvitationsViewModel } from "@/src/features/invitation/viewModel/useInvitationsViewModel";
import { getSubscriptionByUserId } from "@/src/services/firebase/subscriptions";

const SignIn = () => {
  const router = useRouter();
  const theme = useTheme();
  const { currentUser, setCurrentUser } = useContext(GlobalUserContext);
  const { currentSubscription, setCurrentSubscription } = useContext(
    GlobalSubscriptionContext
  );
  const [initializing, setInitializing] = useState(true);
  const { fetchUserInvites } = useInvitationsViewModel();

  const fetchCurrentUserSubscriptions = async () => {
    if (!currentUser?.user.uid) return;

    try {
      return await getSubscriptionByUserId(currentUser?.user.uid);
    } catch (err) {
      console.log(err);
    }
  };
  const handleAuthStateChanged = async (user: any) => {
    if (user) {
      setCurrentUser({
        user,
      });
    }
    if (initializing) setInitializing(false);
  };

  const handleUserRedirect = async () => {
    const invites = await fetchUserInvites(currentUser?.user.email ?? "");
    const subscriptions = await fetchCurrentUserSubscriptions();

    if (subscriptions.length) setCurrentSubscription(subscriptions[0]);

    console.log("subs", subscriptions);

    console.log(subscriptions);
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
    if (currentUser && currentUser.user.email) handleUserRedirect();
  }, [currentUser]);

  if (initializing)
    return (
      <ActivityIndicator
        style={{ flex: 1, backgroundColor: theme.secondaryColor }}
        color={theme.primaryColor}
      />
    );

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
