import styled from "styled-components/native";
import { css } from "styled-components";

export const Item__name = styled.View`
  ${({ theme }) => css`
    padding: 10px;
    background: ${theme.colors.secondaryColorLight};
    border-radius: 5px;
    text-align: center;
    width: 100%;
    margin-bottom: 15px;
    font-size: ${theme.font.size.subtitle};
    align-items: center;
  `}
`;

export const Item__nameInput = styled.TextInput`
  ${({ theme }) => css`
    font-size: ${theme.font.size.title};
    width: 100%;
    text-align: center;
    color: ${theme.colors.secondaryColor};
  `}
`;

export const Item__price = styled.View`
  ${({ theme }) => css`
    padding: 10px 20px;
    background: ${theme.colors.secondaryColorLight};
    border-radius: 5px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  `}
`;

export const Item__priceContainer = styled.View`
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 5px;
`;

export const Item__priceInput = styled.TextInput`
  ${({ theme }) => css`
    font-size: ${theme.font.size.subtitle};
    text-align: right;
    color: ${theme.colors.secondaryColor};
  `}
`;

export const DolarSign = styled.Text`
  ${({ theme }) => css`
    font-weight: bold;
    text-align: center;
    padding-right: 5px;
    color: ${theme.colors.secondaryColor};
  `}
`;

export const Item__quant = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Item__wrapper = styled.View`
  ${({ theme }) => css`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    padding-bottom: 30px;
    margin-bottom: 20px;
    border-bottom-width: 1px;
    border-color: ${theme.colors.secondaryColor};
  `}
`;

export const Item__delete = styled.TouchableOpacity``;

export const Item__quantNumber = styled.Text`
  ${({ theme }) => css`
    padding: 10px;
    font-size: ${theme.font.size.subtitle};
    color: ${theme.colors.secondaryColor};
  `}
`;

export const Item__quantBtn = styled.TouchableOpacity`
  ${({ theme }) => css`
    background-color: ${(props) =>
      props.disabled === true
        ? theme.colors.secondaryColorDark
        : theme.colors.primaryColor};
    padding: 10px;
    border-radius: 50px;
  `}
`;
