import styled from "styled-components/native";
import { css } from "styled-components";

export const Container = styled.View`
  ${({ theme }) => css`
    align-items: center;
    background-color: ${theme.colors.lightColor};
    padding: 20px 20px 100px 20px;
    flex: 1;
  `}
`;

export const SearchItemWrapper = styled.View`
  ${({ theme }) => css`
    background-color: ${theme.colors.secondaryColorLight};
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    border-radius: 5px;
  `}
`;

export const SearchItemInput = styled.TextInput`
  ${({ theme }) => css`
    font-size: ${theme.font.size.subtitle};
    width: 90%;
    color: ${theme.colors.secondaryColor};
  `}
`;

export const List__header = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export const ListTotal__wrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ListTotal__text = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.secondaryColor};
    font-size: ${theme.font.size.title};
  `}
`;

export const ListTotal__number = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.primaryColor};
    font-size: ${theme.font.size.title};
    font-weight: bold;
    margin-left: 10px;
  `}
`;

export const ListFooter = styled.View`
  ${({ theme }) => css`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border-top-width: 1px;
    border-color: ${theme.colors.primaryColor};
    position: absolute;
    bottom: 0;
    left: 0;
    right: 20px;
    background-color: ${theme.colors.lightColor};
  `}
`;
