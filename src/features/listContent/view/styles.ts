import styled from "styled-components/native";

export const ListView = styled.View`
  background-color: ${({ theme }) => theme.secondaryColor};
  flex: 1;
  padding: ${({ theme }) => theme.defaultContainerSpacing};
`;

export const ListViewHeader = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.primaryColor};
  padding-bottom: ${({ theme }) => theme.defaultSizes.small};
  margin-bottom: ${({ theme }) => theme.defaultSizes.small};
`;

export const ListViewHeaderGroup = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
  gap: ${({ theme }) => theme.defaultSizes.xxSmall};
`;

export const ListName = styled.Text`
  color: ${({ theme }) => theme.primaryColor};
  font-family: ${({ theme }) => theme.defaultFontFamily};
  font-size: ${({ theme }) => theme.defaultSizes.medium};
`;

export const ListViewFooter = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.defaultSizes.medium} 0;
`;
