import * as S from "./styles";
import { Button } from "@/src/components/button";
import { InviteEntity } from "../../model/invite";

type InviteListItemProps = {
  item: InviteEntity;
  isSentInvite: boolean;
  acceptInvite: (invite: InviteEntity, accepted: boolean) => void;
  removeInvite: (invite: InviteEntity) => void;
};

export const InviteListItem = ({
  item,
  acceptInvite,
  removeInvite,
  isSentInvite,
}: InviteListItemProps) => {
  const handleReject = () => {
    if (isSentInvite) {
      removeInvite(item);
    } else {
      acceptInvite(item, false);
    }
  };

  return (
    <S.InviteItem>
      <S.InviteInfo>
        <S.InviteTittle numberOfLines={1}>
          {isSentInvite
            ? `Convidado: ${item.userEmail}`
            : item.referralUsername}
        </S.InviteTittle>
        <S.InviteListName>Lista: {item.list.name}</S.InviteListName>
      </S.InviteInfo>

      <S.InviteBtnWrapper>
        {!isSentInvite && (
          <Button btnText="Aceitar" onPress={() => acceptInvite(item, true)} />
        )}

        <Button
          btnType="dark"
          btnText="Rejeitar"
          onPress={() => handleReject()}
        />
      </S.InviteBtnWrapper>
    </S.InviteItem>
  );
};
