import styled from "styled-components/native";

export const ListTotalPriceWrapper = styled.View``;

export const ListTotalItemsText = styled.Text`
  color: white;
  font-family: ${({ theme }) => theme.defaultFontFamily};
  font-size: ${({ theme }) => theme.defaultSizes.small};
  font-weight: regular;
`;

export const ListTotalPriceText = styled.Text`
  color: white;
  font-family: ${({ theme }) => theme.defaultFontFamily};
  font-size: ${({ theme }) => theme.defaultSizes.medium};
  font-weight: bold;
`;
