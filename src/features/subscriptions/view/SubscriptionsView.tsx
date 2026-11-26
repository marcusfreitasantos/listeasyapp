import { Platform } from "react-native";
import { useTranslation } from "react-i18next";
import * as S from "./styles";
import { useSubscriptionsViewModel } from "../viewModel/useSubscriptionsViewModel";
import { LoadingSpinner } from "@/src/components/loadingSpinner";
import { ProductCard } from "../components/productCard";
import { FlatList } from "react-native-gesture-handler";
import { ListEmpty } from "@/src/components/listEmpty";
import { Button } from "@/src/components/button";

export const SubscriptionsView = () => {
  const { t } = useTranslation();
  const {
    currentProducts,
    loading,
    currentSubscription,
    handlePurchaseSubscription,
    handleRestorePurchases,
    subscriptionManageWarning,
  } = useSubscriptionsViewModel();

  return (
    <S.SubscriptionsViewContainer>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {subscriptionManageWarning() ? (
            <ListEmpty title={subscriptionManageWarning()} />
          ) : (
            <FlatList
              style={{ flex: 1 }}
              keyExtractor={(item) => item.productId}
              data={currentProducts ? [...currentProducts].reverse() : []}
              ListEmptyComponent={
                <ListEmpty title="Nenhuma assinatura encontrada" />
              }
              renderItem={({ item }) => (
                <ProductCard
                  productData={item}
                  handleSubscription={() =>
                    handlePurchaseSubscription(item.productId)
                  }
                  currentSubscription={currentSubscription}
                />
              )}
            />
          )}
          {Platform.OS === "ios" ? (
            <S.RestorePurchasesContainer>
              <Button
                btnText={t("restore_purchases")}
                btnStyle="outline"
                accessibilityRole="button"
                accessibilityLabel={t("restore_purchases")}
                onPress={() => {
                  void handleRestorePurchases();
                }}
              />
            </S.RestorePurchasesContainer>
          ) : null}
        </>
      )}
    </S.SubscriptionsViewContainer>
  );
};
