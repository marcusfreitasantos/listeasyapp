import styled, { css } from "styled-components/native";

export const UserMessage = styled.Text`
  ${({ theme }) => css`
  color: ${theme.colors.secondaryColor}
  font-size: ${theme.font.size.text};
  text-align: center;
  font-family: ${theme.font.family.normal};
`}
`;
