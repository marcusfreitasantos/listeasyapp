import * as S from "./styles";
import { FlatList } from "react-native-gesture-handler";
import Feather from "@expo/vector-icons/Feather";
import { useTheme } from "styled-components/native";
import { InviteEntity } from "../../model/invite";
import { Button } from "@/src/components/button";

type InvitesListProps = {
  invites: InviteEntity[];
  acceptInvite: (invite: InviteEntity) => void;
};

export const InvitesList = ({ invites, acceptInvite }: InvitesListProps) => {
  const theme = useTheme();

  return (
    <S.InvitesListWrapper>
      <S.InvitesListHeader>
        <S.InvitesListTitle>
          Você tem {invites.length} convite(s) pendente(s)
        </S.InvitesListTitle>

        <Feather name="x" size={24} color={theme.primaryColor} />
      </S.InvitesListHeader>

      <S.Divisor />

      <FlatList
        data={invites}
        keyExtractor={(item, index) => item.id?.toString() ?? index.toString()}
        renderItem={({ item }) => (
          <S.InviteItem>
            <S.InviteInfo>
              <S.InviteTittle numberOfLines={1}>
                {item.referralUsername}
              </S.InviteTittle>
              <S.InviteListName>Lista: {item.list.name}</S.InviteListName>
            </S.InviteInfo>

            <Button
              btnText="Aceitar convite"
              onPress={() => acceptInvite(item)}
            />
          </S.InviteItem>
        )}
      />
    </S.InvitesListWrapper>
  );
};
