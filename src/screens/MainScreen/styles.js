import styled from "styled-components/native";
import { css } from "styled-components";
import { Dimensions } from "react-native";

export const Container = styled.View`
  ${({ theme }) => css`
    align-items: center;
    background-color: ${theme.colors.lightColor};
    padding: 20px 20px 80px 20px;
    flex: 1;
  `}
`;

export const Text = styled.Text`
  color: darkColor;
  font-size: 20px;
`;

export const ItemsGroup = styled.View`
  width: 100%;
`;

export const UserMessage = styled.Text`
 ${({theme}) => css`
  color: ${theme.colors.secondaryColor}
  font-size: 14px;
  text-align: center;
`}
`

export const Footer = styled.View`
${({theme}) => css`
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  position: absolute;
  bottom: 0;
  right: 20px;
`}
`