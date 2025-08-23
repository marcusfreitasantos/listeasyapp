import * as S from "./styles";
import { Button } from "@/src/components/button";
import { InviteEntity } from "../../model/invite";

type InviteListItemProps = {
  item: InviteEntity;
  acceptInvite: (invite: InviteEntity, accepted: boolean) => void;
};

export const InviteListItem = ({ item, acceptInvite }: InviteListItemProps) => {
  return (
    <S.InviteItem>
      <S.InviteInfo>
        <S.InviteTittle numberOfLines={1}>
          {item.referralUsername}
        </S.InviteTittle>
        <S.InviteListName>Lista: {item.list.name}</S.InviteListName>
      </S.InviteInfo>

      <S.InviteBtnWrapper>
        <Button btnText="Aceitar" onPress={() => acceptInvite(item, true)} />

        <Button
          btnType="dark"
          btnText="Rejeitar"
          onPress={() => acceptInvite(item, false)}
        />
      </S.InviteBtnWrapper>
    </S.InviteItem>
  );
};
