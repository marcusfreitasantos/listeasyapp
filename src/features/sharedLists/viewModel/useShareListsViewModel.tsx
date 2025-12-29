import { useContext, useState, useEffect } from "react";
import { Alert } from "react-native";
import { GlobalListContext } from "@/src/context/listContext";
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
import { getUserByEmail } from "@/src/services/firebase/auth";
import { useTranslation } from "react-i18next";

export const useShareListsViewModel = () => {
  const { t } = useTranslation();
  const { createInvitation, fetchUserInvites } = useInvitationsViewModel();
  const { getUserLists } = useListManagerViewModel();
  const isFocused = useIsFocused();
  const { currentList, setCurrentList } = useContext(GlobalListContext);
  const { currentUser } = useContext(GlobalUserContext);
  const [loading, setLoading] = useState(false);
  const [invitedUserEmail, setInvitedUsereEmail] = useState("");
  const [foundUser, setFoundUser] = useState<{
    displayName: string;
    email: string;
    uid: string;
  } | null>(null);

  const resetStates = () => {
    setLoading(false);
    setFoundUser(null);
    setInvitedUsereEmail("");
  };

  const fetchUsersByEmail = async (userEmail: string) => {
    try {
      setLoading(true);
      const response = await getUserByEmail(userEmail);
      setFoundUser(response);
    } catch (error) {
      console.error(error);
      setFoundUser(null);
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

      if (!listObj) throw new Error(t("invalid_list"));

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
      if (!listToUpdate) throw new Error(t("invalid_list"));

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
      referralUserId: currentUser?.user.uid ?? "",
      list: {
        id: currentList?.id ?? "",
        name: currentList?.title ?? "",
      },
      status: "pending",
    };

    Alert.alert(
      t("warning"),
      t("user_invitation_warning", {
        user_name: invitedUser.userName,
        list_name: currentList?.title,
      }),
      [
        {
          text: t("cancel"),
        },
        {
          text: t("confirm"),
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
        ? t("quit_list_warning", { list_name: list.title })
        : t("remove_user_from_list_warning", {
            user_name: invitedUser.userName,
            list_name: list.title,
          });

    Alert.alert(t("warning"), alertMsg, [
      {
        text: t("cancel"),
      },
      {
        text: t("confirm"),
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
    if (!currentUser) throw new Error(t("invalid_user"));

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
    } catch (e) {
      Alert.alert(t("error"), `${t("error_accept_invite")}. \n ${e}`);
    } finally {
      fetchUserInvites(currentUser?.user.email ?? "");
      setLoading(false);
    }
  };

  const sendInviteByWhatsapp = async () => {
    const playStoreLink =
      "https://play.google.com/store/apps/details?id=com.penpack.listeasy";

    const message = t("whatsapp_invite_msg", {
      user_name: currentUser?.user.displayName ?? currentUser?.user.email,
      list_name: currentList?.title,
      url: playStoreLink,
    });

    const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(message)}`;

    try {
      const supported = await Linking.canOpenURL(whatsappUrl);
      if (supported) {
        await Linking.openURL(whatsappUrl);
      } else {
        Alert.alert(t("error"), t("whatsapp_not_found"));
      }
    } catch (e) {
      Alert.alert(t("error"), `${t("failed_opening_whatsapp")}. \n ${e}`);
    }
  };

  const handleInvitationToNonUser = async () => {
    try {
      setLoading(true);
      const inviteObj: InviteEntity = {
        userEmail: invitedUserEmail,
        referralUsername:
          currentUser?.user.displayName ?? currentUser?.user.email ?? "",
        referralUserId: currentUser?.user.uid ?? "",
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
        t("error"),
        `${t("error_creating_invite")}. \n ${e}
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
    foundUser,
    handleAddColaboratorToCurrentList,
    handleRemoveColaboratorFromCurrentList,
    isAlreadyColaborator,
    addColaboratorToCurrentList,
    acceptInvite,
    handleInvitationToNonUser,
    setInvitedUsereEmail,
    invitedUserEmail,
  };
};
