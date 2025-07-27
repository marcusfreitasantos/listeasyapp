import * as S from "./styles";
import { useSubscriptionsViewModel } from "../viewModel/useSubscriptionsViewModel";
import { LoadingSpinner } from "@/src/components/loadingSpinner";
import { ProductCard } from "../components/productCard";
import { FlatList } from "react-native-gesture-handler";
import { ListEmpty } from "@/src/components/listEmpty";

const SubscriptionsView = () => {
  const { products, handleSubscription, loading, currentSubscription } =
    useSubscriptionsViewModel();

  return (
    <S.SubscriptionsViewContainer>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <FlatList
          keyExtractor={(item) => item.priceId}
          ListEmptyComponent={() => <ListEmpty />}
          data={products.reverse()}
          renderItem={({ item }) => (
            <ProductCard
              productData={item}
              onPress={handleSubscription}
              currentUserPlan={currentSubscription?.productId}
            />
          )}
        />
      )}
    </S.SubscriptionsViewContainer>
  );
};

export default SubscriptionsView;
