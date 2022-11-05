import styled from "styled-components/native";
import { css } from "styled-components";

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
export const ListBox__group = styled.View``;

export const ListBox__groupHorizontal = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ListBox__title = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.font.size.title};
    font-weight: bold;
    color: ${theme.colors.darkColor};
  `}
`;

export const ListBox__total = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.font.size.subtitle};
    color: ${theme.colors.secondaryColor};
  `}
`;

export const ListBox__btn = styled.TouchableOpacity`
  margin-left: 15px;
`;
