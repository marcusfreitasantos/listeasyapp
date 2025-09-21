import { useContext, useEffect } from "react";
import { useShareListsViewModel } from "../../sharedLists/viewModel/useShareListsViewModel";
import { InvitesList } from "../components/invitesList";
import * as S from "./styles";
import { LoadingSpinner } from "@/src/components/loadingSpinner";
import { GlobalInvitationsContext } from "@/src/context/invitationsContext";
import { useInvitationsViewModel } from "../viewModel/useInvitationsViewModel";
import { useIsFocused } from "@react-navigation/native";
import { GlobalUserContext } from "@/src/context/userContext";

export const InvitationsView = () => {
  const isFocused = useIsFocused();
  const { currentUser } = useContext(GlobalUserContext);
  const { currentUserInvites } = useContext(GlobalInvitationsContext);
  const {
    loadingInvites,
    fetchInvitesSentByCurrentUser,
    handleRemoveCurrentUserInvitation,
  } = useInvitationsViewModel();
  const { loading, acceptInvite } = useShareListsViewModel();

  useEffect(() => {
    if (isFocused && currentUser)
      fetchInvitesSentByCurrentUser(currentUser?.user.uid);
  }, [isFocused]);

  if (loading || loadingInvites)
    return (
      <S.Container>
        <LoadingSpinner />
      </S.Container>
    );

  return (
    <InvitesList
      invites={currentUserInvites}
      acceptInvite={acceptInvite}
      removeInvite={handleRemoveCurrentUserInvitation}
    />
  );
};
