import { useContext, useState } from "react";
import { InviteEntity } from "../model/invite";
import {
  insertNewInvite,
  getInvitesByUserEmail,
  getInvitesSentByCurrentUser,
  removeInviteById,
} from "@/src/services/firebase/invitations";
import { Alert } from "react-native";
import { GlobalInvitationsContext } from "@/src/context/invitationsContext";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { GlobalUserContext } from "@/src/context/userContext";
import {
  logAnalyticsEvent,
  logHandledError,
} from "@/src/services/observability";

export const useInvitationsViewModel = () => {
  const { t } = useTranslation();
  const { currentUserInvites, setCurrentUserInvites } = useContext(
    GlobalInvitationsContext,
  );
  const { currentUser } = useContext(GlobalUserContext);
  const [loadingInvites, setLoadingInvites] = useState(false);
  const router = useRouter();

  const createInvitation = async (inviteObj: InviteEntity) => {
    try {
      await insertNewInvite(inviteObj);
      Alert.alert(
        t("great"),
        t("your_invite_was_sent", { email_address: inviteObj.userEmail }),
        [
          {
            text: t("invitations"),
            onPress: () => router.push("/invitations"),
          },
          { text: t("back") },
        ],
      );
    } catch (error) {
      await logHandledError("send_invite", error);
      Alert.alert(t("something_wrong"), `${error}`);
    }
  };

  const fetchInvitesReceivedByCurrentUser = async (userEmail: string) => {
    if (currentUser?.user.isAnonymous) return;
    try {
      const response = await getInvitesByUserEmail(userEmail);
      const sortedInvites = response.filter(
        (invite) => invite.status === "pending",
      );
      if (response.length) setCurrentUserInvites(sortedInvites);
      return sortedInvites;
    } catch (error) {
      await logHandledError("fetch_received_invites", error);
      console.log("Error: ", error);
    }
  };

  const fetchInvitesSentByCurrentUser = async (userId: string) => {
    try {
      setLoadingInvites(true);
      const response = await getInvitesSentByCurrentUser(userId);

      const fetchedInvites = response.filter((invite) => {
        if (
          currentUserInvites.some(
            (existingInvite) => existingInvite.id === invite.id,
          )
        )
          return;

        return invite;
      });

      setCurrentUserInvites([...currentUserInvites, ...fetchedInvites]);
    } catch (error) {
      await logHandledError("fetch_sent_invites", error);
      console.log("Error: ", error);
    } finally {
      setLoadingInvites(false);
    }
  };

  const removeCurrentUserInvitationById = async (inviteObj: InviteEntity) => {
    try {
      setLoadingInvites(true);
      await removeInviteById(inviteObj.id ?? "");

      const updatedInvites = currentUserInvites.filter(
        (invite) => invite.id !== inviteObj.id,
      );

      setCurrentUserInvites(updatedInvites);
      await logAnalyticsEvent("invite_deleted");
      return updatedInvites;
    } catch (error) {
      await logHandledError("delete_invite", error);
      console.log("Error: ", error);
    } finally {
      setLoadingInvites(false);
    }
  };

  const handleRemoveCurrentUserInvitation = (inviteObj: InviteEntity) => {
    Alert.alert(
      t("warning"),
      t("remove_invite_for_user", { email_address: inviteObj.userEmail }),
      [
        {
          text: t("cancel"),
        },
        {
          text: t("continue"),
          onPress: () => removeCurrentUserInvitationById(inviteObj),
        },
      ],
    );
  };

  return {
    createInvitation,
    fetchInvitesReceivedByCurrentUser,
    currentUserInvites,
    fetchInvitesSentByCurrentUser,
    handleRemoveCurrentUserInvitation,
    loadingInvites,
  };
};
