import * as S from "./styles";
import { ListItemType } from "../../../listsManager/model/list";

type ListItemCardProps = {
  listItem: ListItemType;
};

export const ListItemCard = ({ listItem }: ListItemCardProps) => {
  return (
    <S.ListItemWrapper>
      <S.ListItemTitle>Title</S.ListItemTitle>
    </S.ListItemWrapper>
  );
};
