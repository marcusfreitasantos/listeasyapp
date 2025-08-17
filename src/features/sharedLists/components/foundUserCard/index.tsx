import * as S from "./styles";
import { Button } from "@/src/components/button";

type FoundUserCardProps = {
  name: string;
  email: string;
  btnOnPress: (userObj: { name: string; email: string }) => void;
};

export const FoundUserCard = ({
  name,
  email,
  btnOnPress,
}: FoundUserCardProps) => {
  const currenUserCard = {
    name,
    email,
  };
  return (
    <S.FoundUserCardWrapper>
      <S.FoundUserCardRow>
        <S.FoundUserCardName numberOfLines={1}>{name}</S.FoundUserCardName>
        <S.FoundUserCardEmail numberOfLines={1}>{email}</S.FoundUserCardEmail>
      </S.FoundUserCardRow>

      <Button btnText="Add" onPress={() => btnOnPress(currenUserCard)} />
    </S.FoundUserCardWrapper>
  );
};
