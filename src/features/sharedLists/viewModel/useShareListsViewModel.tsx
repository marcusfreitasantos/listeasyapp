import { useContext, useState, useEffect } from "react";
import { GlobalListContext } from "@/src/context/listContext";
import { getSubscriptionByUserEmail } from "@/src/services/firebase/subscriptions";
import { SubscriptionEntity } from "../../subscriptions/model/subscription";
import { updateListContent } from "@/src/services/firebase/lists";
import { useIsFocused } from "@react-navigation/native";
import { InvitedUserEntity } from "../model/invitedUser";
import { Alert } from "react-native";

export const useShareListsViewModel = () => {
  const isFocused = useIsFocused();
  const { currentList, setCurrentList } = useContext(GlobalListContext);
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
    invitedUser: InvitedUserEntity
  ) => {
    try {
      setLoading(true);
      if (!currentList) throw new Error("Lista inválida");

      const currentListColaborators = currentList.colaborators
        ? [...currentList.colaborators]
        : [];

      const colaboratorsIds = currentList.colaboratorsIds ?? [];

      const updatedList = {
        ...currentList,
        colaboratorsIds: [...colaboratorsIds, invitedUser.userId],
        colaborators: [...currentListColaborators, invitedUser],
      };

      await updateListContent(updatedList);
      setCurrentList(updatedList);
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
    Alert.alert(
      "Atenção!",
      `O usuário "${invitedUser.userName}" receberá acesso à lista: "${currentList?.title}". Deseja continuar?`,
      [
        {
          text: "Cancelar",
        },
        {
          text: "Confirmar",
          onPress: () => addColaboratorToCurrentList(invitedUser),
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
  };
};
