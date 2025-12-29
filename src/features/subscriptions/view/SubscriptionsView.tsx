import * as S from "./styles";
import { useSubscriptionsViewModel } from "../viewModel/useSubscriptionsViewModel";
import { LoadingSpinner } from "@/src/components/loadingSpinner";
import { ProductCard } from "../components/productCard";
import { FlatList } from "react-native-gesture-handler";
import { ListEmpty } from "@/src/components/listEmpty";

const SubscriptionsView = () => {
  const {
    products,
    loading,
    currentSubscription,
    handlePurchaseSubscription,
    subscriptionManageWarning,
  } = useSubscriptionsViewModel();

  return (
    <S.SubscriptionsViewContainer>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <FlatList
          keyExtractor={(item) => item.productId}
          ListEmptyComponent={() => (
            <ListEmpty title={subscriptionManageWarning} />
          )}
          data={products.reverse()}
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
    </S.SubscriptionsViewContainer>
  );
};

export default SubscriptionsView;
