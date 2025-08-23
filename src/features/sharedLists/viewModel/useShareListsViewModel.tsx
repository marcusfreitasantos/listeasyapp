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

export const useShareListsViewModel = () => {
  const isFocused = useIsFocused();
  const { currentList, setCurrentList } = useContext(GlobalListContext);
  const { currentUser } = useContext(GlobalUserContext);
  const [loading, setLoading] = useState(false);
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
    invitedUser: InvitedUserEntity
  ) => {
    try {
      setLoading(true);
      if (!currentList) throw new Error("Lista inválida");

      const currentListColaborators = currentList.colaborators
        ? [...currentList.colaborators]
        : [];

      const updatedList = {
        ...currentList,
        colaboratorsIds: currentList.colaboratorsIds?.filter(
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
          onPress: () => console.log(inviteObj),
        },
      ]
    );
  };

  const handleRemoveColaboratorFromCurrentList = async (
    invitedUser: InvitedUserEntity
  ) => {
    Alert.alert(
      "Atenção!",
      `O usuário "${invitedUser.userName}" será removido da lista: "${currentList?.title}". Deseja continuar?`,
      [
        {
          text: "Cancelar",
        },
        {
          text: "Confirmar",
          onPress: () => removeColaboratorsFromCurrentList(invitedUser),
        },
      ]
    );
  };

  const isAlreadyColaborator = (userId: string) => {
    const alreadyColaborator =
      currentList?.colaborators?.find((item) => item.userId === userId) ??
      false;

    if (alreadyColaborator) return true;
    return false;
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
  };
};
