import styled from "styled-components/native";

export const ButtonWrapper = styled.TouchableOpacity`
  padding: ${({ theme }) => theme.defaultSizes.xxSmall}
    ${({ theme }) => theme.defaultSizes.medium};
  background-color: ${({ theme }) => theme.primaryColor};
  border-radius: 50px;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  font-family: ${({ theme }) => theme.defaultFontFamily};
  font-size: ${({ theme }) => theme.defaultSizes.small};
  font-weight: 700;
  color: ${({ theme }) => theme.textColor};
  text-transform: uppercase;
  width: 100%;
  text-align: center;
`;
