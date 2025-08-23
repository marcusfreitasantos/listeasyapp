import styled from "styled-components/native";

export const InvitesListWrapper = styled.View`
  background-color: ${({ theme }) => theme.secondaryColor};
  flex: 1;
  padding: ${({ theme }) => theme.defaultContainerSpacing};
`;

export const InvitesListTitle = styled.Text`
  color: ${({ theme }) => theme.primaryColor};
  font-family: ${({ theme }) => theme.defaultFontFamily};
  font-size: ${({ theme }) => theme.defaultSizes.large};
  flex: 1;
`;

export const Divisor = styled.View`
  background-color: ${({ theme }) => theme.lightGray};
  padding: 1px 0;
  border-radius: ${({ theme }) => theme.defaultBorderRadius};
  margin: ${({ theme }) => theme.defaultSizes.small} 0;
`;

export const InvitesListHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const InviteItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: ${({ theme }) => theme.defaultSizes.medium} 0;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.primaryColor};
`;

export const InviteInfo = styled.View`
  flex: 1;
`;

export const InviteTittle = styled.Text`
  color: ${({ theme }) => theme.primaryColor};
  font-family: ${({ theme }) => theme.defaultFontFamily};
  font-size: ${({ theme }) => theme.defaultSizes.small};
  font-weight: bold;
  width: 80%;
`;

export const InviteListName = styled.Text`
  color: white;
  font-family: ${({ theme }) => theme.defaultFontFamily};
  font-size: ${({ theme }) => theme.defaultSizes.small};
`;

export const InviteBtnWrapper = styled.View`
  flex-direction: row;
  gap: 12px;
  justify-content: space-between;
`;
