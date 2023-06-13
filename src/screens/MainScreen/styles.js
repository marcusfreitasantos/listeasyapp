import styled, { css } from "styled-components/native";

export const Container = styled.View`
  ${({ theme }) => css`
    align-items: center;
    background-color: ${theme.colors.lightColor};
    padding: 20px 20px 80px 20px;
    flex: 1;
  `}
`;

export const ItemsGroup = styled.View`
  width: 100%;
`;

export const Footer = styled.View`
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  position: absolute;
  bottom: 0;
  right: 20px;
`;
