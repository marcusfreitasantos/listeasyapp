import styled from "styled-components/native";

export const FilterRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.defaultSizes.small};
  margin-bottom: ${({ theme }) => theme.defaultSizes.medium};
`;
