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

export const InvitesListHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.defaultSizes.medium};
`;
