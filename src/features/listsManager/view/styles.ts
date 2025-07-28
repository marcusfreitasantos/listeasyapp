import styled from "styled-components/native";

export const ListView = styled.View`
  background-color: ${({ theme }) => theme.secondaryColor};
  flex: 1;
  padding: ${({ theme }) => theme.defaultContainerSpacing};
`;

export const ListViewFooter = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: ${({ theme }) => theme.defaultSizes.xLarge} 0;
`;
