import { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import Header from "../../components/Header";
import { ActivityIndicator } from "react-native";
import * as S from "./styles";
import theme from "../../global/theme";
import backgroundImg from "../../assets/purchase-bg.jpg";
import { Award } from "react-native-feather";
import PlanBox from "../../components/PlanBox";
import { useEffect, useState } from "react";
import {
  getProductsFromTheStore,
  purchaseProduct,
} from "../../services/purchases";
import { useNavigation } from "@react-navigation/native";

export default ({ route }) => {
  const navigation = useNavigation();
  const { setIsPurchased } = useContext(GlobalContext);
  const iconSize = 20;
  const [btnActive, setBtnActive] = useState("");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const offerings = await getProductsFromTheStore();
      setProducts(offerings);
      setBtnActive(offerings[0].identifier);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePurchase = async (currentProduct) => {
    setBtnActive(currentProduct.identifier);

    try {
      const purchase = await purchaseProduct(currentProduct);
      if (purchase) {
        setIsPurchased(true);
        navigation.navigate("MainScreen");
      }
    } catch (error) {
      console.log("erro na compra", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <Header routeName={route.name} />
      <S.BackgroundImg source={backgroundImg} resizeMode="cover">
        {isLoading ? (
          <ActivityIndicator style={{ flex: 1 }} />
        ) : (
          <>
            <S.Title>
              Transforme suas compras em uma experiência eficiente!
            </S.Title>

            <S.WhiteLine />

            <S.Benefits__wrapper>
              <Award
                stroke={theme.colors.lightColor}
                height={iconSize}
                width={iconSize}
              />

              <S.Benefits__text>Crie listas ilimitadas.</S.Benefits__text>
            </S.Benefits__wrapper>

            <S.Benefits__wrapper>
              <Award
                stroke={theme.colors.lightColor}
                height={iconSize}
                width={iconSize}
              />

              <S.Benefits__text>
                Imprima ou compartilhe suas listas em PDF.
              </S.Benefits__text>
            </S.Benefits__wrapper>

            <S.Benefits__wrapper>
              <Award
                stroke={theme.colors.lightColor}
                height={iconSize}
                width={iconSize}
              />

              <S.Benefits__text>
                Utilize o aplicativo livre de anúncios.
              </S.Benefits__text>
            </S.Benefits__wrapper>

            <S.WhiteLine />

            <S.Subtitle>Escolha um plano de pagamento</S.Subtitle>
            <S.LegalText>
              Cobrado no início de cada ciclo após a assinatura.
            </S.LegalText>

            {products &&
              products.map((item) => {
                return (
                  <PlanBox
                    key={item.identifier}
                    currentPlan={
                      btnActive === item.identifier ? "active" : "inactive"
                    }
                    planName={item.product.title}
                    planPrice={item.product.priceString}
                    onPress={() => handlePurchase(item)}
                  />
                );
              })}

            <S.LegalText>
              Os planos são renovados automaticamente. Cancele a qualquer
              momento em suas preferências na PlayStore.
            </S.LegalText>
          </>
        )}
      </S.BackgroundImg>
    </>
  );
};
