import styled, { css } from "styled-components/native";

export const ListBox__wrapper = styled.TouchableOpacity`
  ${({ theme }) => css`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 20px 15px;
    background: ${theme.colors.secondaryColorLight};
    border-radius: 5px;
    margin-bottom: 5px;
  `}
`;

export const ListBox__title = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.font.size.title};
    font-family: ${theme.font.family.bold};
    color: ${theme.colors.darkColor};
  `}
`;
