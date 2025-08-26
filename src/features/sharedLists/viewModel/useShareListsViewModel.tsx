import { useContext, useState, useEffect } from "react";
import { Alert } from "react-native";
import { GlobalListContext } from "@/src/context/listContext";
import { getSubscriptionByUserEmail } from "@/src/services/firebase/subscriptions";
import { SubscriptionEntity } from "../../subscriptions/model/subscription";
import { updateListContent, getListById } from "@/src/services/firebase/lists";
import { useIsFocused } from "@react-navigation/native";
import { InvitedUserEntity } from "../model/invitedUser";
import { InviteEntity } from "../../invitation/model/invite";
import { GlobalUserContext } from "@/src/context/userContext";
import { useInvitationsViewModel } from "../../invitation/viewModel/useInvitationsViewModel";
import { updateInvite } from "@/src/services/firebase/invitations";
import { useListManagerViewModel } from "../../listsManager/viewModel/useListManagerViewModel";
import { ListEntityType } from "../../listsManager/model/list";
import { Linking } from "react-native";

export const useShareListsViewModel = () => {
  const { createInvitation, fetchUserInvites } = useInvitationsViewModel();
  const { getUserLists } = useListManagerViewModel();
  const isFocused = useIsFocused();
  const { currentList, setCurrentList } = useContext(GlobalListContext);
  const { currentUser } = useContext(GlobalUserContext);
  const [loading, setLoading] = useState(false);
  const [invitedUserEmail, setInvitedUsereEmail] = useState("");
  const [foundUsers, setFoundUsers] = useState<SubscriptionEntity[] | null>(
    null
  );

  const resetStates = () => {
    setLoading(false);
    setFoundUsers(null);
  };

  const fetchUsersByEmail = async (userEmail: string) => {
    try {
      setLoading(true);
      const response = await getSubscriptionByUserEmail(userEmail);
      setFoundUsers(response);
    } catch (error) {
      console.log("Nothing found");
    } finally {
      setLoading(false);
    }
  };

  const addColaboratorToCurrentList = async (
    invitedUser: InvitedUserEntity,
    listId: string
  ) => {
    try {
      setLoading(true);
      const listObj = await getListById(listId);

      if (!listObj) throw new Error("Lista inválida");

      const listColaborators = listObj.colaborators
        ? [...listObj.colaborators]
        : [];

      const colaboratorsIds = listObj.colaboratorsIds ?? [];

      const updatedList = {
        ...listObj,
        colaboratorsIds: [...colaboratorsIds, invitedUser.userId],
        colaborators: [...listColaborators, invitedUser],
      };

      await updateListContent(updatedList);
    } catch (e) {
      console.log(e);
    } finally {
      resetStates();
    }
  };

  const removeColaboratorsFromCurrentList = async (
    invitedUser: InvitedUserEntity,
    listToUpdate = currentList
  ) => {
    try {
      setLoading(true);
      if (!listToUpdate) throw new Error("Lista inválida");

      const currentListColaborators = listToUpdate.colaborators
        ? [...listToUpdate.colaborators]
        : [];

      const updatedList = {
        ...listToUpdate,
        colaboratorsIds: listToUpdate.colaboratorsIds?.filter(
          (colaboratorId) => colaboratorId !== invitedUser.userId
        ),
        colaborators: [
          ...currentListColaborators.filter(
            (colaborator) => colaborator.userId !== invitedUser.userId
          ),
        ],
      };

      await updateListContent(updatedList);
      setCurrentList(updatedList);
    } catch (e) {
      console.log(e);
    } finally {
      resetStates();
      getUserLists();
    }
  };

  const handleAddColaboratorToCurrentList = async (
    invitedUser: InvitedUserEntity
  ) => {
    const inviteObj: InviteEntity = {
      userEmail: invitedUser.userEmail,
      referralUsername:
        currentUser?.user.displayName ?? currentUser?.user.email ?? "",
      list: {
        id: currentList?.id ?? "",
        name: currentList?.title ?? "",
      },
      status: "pending",
    };

    Alert.alert(
      "Atenção!",
      `O usuário "${invitedUser.userName}" receberá um convite para ter acesso à lista: "${currentList?.title}". Deseja continuar?`,
      [
        {
          text: "Cancelar",
        },
        {
          text: "Confirmar",
          onPress: async () => {
            try {
              setLoading(true);
              await createInvitation(inviteObj);
            } catch (error) {
              console.log("Error sending invite: ", error);
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  const handleRemoveColaboratorFromCurrentList = async (
    invitedUser: InvitedUserEntity,
    list: ListEntityType
  ) => {
    const alertMsg =
      invitedUser.userId === currentUser?.user.uid
        ? `Você sairá da lista: "${list.title}". Deseja continuar?`
        : `O usuário "${invitedUser.userName}" será removido da lista: "${list.title}". Deseja continuar?`;

    Alert.alert("Atenção!", alertMsg, [
      {
        text: "Cancelar",
      },
      {
        text: "Confirmar",
        onPress: () => removeColaboratorsFromCurrentList(invitedUser, list),
      },
    ]);
  };

  const isAlreadyColaborator = (userId: string) => {
    const alreadyColaborator =
      currentList?.colaborators?.find((item) => item.userId === userId) ??
      false;

    if (alreadyColaborator) return true;
    return false;
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

  const sendInviteByWhatsapp = async () => {
    const playStoreLink =
      "https://play.google.com/store/apps/details?id=com.penpack.listeasy";
    const message = `👋 Ei! ${
      currentUser?.user.displayName ?? currentUser?.user.email
    } te convidou pra usar o List Easy! 📋✨
Vamos organizar juntos a lista "${currentList?.title}"? 
Baixe o app aqui 👉 ${playStoreLink} 🚀🛒
Te espero lá! 😄`;

    const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(message)}`;

    try {
      const supported = await Linking.canOpenURL(whatsappUrl);
      if (supported) {
        await Linking.openURL(whatsappUrl);
      } else {
        Alert.alert("Erro", "Whatsapp não está instalado no seu dispositivo.");
      }
    } catch (e) {
      Alert.alert("Erro", "Falha ao abrir o WhatsApp: " + e);
    }
  };

  const handleInvitationToNonUser = async () => {
    try {
      setLoading(true);
      const inviteObj: InviteEntity = {
        userEmail: invitedUserEmail,
        referralUsername:
          currentUser?.user.displayName ?? currentUser?.user.email ?? "",
        list: {
          id: currentList?.id ?? "",
          name: currentList?.title ?? "",
        },
        status: "pending",
      };

      await createInvitation(inviteObj);
      sendInviteByWhatsapp();
    } catch (e) {
      Alert.alert(
        "Erro",
        `Não foi possível gerar o convite. Tente novamente mais tarde. \n ${e}
        )}`
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) resetStates();
  }, [isFocused]);

  return {
    currentList,
    loading,
    fetchUsersByEmail,
    foundUsers,
    handleAddColaboratorToCurrentList,
    handleRemoveColaboratorFromCurrentList,
    isAlreadyColaborator,
    addColaboratorToCurrentList,
    acceptInvite,
    handleInvitationToNonUser,
    setInvitedUsereEmail,
  };
};
