import * as S from "./styles";
import { FlatList } from "react-native-gesture-handler";
import { InviteEntity } from "../../model/invite";
import { Button } from "@/src/components/button";

type InvitesListProps = {
  invites: InviteEntity[];
  acceptInvite: (invite: InviteEntity, accepted: boolean) => void;
};

export const InvitesList = ({ invites, acceptInvite }: InvitesListProps) => {
  return (
    <S.InvitesListWrapper>
      <S.InvitesListHeader>
        <S.InvitesListTitle>
          Você tem {invites.length} convite(s) pendente(s)
        </S.InvitesListTitle>
      </S.InvitesListHeader>

      <S.Divisor />

      <FlatList
        data={invites}
        keyExtractor={(item, index) => item.id?.toString() ?? index.toString()}
        renderItem={({ item }) => (
          <S.InviteItem>
            <S.InviteInfo>
              <S.InviteTittle numberOfLines={1}>
                {item.referralUsername}
              </S.InviteTittle>
              <S.InviteListName>Lista: {item.list.name}</S.InviteListName>
            </S.InviteInfo>

            <S.InviteBtnWrapper>
              <Button
                btnText="Aceitar"
                onPress={() => acceptInvite(item, true)}
              />

              <Button
                btnType="dark"
                btnText="Rejeitar"
                onPress={() => acceptInvite(item, false)}
              />
            </S.InviteBtnWrapper>
          </S.InviteItem>
        )}
      />
    </S.InvitesListWrapper>
  );
};
