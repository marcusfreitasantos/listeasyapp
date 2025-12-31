import * as S from "./styles";
import { ListEmpty } from "@/src/components/listEmpty";
import { Button } from "@/src/components/button";
import { useTranslation } from "react-i18next";

type NotFoundUserCardProps = {
  sendInvite: () => void;
};

export const NotFoundUserCard = ({ sendInvite }: NotFoundUserCardProps) => {
  const { t } = useTranslation();

  return (
    <>
      <ListEmpty title={t("user_not_found")} text={t("send_whatsapp_invite")} />

      <S.NotFoundContainer>
        <Button onPress={() => sendInvite()} btnText={t("invite_user")} />
      </S.NotFoundContainer>
    </>
  );
};
