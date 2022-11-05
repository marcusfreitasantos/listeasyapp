import * as S from "./styles";
import { Plus } from "react-native-feather";
import theme from "../../global/theme";

export default ({ onPress, Loading }) => {
  return (
    <S.PlusButton onPress={onPress} Loading={Loading} disabled={Loading}>
      <Plus width={40} height={40} color={theme.colors.lightColor} />
    </S.PlusButton>
  );
};
