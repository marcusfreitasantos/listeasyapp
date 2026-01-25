import styled from "styled-components/native";

export const ListTotalPriceWrapper = styled.View``;

export const ListTotalItemsText = styled.Text`
  color: ${({ theme }) => theme.textColor};
  font-family: ${({ theme }) => theme.defaultFontFamily};
  font-size: ${({ theme }) => theme.defaultSizes.small};
  font-weight: regular;
`;

export const ListTotalPriceText = styled.Text`
  color: ${({ theme }) => theme.primaryColor};
  font-family: ${({ theme }) => theme.defaultFontFamily};
  font-size: ${({ theme }) => theme.defaultSizes.medium};
  font-weight: bold;
`;
