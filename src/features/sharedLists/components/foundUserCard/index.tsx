import * as S from "./styles";
import { Button } from "@/src/components/button";
import { InvitedUserentity } from "../../model/invitedUser";

type FoundUserCardProps = {
  invitedUser: InvitedUserentity;
  alreadyInList: boolean;
  handleAddColaborator: (invitedUser: InvitedUserentity) => void;
  handleRemoveColaborator: (invitedUser: InvitedUserentity) => void;
};

export const FoundUserCard = ({
  invitedUser,
  alreadyInList,
  handleAddColaborator,
  handleRemoveColaborator,
}: FoundUserCardProps) => {
  const handleBtnOnPress = (invitedUser: InvitedUserentity) => {
    if (alreadyInList) {
      handleRemoveColaborator(invitedUser);
    } else {
      handleAddColaborator(invitedUser);
    }
  };

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
        onPress={() => handleBtnOnPress(invitedUser)}
      />
    </S.FoundUserCardWrapper>
  );
};
