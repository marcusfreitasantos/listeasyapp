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
import { GlobalProductsContext } from "@/src/context/productsContext";
import { useIAP } from "expo-iap";
import { mapStoreSubscriptions } from "@/src/features/subscriptions/model/mapStoreSubscriptions";
import { useObservabilityViewModel } from "@/src/features/observability/viewModel/useObservabilityViewModel";

const SignIn = () => {
  const router = useRouter();
  const theme = useTheme();
  const { currentUser, setCurrentUser } = useContext(GlobalUserContext);
  const { setCurrentSubscription } = useContext(GlobalSubscriptionContext);
  const { currentProducts, setCurrentProducts, productIds, setCurrency } =
    useContext(GlobalProductsContext);
  const { logHandledError, withPerformanceTrace } = useObservabilityViewModel();

  const [initializing, setInitializing] = useState(true);
  const { fetchInvitesReceivedByCurrentUser } = useInvitationsViewModel();

  const { connected, fetchProducts, subscriptions } = useIAP();

  const fetchCurrentUserSubscriptions = async () => {
    if (!currentUser?.user.uid) return;

    try {
      return await getSubscriptionByUserId(currentUser?.user.uid);
    } catch (err) {
      await logHandledError("fetch_current_subscription", err);
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
    const invites = await fetchInvitesReceivedByCurrentUser(
      currentUser?.user.email ?? "",
    );
    const subscriptions = await fetchCurrentUserSubscriptions();

    if (subscriptions?.length) setCurrentSubscription(subscriptions[0]);

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
    if (currentUser && currentUser.user.uid) handleUserRedirect();
  }, [currentUser]);

  useEffect(() => {
    if (!subscriptions?.length) return;

    setCurrentProducts(mapStoreSubscriptions(subscriptions));
  }, [subscriptions]);

  useEffect(() => {
    if (connected) {
      void withPerformanceTrace(
        "iap_fetch_products",
        () =>
          fetchProducts({
            skus: productIds,
            type: "subs",
          }),
        { source: "initialization" },
      );
    }
  }, [connected]);

  useEffect(() => {
    if (currentProducts?.length) setCurrency(currentProducts[0].currency);
  }, [currentProducts]);

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
