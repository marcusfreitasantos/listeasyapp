import { useState, useEffect, useContext } from "react";
import { InviteEntity } from "../model/invite";
import {
  insertNewInvite,
  getInvitesByUserEmail,
  updateInvite,
} from "@/src/services/firebase/invitations";
import { Alert } from "react-native";
import { useShareListsViewModel } from "../../sharedLists/viewModel/useShareListsViewModel";
import { InvitedUserEntity } from "../../sharedLists/model/invitedUser";
import { GlobalUserContext } from "@/src/context/userContext";
import { GlobalInvitationsContext } from "@/src/context/invitationsContext";

export const useInvitationsViewModel = () => {
  const { currentUserInvites, setCurrentUserInvites } = useContext(
    GlobalInvitationsContext
  );
  const { currentUser } = useContext(GlobalUserContext);
  const { addColaboratorToCurrentList } = useShareListsViewModel();
  const [loading, setLoading] = useState(false);

  const createInvitation = async (inviteObj: InviteEntity) => {
    try {
      const response = await insertNewInvite(inviteObj);
      console.log(response);
    } catch (error) {
      console.log("Error creating invitation:", error);
      Alert.alert(
        "Oops!",
        "Não foi possível criar o convite. Tente novamente mais tarde."
      );
    }
  };

  const fetchUserInvites = async (userEmail: string) => {
    try {
      const response = await getInvitesByUserEmail(userEmail);
      const sortedInvites = response.filter(
        (invite) => invite.status === "pending"
      );
      console.log("Fetched invites: ", sortedInvites);
      if (response.length) setCurrentUserInvites(sortedInvites);
      return sortedInvites;
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const acceptInvite = async (invite: InviteEntity, accepted: boolean) => {
    if (!currentUser) throw new Error("Invalid user");

    try {
      setLoading(true);
      const updatedInvite = {
        ...invite,
        status: accepted
          ? "accepted"
          : ("declined" as "pending" | "accepted" | "declined"),
      };

      await updateInvite(updatedInvite);

      if (accepted) {
        await addColaboratorToCurrentList(
          {
            userId: currentUser.user.uid,
            userName: currentUser.user.displayName ?? "",
            userEmail: currentUser.user.email ?? "",
          },
          invite.list.id
        );
      }
    } catch (error) {
      console.log("Error accepting invite: ", error);
    } finally {
      fetchUserInvites(currentUser?.user.email ?? "");
      setLoading(false);
    }
  };

  return {
    createInvitation,
    fetchUserInvites,
    currentUserInvites,
    acceptInvite,
    loading,
  };
};
