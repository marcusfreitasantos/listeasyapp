import * as S from "./styles";
import { ListEmpty } from "@/src/components/listEmpty";
import { Button } from "@/src/components/button";

type NotFoundUserCardProps = {
  sendInvite: () => void;
};

export const NotFoundUserCard = ({ sendInvite }: NotFoundUserCardProps) => {
  return (
    <>
      <ListEmpty
        title="Usuário não encontrado."
        text="Enviar convite pelo Whatsapp?"
      />

      <S.NotFoundContainer>
        <Button onPress={() => sendInvite()} btnText="Enviar convite" />
      </S.NotFoundContainer>
    </>
  );
};
