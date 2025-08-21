import * as S from "./styles";
import { Button } from "@/src/components/button";
import { InvitedUserEntity } from "../../model/invitedUser";

type FoundUserCardProps = {
  invitedUser: InvitedUserEntity;
  alreadyInList: boolean;
  handleAddColaborator: (invitedUser: InvitedUserEntity) => void;
  handleRemoveColaborator: (invitedUser: InvitedUserEntity) => void;
};

export const FoundUserCard = ({
  invitedUser,
  alreadyInList,
  handleAddColaborator,
  handleRemoveColaborator,
}: FoundUserCardProps) => {
  const handleBtnOnPress = (invitedUser: InvitedUserEntity) => {
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
