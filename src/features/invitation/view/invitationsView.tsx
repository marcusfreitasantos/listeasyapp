import { useEffect } from "react";
import { useRouter } from "expo-router";
import { InvitesList } from "../components/invitesList";
import { useInvitationsViewModel } from "../viewModel/useInvitationsViewModel";
import { LoadingSpinner } from "@/src/components/loadingSpinner";

export const InvitationsView = () => {
  const router = useRouter();
  const { currentUserInvites, acceptInvite, loading } =
    useInvitationsViewModel();

  useEffect(() => {
    if (!currentUserInvites.length) router.push("/lists");
  }, [currentUserInvites]);

  if (loading) return <LoadingSpinner />;

  return (
    <InvitesList invites={currentUserInvites} acceptInvite={acceptInvite} />
  );
};
