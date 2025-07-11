import styled from "styled-components/native";

export const ListView = styled.View`
  background-color: ${({ theme }) => theme.secondaryColor};
  flex: 1;
  padding: ${({ theme }) => theme.defaultContainerSpacing};
`;
