import * as S from "./styles";
import { Button } from "@/src/components/button";
import { InvitedUserentity } from "../../model/invitedUser";

type FoundUserCardProps = {
  invitedUser: InvitedUserentity;
  alreadyInList: boolean;
  btnOnPress: (invitedUser: InvitedUserentity) => void;
};

export const FoundUserCard = ({
  invitedUser,
  alreadyInList,
  btnOnPress,
}: FoundUserCardProps) => {
  return (
    <S.FoundUserCardWrapper>
      <S.FoundUserCardRow>
        <S.FoundUserCardName numberOfLines={1}>
          {invitedUser.userName}
        </S.FoundUserCardName>
        <S.FoundUserCardEmail numberOfLines={1}>
          {invitedUser.userEmail}
        </S.FoundUserCardEmail>
      </S.FoundUserCardRow>

      <Button
        btnText={alreadyInList ? "Remover" : "Add"}
        onPress={() => btnOnPress(invitedUser)}
      />
    </S.FoundUserCardWrapper>
  );
};
