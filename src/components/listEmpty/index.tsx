import * as S from "./styles";

type ListEmptyProps = {
  title?: string;
  text?: string;
};

export const ListEmpty = ({ title, text }: ListEmptyProps) => {
  return (
    <S.Container>
      <S.ListEmptyTitle>{title ?? "Nada encontrado."}</S.ListEmptyTitle>

      {text && <S.ListEmptyText>{text}</S.ListEmptyText>}
    </S.Container>
  );
};
