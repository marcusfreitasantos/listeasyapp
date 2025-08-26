import * as S from "./styles";
import { Button } from "@/src/components/button";
import { InvitedUserEntity } from "../../model/invitedUser";
import { ListEntityType } from "@/src/features/listsManager/model/list";

type FoundUserCardProps = {
  currentList: ListEntityType;
  invitedUser: InvitedUserEntity;
  alreadyInList: boolean;
  handleAddColaborator: (invitedUser: InvitedUserEntity) => void;
  handleRemoveColaborator: (
    invitedUser: InvitedUserEntity,
    list: ListEntityType
  ) => void;
};

export const FoundUserCard = ({
  currentList,
  invitedUser,
  alreadyInList,
  handleAddColaborator,
  handleRemoveColaborator,
}: FoundUserCardProps) => {
  const handleBtnOnPress = (invitedUser: InvitedUserEntity) => {
    if (alreadyInList) {
      handleRemoveColaborator(invitedUser, currentList);
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
