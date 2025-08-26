import * as S from "./styles";
import { FlatList } from "react-native-gesture-handler";
import { InviteEntity } from "../../model/invite";
import { ListEmpty } from "@/src/components/listEmpty";
import { InviteListItem } from "../inviteListItem";

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
        ListEmptyComponent={() => <ListEmpty />}
        renderItem={({ item }) => (
          <InviteListItem item={item} acceptInvite={acceptInvite} />
        )}
      />
    </S.InvitesListWrapper>
  );
};
