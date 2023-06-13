import styled, { css } from "styled-components/native";

export const UserMessage = styled.Text`
  ${({ theme }) => css`
  color: ${theme.colors.secondaryColor}
  font-size: 16px;
  text-align: center;
`}
`;
