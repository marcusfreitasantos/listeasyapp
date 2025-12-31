import { useContext } from "react";
import * as S from "./styles";
import { FlatList } from "react-native-gesture-handler";
import { InviteEntity } from "../../model/invite";
import { ListEmpty } from "@/src/components/listEmpty";
import { InviteListItem } from "../inviteListItem";
import { GlobalUserContext } from "@/src/context/userContext";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
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
            {t("pending_invitations")}: {filteredSentInvites.length}
          </S.InvitesListTitle>
        </S.InvitesListHeader>

        <S.Divisor />

        <FlatList
          data={filteredSentInvites}
          keyExtractor={(item, index) =>
            item.id?.toString() ?? index.toString()
          }
          ListEmptyComponent={() => <ListEmpty title={t("nothing_found")} />}
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
            {t("you_have_count_pending_invites", {
              count: filteredPendingInvites.length,
            })}
          </S.InvitesListTitle>
        </S.InvitesListHeader>

        <S.Divisor />

        <FlatList
          data={filteredPendingInvites}
          keyExtractor={(item, index) =>
            item.id?.toString() ?? index.toString()
          }
          ListEmptyComponent={() => <ListEmpty title={t("nothing_found")} />}
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
