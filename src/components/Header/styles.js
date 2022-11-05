import styled from "styled-components/native";
import { css } from "styled-components";

export const Header__wrapper = styled.View`
  ${({ theme }) => css`
    background-color: ${theme.colors.secondaryColorLight}
    justify-content: center;
    align-items: center;
    padding: 10px 0;
`}
`;

export const Header__logo = styled.Image`
  width: 40px;
  height: 40px;
`;

export const Header__container = styled.View`
  width: 90%;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;

export const Header__title = styled.Text`
  ${({ theme }) => css`
font-size: 16px;
font-weight: bold;
color: ${theme.colors.primaryColor}
display: flex;
align-items: center;
justify-content: space-between;
`}
`;
export const Header__backBtn = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

export const ListName = styled.View`
  width: 50%;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

export const ListNameInput = styled.TextInput`
  ${({ theme }) => css`
    font-size: ${theme.font.size.subtitle};
    color: ${theme.colors.secondaryColor}
    margin-right: 10px;
  `}
`;
