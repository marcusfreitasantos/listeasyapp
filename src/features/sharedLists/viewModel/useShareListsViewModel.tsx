import { useContext, useState, useEffect } from "react";
import { GlobalListContext } from "@/src/context/listContext";
import { getSubscriptionByUserEmail } from "@/src/services/firebase/subscriptions";
import { SubscriptionEntity } from "../../subscriptions/model/subscription";
import { useIsFocused } from "@react-navigation/native";

export const useShareListsViewModel = () => {
  const isFocused = useIsFocused();
  const { currentList } = useContext(GlobalListContext);
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

  const handleAddUserToCurrentList = async (userObj: {
    name: string;
    email: string;
  }) => {
    console.log(userObj);
  };

  useEffect(() => {
    if (isFocused) resetStates();
  }, [isFocused]);

  return {
    currentList,
    loading,
    fetchUsersByEmail,
    foundUsers,
    handleAddUserToCurrentList,
  };
};
