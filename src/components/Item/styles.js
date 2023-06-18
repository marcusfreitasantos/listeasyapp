import styled, { css } from "styled-components/native";

export const Item__wrapper = styled.View`
  ${({ theme }) => css`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    padding: 15px;
    margin-bottom: 20px;
    background-color: ${theme.colors.secondaryColorLight};
    border-radius: 5px;
  `}
`;

export const Item__group = styled.View`
  flex-direction: row;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
`;

export const Item__name = styled.View`
  ${({ theme }) => css`
    padding: 10px;
    background: ${theme.colors.lightColor};
    border-radius: 5px;
    text-align: center;
    width: 60%;
    height: 56px;
    margin-bottom: 15px;
    font-size: ${theme.font.size.subtitle};
    align-items: center;
  `}
`;

export const Item__nameInput = styled.TextInput`
  ${({ theme }) => css`
    font-size: ${theme.font.size.subtitle};
    text-align: center;
    color: ${theme.colors.secondaryColor};
    height: 100%;
    font-family: ${theme.font.family.normal};
  `}
`;

export const Item__price = styled.View`
  ${({ theme }) => css`
    padding: 10px 20px;
    background: ${theme.colors.lightColor};
    border-radius: 5px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 56px;
    flex: 1;
  `}
`;

export const Item__priceContainer = styled.View`
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;

export const Item__priceInput = styled.TextInput`
  ${({ theme }) => css`
    font-size: ${theme.font.size.subtitle};
    text-align: right;
    color: ${theme.colors.secondaryColor};
    height: 100%;
    font-family: ${theme.font.family.normal};
  `}
`;

export const DolarSign = styled.Text`
  ${({ theme }) => css`
    font-weight: bold;
    text-align: center;
    padding-right: 5px;
    color: ${theme.colors.secondaryColor};
    font-family: ${theme.font.family.normal};
  `}
`;

export const Item__quant = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Item__delete = styled.TouchableOpacity`
  ${({ theme }) => css`
    width: 60%;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: ${theme.colors.atentionColor};
    border-radius: 5px;
    height: 40px;
  `}
`;

export const Item__deleteText = styled.Text`
  ${({ theme }) => css`
    padding: 10px;
    font-size: ${theme.font.size.subtitle};
    color: ${theme.colors.lightColor};
    font-family: ${theme.font.family.normal};
  `}
`;

export const Item__quantNumber = styled.Text`
  ${({ theme }) => css`
    padding: 10px;
    font-size: ${theme.font.size.subtitle};
    color: ${theme.colors.secondaryColor};
    font-family: ${theme.font.family.normal};
  `}
`;

export const Item__quantBtn = styled.TouchableOpacity`
  ${({ theme }) => css`
    background-color: ${(props) =>
      props.disabled === true
        ? theme.colors.lightColor
        : theme.colors.primaryColor};
    padding: 10px;
    border-radius: 5px;
  `}
`;
