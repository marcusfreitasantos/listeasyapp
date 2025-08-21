import { useState, useEffect } from "react";
import { InviteEntity } from "../model/invite";
import { insertNewInvite } from "@/src/services/firebase/invitations";
import { Alert } from "react-native";

export const useInvitationViewModel = () => {
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

  return { createInvitation };
};
