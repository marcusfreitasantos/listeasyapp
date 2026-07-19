import { useContext, useState } from "react";
import * as S from "./styles";
import { FlatList } from "react-native-gesture-handler";
import { InviteEntity } from "../../model/invite";
import { ListEmpty } from "@/src/components/listEmpty";
import { InviteListItem } from "../inviteListItem";
import { GlobalUserContext } from "@/src/context/userContext";
import { useTranslation } from "react-i18next";
import { DynamicTabsMenu } from "@/src/components/dynamicTabsMenu";

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
      invite.referralUserId === currentUser?.user.uid,
  );

  const filteredReceivedInvites = invites.filter(
    (invite) =>
      invite.status === "pending" &&
      invite.referralUserId !== currentUser?.user.uid,
  );

  const [selectedTab, setSelectedTab] = useState<"sent" | "received">("sent");

  return (
    <>
      <DynamicTabsMenu
        options={[
          { label: t("sent"), value: "sent" },
          { label: t("received"), value: "received" },
        ]}
        selectedOption={selectedTab}
        onSelectOption={(value) => setSelectedTab(value as "sent" | "received")}
      />

      {selectedTab === "sent" ? (
        <S.InvitesListWrapper>
          <S.InvitesListHeader>
            <S.InvitesListTitle>
              {t("sent_invitations")}: {filteredSentInvites.length}
            </S.InvitesListTitle>
          </S.InvitesListHeader>

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
      ) : (
        <S.InvitesListWrapper>
          <S.InvitesListHeader>
            <S.InvitesListTitle>
              {t("received_invitations")}: {filteredReceivedInvites.length}
            </S.InvitesListTitle>
          </S.InvitesListHeader>

          <FlatList
            data={filteredReceivedInvites}
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
      )}
    </>
  );
};
