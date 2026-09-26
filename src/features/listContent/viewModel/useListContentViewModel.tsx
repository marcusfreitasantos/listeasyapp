import { useState, useContext, useEffect } from "react";
import { GlobalListContext } from "@/src/context/listContext";
import { updateListContent } from "@/src/services/firebase/lists";
import { ListItemType } from "../../listsManager/model/list";
import { calculateCurrentListTotal } from "@/src/utils/calculateCurrentListTotal";
import { useInterstitialAd, TestIds } from "react-native-google-mobile-ads";
import { useIsFocused } from "@react-navigation/native";
import { Platform, Alert } from "react-native";
import { useTranslation } from "react-i18next";
import { GlobalSubscriptionContext } from "@/src/context/subscriptionContext";
import * as Crypto from "expo-crypto";
import { reaisToCents, centsToReais } from "@/src/utils/convertCurrency";
import { GlobalProductsContext } from "@/src/context/productsContext";
import { useObservabilityViewModel } from "@/src/features/observability/viewModel/useObservabilityViewModel";

export const useListContentViewModel = () => {
  const { logAnalyticsEvent, logHandledError } = useObservabilityViewModel();
  const { t } = useTranslation();
  const { currentList, setCurrentList } = useContext(GlobalListContext);
  const { currentSubscription } = useContext(GlobalSubscriptionContext);
  const { currency } = useContext(GlobalProductsContext);
  const [currentItems, setCurrentItems] = useState(currentList?.items ?? []);
  const [currentStatus, setCurrentStatus] = useState<string[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentItem, setCurrentItem] = useState<ListItemType | null>(null);
  const [renameModalIsOpen, setRenameModalIsOpen] = useState(false);
  const [showItemsFilter, setShowItemsFilter] = useState(false);
  const admobPubId =
    Platform.OS === "android"
      ? "ca-app-pub-8430347978354434/6035864738"
      : "ca-app-pub-8430347978354434/6152293969";
  const { isLoaded, isClosed, load, show } = useInterstitialAd(
    __DEV__ ? TestIds.INTERSTITIAL : admobPubId,
  );

  const [isSubscriber, setIsSubscriber] = useState(false);

  const isFocused = useIsFocused();

  const resetStates = () => {
    setModalIsOpen(false);
    setLoading(false);
    setCurrentItem(null);
    setRenameModalIsOpen(false);
  };

  const updateListItems = async (listItems: ListItemType) => {
    try {
      setLoading(true);
      if (!currentList) throw new Error(t("invalid_list"));

      const updatedItems = [...currentList.items, listItems];

      const updatedList = {
        ...currentList,
        totalPrice: calculateCurrentListTotal(updatedItems),
        items: updatedItems,
      };

      await updateListContent(updatedList);
      setCurrentList(updatedList);
      await logAnalyticsEvent("item_added", {
        item_count_after: updatedItems.length,
        has_price: listItems.price > 0,
      });
    } catch (e) {
      await logHandledError("add_item", e);
    } finally {
      resetStates();
    }
  };

  const updateListName = async (listName: string) => {
    try {
      setLoading(true);
      if (!currentList) throw new Error(t("invalid_list"));

      const updatedList = {
        ...currentList,
        title: listName,
      };

      await updateListContent(updatedList);
      setCurrentList(updatedList);
      await logAnalyticsEvent("list_renamed");
    } catch (e) {
      await logHandledError("rename_list", e);
    } finally {
      resetStates();
    }
  };

  const updateSingleItem = async (updatedItem: ListItemType) => {
    if (modalIsOpen) setLoading(true);

    try {
      if (!currentList) throw new Error(t("invalid_list"));

      const updatedItems = currentList.items.map((item) =>
        item.id === updatedItem.id ? updatedItem : item,
      );

      const updatedList = {
        ...currentList,
        totalPrice: calculateCurrentListTotal(updatedItems),
        items: updatedItems,
      };

      await updateListContent(updatedList);
      setCurrentList(updatedList);
      await logAnalyticsEvent("item_updated", {
        item_count: updatedItems.length,
      });
    } catch (e) {
      await logHandledError("update_item", e);
    } finally {
      resetStates();
    }
  };

  const removeItemFromList = async (itemToRemoveId: string) => {
    try {
      setLoading(true);
      if (!currentList) throw new Error(t("invalid_list"));

      const itemsUpdated = currentList?.items.filter(
        (item) => item.id !== itemToRemoveId,
      );

      const updatedList = {
        ...currentList,
        totalPrice: calculateCurrentListTotal(itemsUpdated),
        items: itemsUpdated,
      };

      await updateListContent(updatedList);
      setCurrentList(updatedList);
      await logAnalyticsEvent("item_removed", {
        item_count_after: itemsUpdated.length,
      });
    } catch (e) {
      await logHandledError("remove_item", e);
    } finally {
      resetStates();
    }
  };

  const handleAddNewItem = () => {
    const showAd =
      currentList &&
      currentList.items.length &&
      currentList.items.length % 10 === 0;
    if (!isSubscriber && isLoaded && showAd) {
      show();
    } else {
      setModalIsOpen(!modalIsOpen);
    }
  };

  const filterItemsByStatus = () => {
    const items = currentList?.items ?? [];

    if (currentStatus.length === 0 || currentStatus.length === 2) {
      setCurrentItems(items);
      return;
    }

    const showChecked = currentStatus.includes("checked");

    setCurrentItems(
      items.filter((item: ListItemType) => item.checked === showChecked),
    );
  };

  const handleAddListItemSubmit = (formData: ListItemType) => {
    const formatedData = {
      id: Crypto.randomUUID(),
      name: formData.name,
      price: reaisToCents(Number(formData.price)),
      quantity: Number(formData.quantity),
      details: formData.details,
      checked: currentItem?.checked ?? false,
    };

    if (currentItem && typeof currentItem.id === "string") {
      updateSingleItem({ ...formatedData, id: currentItem.id });
    } else {
      updateListItems(formatedData);
    }
  };

  const handleRemoveItemFromList = (itemName: string, itemId: string) => {
    Alert.alert(
      t("warning"),
      t("item_will_be_removed", { item_name: itemName }),
      [
        {
          text: t("cancel"),
        },
        {
          text: t("confirm"),
          onPress: () => removeItemFromList(itemId),
        },
      ],
    );
  };

  const handleEditItem = (listItem: ListItemType) => {
    setCurrentItem({ ...listItem });
    setModalIsOpen(true);
  };

  const handleCheckItem = (isChecked: boolean, listItem: ListItemType) => {
    setCurrentItem({ ...listItem, checked: isChecked });
    void logAnalyticsEvent("item_checked", { checked: isChecked });
    updateSingleItem({ ...listItem, checked: isChecked });
  };

  useEffect(() => {
    if (!modalIsOpen) resetStates();
  }, [modalIsOpen]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (isClosed) {
      setModalIsOpen(true);
    }
  }, [isClosed]);

  useEffect(() => {
    resetStates();
    setIsSubscriber(currentSubscription?.status === "active");
  }, [isFocused]);

  useEffect(() => {
    if (currentList) {
      filterItemsByStatus();
    }
  }, [currentList?.items, currentStatus]);

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
    updateSingleItem,
    renameModalIsOpen,
    setRenameModalIsOpen,
    updateListName,
    handleAddNewItem,
    currentItems,
    showItemsFilter,
    setShowItemsFilter,
    setCurrentStatus,
    handleAddListItemSubmit,
    currency,
    handleRemoveItemFromList,
    handleEditItem,
    handleCheckItem,
  };
};
