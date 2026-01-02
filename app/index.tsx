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
import { reaisToCents } from "@/src/utils/convertCurrency";
import { parseBillingPeriod } from "@/src/utils/parseBillingPeriod";
import { ProductEntity } from "@/src/features/subscriptions/model/product";

const SignIn = () => {
  const router = useRouter();
  const theme = useTheme();
  const { currentUser, setCurrentUser } = useContext(GlobalUserContext);
  const { setCurrentSubscription } = useContext(GlobalSubscriptionContext);
  const { setCurrentProducts, productIds } = useContext(GlobalProductsContext);

  const [initializing, setInitializing] = useState(true);
  const { fetchUserInvites } = useInvitationsViewModel();

  const { connected, fetchProducts, subscriptions } = useIAP();

  const sortProductsByAmount = (
    productsList: ProductEntity[],
    sortingOrder: "asc" | "desc"
  ) => {
    const sortedProducts = productsList.sort((a, b) => {
      if (sortingOrder === "desc") {
        return a.amount - b.amount;
      } else {
        return b.amount - a.amount;
      }
    });

    return sortedProducts;
  };

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
    if (subscriptions) {
      const fetchedProducts = subscriptions.map((sub) => {
        if ("subscriptionOfferDetailsAndroid" in sub) {
          return {
            productId: sub.id,
            name: sub.displayName ?? sub.title,
            description: sub.description,
            amount: reaisToCents(Number(sub.price)),
            currency: sub.currency,
            interval: parseBillingPeriod(
              sub.subscriptionOfferDetailsAndroid[0].pricingPhases
                .pricingPhaseList[0].billingPeriod
            ),
          } as ProductEntity;
        }
      });

      setCurrentProducts(
        sortProductsByAmount(
          fetchedProducts.filter((product) => product !== undefined),
          "asc"
        )
      );
    }
  }, [subscriptions]);

  useEffect(() => {
    if (connected) {
      fetchProducts({
        skus: productIds,
        type: "subs",
      });
    }
  }, [connected]);

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
