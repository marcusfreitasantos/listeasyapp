import { useState, useContext, useEffect, use } from "react";
import { GlobalListContext } from "@/src/context/listContext";
import { updateListContent } from "@/src/services/firebase/lists";
import { ListItemType } from "../../listsManager/model/list";
import { calculateCurrentListTotal } from "@/src/utils/calculateCurrentListTotal";
import { useInterstitialAd, TestIds } from "react-native-google-mobile-ads";
import { GlobalUserContext } from "@/src/context/userContext";
import { GlobalSubscriptionContext } from "@/src/context/subscriptionContext";

export const useListContentViewModel = () => {
  const { currentList, setCurrentList } = useContext(GlobalListContext);
  const { currentSubscription } = useContext(GlobalSubscriptionContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentItem, setCurrentItem] = useState<ListItemType | null>(null);
  const [renameModalIsOpen, setRenameModalIsOpen] = useState(false);
  const { isLoaded, isClosed, load, show } = useInterstitialAd(
    __DEV__ ? TestIds.INTERSTITIAL : "ca-app-pub-8430347978354434/6035864738"
  );

  const resetStates = () => {
    setModalIsOpen(false);
    setLoading(false);
    setCurrentItem(null);
    setRenameModalIsOpen(false);
  };

  const updateListItems = async (listItems: ListItemType) => {
    try {
      setLoading(true);
      if (!currentList) throw new Error("Lista inválida");

      const updatedItems = [...currentList.items, listItems];

      const updatedList = {
        ...currentList,
        totalPrice: calculateCurrentListTotal(updatedItems),
        items: updatedItems,
      };

      await updateListContent(updatedList);
      setCurrentList(updatedList);
    } catch (e) {
      console.log(e);
    } finally {
      resetStates();
    }
  };

  const updateListName = async (listName: string) => {
    try {
      setLoading(true);
      if (!currentList) throw new Error("Lista inválida");

      const updatedList = {
        ...currentList,
        title: listName,
      };

      await updateListContent(updatedList);
      setCurrentList(updatedList);
    } catch (e) {
      console.log(e);
    } finally {
      resetStates();
    }
  };

  const updateItemInList = async (updatedItem: ListItemType) => {
    try {
      setLoading(true);
      if (!currentList) throw new Error("Lista inválida");

      let updatedItems = [...currentList.items].filter(
        (item) => item.id !== updatedItem.id
      );

      updatedItems.push(updatedItem);

      const updatedList = {
        ...currentList,
        totalPrice: calculateCurrentListTotal(updatedItems),
        items: updatedItems,
      };

      await updateListContent(updatedList);
      setCurrentList(updatedList);
    } catch (e) {
      console.log(e);
    } finally {
      resetStates();
    }
  };

  const removeItemFromList = async (itemToRemoveId: string) => {
    try {
      setLoading(true);
      if (!currentList) throw new Error("Lista inválida");

      const itemsUpdated = currentList?.items.filter(
        (item) => item.id !== itemToRemoveId
      );

      const updatedList = {
        ...currentList,
        totalPrice: calculateCurrentListTotal(itemsUpdated),
        items: itemsUpdated,
      };

      await updateListContent(updatedList);
      setCurrentList(updatedList);
    } catch (e) {
      console.log(e);
    } finally {
      resetStates();
    }
  };

  const handleAddNewItem = () => {
    const showAd =
      (!currentSubscription ||
        currentSubscription.stripeSubscriptionStatus !== "active") &&
      currentList &&
      currentList.items.length &&
      currentList.items.length % 5 === 0;
    if (isLoaded && showAd) {
      show();
    } else {
      setModalIsOpen(!modalIsOpen);
    }
  };

  useEffect(() => {
    if (!modalIsOpen) setCurrentItem(null);
  }, [modalIsOpen]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (isClosed) {
      setModalIsOpen(true);
    }
  }, [isClosed]);

  return {
    updateListItems,
    currentList,
    modalIsOpen,
    searchTerm,
    setModalIsOpen,
    setSearchTerm,
    loading,
    removeItemFromList,
    currentItem,
    setCurrentItem,
    updateItemInList,
    renameModalIsOpen,
    setRenameModalIsOpen,
    updateListName,
    handleAddNewItem,
  };
};
