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

export const useInvitationsViewModel = () => {
  const { currentUserInvites, setCurrentUserInvites } = useContext(
    GlobalInvitationsContext
  );
  const [loadingInvites, setLoadingInvites] = useState(false);
  const router = useRouter();

  const createInvitation = async (inviteObj: InviteEntity) => {
    try {
      await insertNewInvite(inviteObj);
      Alert.alert(
        "Maravilha!",
        `Seu convite para ${inviteObj.userEmail} foi enviado.`,
        [
          { text: "Convites", onPress: () => router.push("/invitations") },
          { text: "voltar" },
        ]
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
      if (response.length) setCurrentUserInvites(sortedInvites);
      return sortedInvites;
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const fetchInvitesSentByCurrentUser = async (userId: string) => {
    try {
      setLoadingInvites(true);
      const response = await getInvitesSentByCurrentUser(userId);

      response.forEach((invite) => {
        const alreadyAdded = currentUserInvites.find(
          (existingInvite) => existingInvite.id === invite.id
        );
        if (!alreadyAdded)
          setCurrentUserInvites([...currentUserInvites, invite]);
      });

      return response;
    } catch (error) {
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
        (invite) => invite.id !== inviteObj.id
      );

      setCurrentUserInvites(updatedInvites);
      return updatedInvites;
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setLoadingInvites(false);
    }
  };

  const handleRemoveCurrentUserInvitation = (inviteObj: InviteEntity) => {
    Alert.alert(
      "Atenção!",
      `O convite para '${inviteObj.userEmail}' será removido. Continuar?`,
      [
        {
          text: "Cancelar",
        },
        {
          text: "Continuar",
          onPress: () => removeCurrentUserInvitationById(inviteObj),
        },
      ]
    );
  };

  return {
    createInvitation,
    fetchUserInvites,
    currentUserInvites,
    fetchInvitesSentByCurrentUser,
    handleRemoveCurrentUserInvitation,
    loadingInvites,
  };
};
