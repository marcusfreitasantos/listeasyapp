import * as S from "./styles";
import { ListEmpty } from "@/src/components/listEmpty";
import { Button } from "@/src/components/button";

export const NotFoundUserCard = () => {
  return (
    <>
      <ListEmpty
        title="Usuário não encontrado."
        text="Enviar convite pelo Whatsapp?"
      />

      <S.NotFoundContainer>
        <Button onPress={() => console.log("whats")} btnText="Enviar convite" />
      </S.NotFoundContainer>
    </>
  );
};
