import styled from "styled-components/native";

export const ButtonWrapper = styled.TouchableOpacity`
  padding: ${({ theme }) => theme.defaultSizes.xxSmall}
    ${({ theme }) => theme.defaultSizes.medium};
  background-color: ${({ theme }) => theme.primaryColor};
  border-radius: ${({ theme }) => theme.defaultBorderRadius};
  margin-bottom: ${({ theme }) => theme.defaultSizes.xxSmall};
`;

export const ButtonText = styled.Text`
  font-family: ${({ theme }) => theme.defaultFontFamily};
  font-size: ${({ theme }) => theme.defaultSizes.small};
  font-weight: 600;
  color: ${({ theme }) => theme.textColor};
`;
