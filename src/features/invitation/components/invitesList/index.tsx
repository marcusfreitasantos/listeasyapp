import * as S from "./styles";
import { FlatList } from "react-native-gesture-handler";
import { InviteEntity } from "../../model/invite";
import { ListEmpty } from "@/src/components/listEmpty";
import { InviteListItem } from "../inviteListItem";
import { GlobalUserContext } from "@/src/context/userContext";
import { useContext } from "react";

type InvitesListProps = {
  invites: InviteEntity[];
  acceptInvite: (invite: InviteEntity, accepted: boolean) => void;
  removeInvite: (invite: InviteEntity) => void;
};

export const InvitesList = ({
  invites,
  acceptInvite,
  removeInvite,
}: InvitesListProps) => {
  const { currentUser } = useContext(GlobalUserContext);

  const filteredSentInvites = invites.filter(
    (invite) =>
      invite.status === "pending" &&
      invite.referralUserId === currentUser?.user.uid
  );

  const filteredPendingInvites = invites.filter(
    (invite) =>
      invite.status === "pending" &&
      invite.referralUserId !== currentUser?.user.uid
  );

  return (
    <>
      <S.InvitesListWrapper>
        <S.InvitesListHeader>
          <S.InvitesListTitle>
            Convites enviados com status pendente: {filteredSentInvites.length}
          </S.InvitesListTitle>
        </S.InvitesListHeader>

        <S.Divisor />

        <FlatList
          data={filteredSentInvites}
          keyExtractor={(item, index) =>
            item.id?.toString() ?? index.toString()
          }
          ListEmptyComponent={() => <ListEmpty />}
          renderItem={({ item }) => (
            <InviteListItem
              item={item}
              acceptInvite={acceptInvite}
              isSentInvite={true}
              removeInvite={removeInvite}
            />
          )}
        />
      </S.InvitesListWrapper>

      <S.InvitesListWrapper>
        <S.InvitesListHeader>
          <S.InvitesListTitle>
            Você tem {filteredPendingInvites.length} convite(s) pendente(s)
          </S.InvitesListTitle>
        </S.InvitesListHeader>

        <S.Divisor />

        <FlatList
          data={filteredPendingInvites}
          keyExtractor={(item, index) =>
            item.id?.toString() ?? index.toString()
          }
          ListEmptyComponent={() => <ListEmpty />}
          renderItem={({ item }) => (
            <InviteListItem
              item={item}
              acceptInvite={acceptInvite}
              isSentInvite={false}
              removeInvite={() => {}}
            />
          )}
        />
      </S.InvitesListWrapper>
    </>
  );
};
