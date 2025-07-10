import * as S from "./styles";
import { ListEntityType } from "../../model/list";

type ListCardProps = {
  list: ListEntityType;
};

export const ListCard = ({ list }: ListCardProps) => {
  return (
    <S.ListCardWrapper>
      <S.ListCardTitle>{list.title}</S.ListCardTitle>
    </S.ListCardWrapper>
  );
};
