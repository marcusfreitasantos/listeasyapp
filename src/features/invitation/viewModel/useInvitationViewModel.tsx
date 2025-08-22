import { useState, useEffect, useContext } from "react";
import { InviteEntity } from "../model/invite";
import {
  insertNewInvite,
  getInvitesByUserEmail,
} from "@/src/services/firebase/invitations";
import { Alert } from "react-native";
import { GlobalUserContext } from "@/src/context/userContext";

export const useInvitationViewModel = () => {
  const [invites, setInvites] = useState<InviteEntity[]>([]);
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
      if (response.length) setInvites(sortedInvites);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return { createInvitation, fetchUserInvites, invites };
};
