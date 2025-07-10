import * as S from "./styles";
import { ListItemType } from "../../model/list";

type ListItemProps = {
  listItem: ListItemType;
};

export const ListItem = ({ listItem }: ListItemProps) => {
  return (
    <S.ListItemWrapper>
      <S.ListItemTitle>Title</S.ListItemTitle>
    </S.ListItemWrapper>
  );
};
