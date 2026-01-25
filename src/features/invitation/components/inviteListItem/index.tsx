import * as S from "./styles";
import { Button } from "@/src/components/button";
import { InviteEntity } from "../../model/invite";
import { useTranslation } from "react-i18next";

type InviteListItemProps = {
  item: InviteEntity;
  isSentInvite: boolean;
  acceptInvite: (invite: InviteEntity, accepted: boolean) => void;
  removeInvite: (invite: InviteEntity) => void;
};

export const InviteListItem = ({
  item,
  acceptInvite,
  removeInvite,
  isSentInvite,
}: InviteListItemProps) => {
  const { t } = useTranslation();
  const handleReject = () => {
    if (isSentInvite) {
      removeInvite(item);
    } else {
      acceptInvite(item, false);
    }
  };

  return (
    <S.InviteItem>
      <S.InviteInfo>
        <S.InviteTittle numberOfLines={1}>
          {isSentInvite
            ? `${t("guest")}: ${item.userEmail}`
            : item.referralUsername}
        </S.InviteTittle>
        <S.InviteListName>
          {t("list")}: {item.list.name}
        </S.InviteListName>
      </S.InviteInfo>

      <S.InviteBtnWrapper>
        {!isSentInvite && (
          <Button
            btnText={t("accept")}
            onPress={() => acceptInvite(item, true)}
          />
        )}

        <Button
          btnText={isSentInvite ? t("remove") : t("reject")}
          onPress={() => handleReject()}
        />
      </S.InviteBtnWrapper>
    </S.InviteItem>
  );
};
