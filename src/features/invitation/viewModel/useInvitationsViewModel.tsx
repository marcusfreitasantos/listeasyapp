import { useContext } from "react";
import { InviteEntity } from "../model/invite";
import {
  insertNewInvite,
  getInvitesByUserEmail,
} from "@/src/services/firebase/invitations";
import { Alert } from "react-native";
import { GlobalInvitationsContext } from "@/src/context/invitationsContext";

export const useInvitationsViewModel = () => {
  const { currentUserInvites, setCurrentUserInvites } = useContext(
    GlobalInvitationsContext
  );

  const createInvitation = async (inviteObj: InviteEntity) => {
    try {
      await insertNewInvite(inviteObj);
      Alert.alert(
        "Maravilha!",
        `Seu convite para ${inviteObj.userEmail} foi enviado.`
      );
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

  return {
    createInvitation,
    fetchUserInvites,
    currentUserInvites,
  };
};
