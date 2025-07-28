import { ListItemType } from "../features/listsManager/model/list";

export const calculateCurrentListTotal = (currentListItems: ListItemType[]) => {
  let total = 0;

  currentListItems.forEach((item: ListItemType) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
  });

  return total;
};
