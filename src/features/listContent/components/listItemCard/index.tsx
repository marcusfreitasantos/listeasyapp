import * as S from "./styles";
import { ListItemType } from "../../../listsManager/model/list";

type ListItemCardProps = {
  listItem: ListItemType;
};

export const ListItemCard = ({ listItem }: ListItemCardProps) => {
  return (
    <S.ListItemWrapper>
      <S.ListItemTitle>{listItem.name}</S.ListItemTitle>
      <S.ListItemTitle>{listItem.price}</S.ListItemTitle>
      <S.ListItemTitle>{listItem.quantity}</S.ListItemTitle>
    </S.ListItemWrapper>
  );
};
