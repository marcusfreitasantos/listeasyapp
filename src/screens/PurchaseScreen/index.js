import Header from "../../components/Header";
import * as S from "./styles";
import theme from "../../global/theme";
import backgroundImg from "../../assets/purchase-bg.jpg";
import { Award } from "react-native-feather";
import PlanBox from "../../components/PlanBox";
import { useState } from "react";

export default ({ route }) => {
  const iconSize = 20;
  const [btnActive, setBtnActive] = useState("product.productId");

  return (
    <>
      <Header routeName={route.name} />
      <S.BackgroundImg source={backgroundImg} resizeMode="cover">
        <S.Title>Transforme suas compras em uma experiência eficiente!</S.Title>

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

        <PlanBox
          currentPlan={
            btnActive === "product.productId" ? "active" : "inactive"
          }
          planName="Mensal"
          onPress={() => setBtnActive("product.productId")}
        />

        <PlanBox
          currentPlan={
            btnActive === "product.productId2" ? "active" : "inactive"
          }
          planName="Anual"
          onPress={() => setBtnActive("product.productId2")}
        />

        <S.LegalText>
          Os planos são renovados automaticamente. Cancele a qualquer momento em
          suas preferências na PlayStore.
        </S.LegalText>
      </S.BackgroundImg>
    </>
  );
};
