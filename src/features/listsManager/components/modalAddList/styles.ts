import styled from "styled-components/native";

export const ModalWrapper = styled.View`
  border: 1px;
  border-color: ${({ theme }) => theme.primaryColor};
  padding: ${({ theme }) => theme.defaultContainerSpacing};
  border-radius: ${({ theme }) => theme.defaultBorderRadius};
  margin-bottom: ${({ theme }) => theme.defaultSizes.medium};
`;

export const ModalTitle = styled.Text``;
