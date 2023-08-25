import { useState } from "react";
import * as S from "./styles";
import { Edit } from "react-native-feather";
import theme from "../../global/theme";
import Item from "../Item";
import Animated, { FadeInLeft } from "react-native-reanimated";

export default ({ data }) => {
  const [itemDetails, setItemDetails] = useState(false);

  const showCurrentItemDetails = () => {
    setItemDetails(!itemDetails);
  };
  return (
    <Animated.View entering={FadeInLeft}>
      <S.ListBox__wrapper onPress={showCurrentItemDetails}>
        <S.ListBox__title>{data.item.itemName}</S.ListBox__title>
        <Edit width={24} height={24} color={`${theme.colors.secondaryColor}`} />
      </S.ListBox__wrapper>

      {itemDetails && <Item data={data} />}
    </Animated.View>
  );
};
