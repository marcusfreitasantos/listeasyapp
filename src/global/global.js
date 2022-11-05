import styled from "styled-components/native";
import { css } from "styled-components";
import { Dimensions } from "react-native";

export const Container = styled.View`
  ${({ theme }) => css`
    background-color: ${theme.colors.lightColor};
    flex: 1;
    justify-content: space-between;
    align-items: center;
    margin-top: ${theme.safeArea.safeAreaAndroid};
  `}
`;

export const UserMessage = styled.Text`
 ${({theme}) => css`
  color: ${theme.colors.secondaryColor}
  font-size: 14px;
  text-align: center;
`}
`