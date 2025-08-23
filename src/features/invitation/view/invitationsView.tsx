import { useContext } from "react";
import { useShareListsViewModel } from "../../sharedLists/viewModel/useShareListsViewModel";
import { InvitesList } from "../components/invitesList";
import * as S from "./styles";
import { LoadingSpinner } from "@/src/components/loadingSpinner";
import { GlobalInvitationsContext } from "@/src/context/invitationsContext";

export const InvitationsView = () => {
  const { currentUserInvites } = useContext(GlobalInvitationsContext);
  const { loading, acceptInvite } = useShareListsViewModel();

  if (loading)
    return (
      <S.Container>
        <LoadingSpinner />
      </S.Container>
    );

  return (
    <InvitesList invites={currentUserInvites} acceptInvite={acceptInvite} />
  );
};
