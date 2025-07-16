import styled from "styled-components/native";

export const ListView = styled.View`
  background-color: ${({ theme }) => theme.secondaryColor};
  flex: 1;
  padding: ${({ theme }) => theme.defaultContainerSpacing};
`;

export const ListViewHeader = styled.View`
  flex-direction: row;
  gap: 12px;
  align-items: center;
  width: 100%;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.primaryColor};
  padding-bottom: ${({ theme }) => theme.defaultSizes.small};
  margin-bottom: ${({ theme }) => theme.defaultSizes.small};
`;

export const ListName = styled.Text`
  color: ${({ theme }) => theme.primaryColor};
  font-family: ${({ theme }) => theme.defaultFontFamily};
  font-size: ${({ theme }) => theme.defaultSizes.large};
`;
