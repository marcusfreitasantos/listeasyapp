import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.secondaryColor};
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.defaultSizes.xLarge}
    ${({ theme }) => theme.defaultContainerSpacing};
`;

export const MainContent = styled.View`
  width: 100%;
`;

export const SecondaryContentRow = styled.View`
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 12px;
`;

export const MainContentText = styled.Text`
  color: ${({ theme }) => theme.primaryColor};
  font-family: ${({ theme }) => theme.defaultFontFamily};
  font-size: ${({ theme }) => theme.defaultSizes.medium};
  margin-bottom: ${({ theme }) => theme.defaultSizes.small};
  font-weight: 500;
`;

export const SecondaryContentText = styled.Text`
  color: ${({ theme }) => theme.primaryColor};
  font-family: ${({ theme }) => theme.defaultFontFamily};
  font-size: ${({ theme }) => theme.defaultSizes.small};
  font-weight: 300;
`;
