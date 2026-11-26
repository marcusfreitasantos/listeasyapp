import styled from "styled-components/native";

export const SubscriptionsViewContainer = styled.View`
  background-color: ${({ theme }) => theme.secondaryColor};
  flex: 1;
  padding: ${({ theme }) => theme.defaultContainerSpacing};
`;

export const RestorePurchasesContainer = styled.View`
  margin-top: ${({ theme }) => theme.defaultSizes.small};
`;
