import styled from "styled-components/native";
import { css } from "styled-components";

export const CreateList__wrapper = styled.View`
  ${({ theme }) => css`
    background-color: ${theme.colors.secondaryColorLight};
    padding: 20px;
    align-items: center;
    width: 100%;
    border-radius: 5px;
    margin-bottom: 20px;
  `}
`;

export const ListName = styled.TextInput`
  ${({ theme }) => css`
    background-color: ${theme.colors.lightColor};
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    color: ${theme.colors.secondaryColor};
    font-family: ${theme.font.family.normal};
  `}
`;

export const CreateList__group = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-top: 10px;
`;

export const CreateList__cancel = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.secondaryColor};
    font-family: ${theme.font.family.normal};
  `}
`;
