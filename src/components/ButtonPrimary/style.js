import styled from "styled-components/native";
import { css } from "styled-components";

export const BtnPrimary = styled.TouchableOpacity`
  ${({theme}) => css`
    background-color: ${theme.colors.primaryColor};
    padding: 10px;
    border-radius: 5px;
  `}
`

export const BtnPrimary__text = styled.Text`
${({theme}) => css`
  color: ${theme.colors.lightColor};
`}
`