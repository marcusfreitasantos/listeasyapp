import styled from "styled-components/native";

export const ProductCard = styled.View`
  background-color: white;
  padding: ${({ theme }) => theme.defaultContainerSpacing};
  border-radius: ${({ theme }) => theme.defaultBorderRadius};
  margin-bottom: ${({ theme }) => theme.defaultSizes.small};
  gap: ${({ theme }) => theme.defaultSizes.xxSmall};
`;

export const Divisor = styled.View`
  background-color: ${({ theme }) => theme.lightGray};
  padding: 1px 0;
  border-radius: ${({ theme }) => theme.defaultBorderRadius};
  margin: ${({ theme }) => theme.defaultSizes.small} 0;
`;

export const ProductHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.defaultSizes.xxSmall};
`;

export const ProductHeaderGroup = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.defaultSizes.xxSmall};
  flex: 1;
`;

export const ProductTitle = styled.Text`
  font-family: ${({ theme }) => theme.defaultFontFamily};
  font-size: ${({ theme }) => theme.defaultSizes.medium};
  color: ${({ theme }) => theme.secondaryColor};
  font-weight: bold;
`;

export const CurrentProductWrapper = styled.View`
  background-color: ${({ theme }) => theme.secondaryColor};
  padding: ${({ theme }) => theme.defaultSizes.xxSmall};
  border-radius: ${({ theme }) => theme.defaultBorderRadius};
`;

export const CurrentProduct = styled.Text`
  font-family: ${({ theme }) => theme.defaultFontFamily};
  font-size: ${({ theme }) => theme.defaultSizes.xxSmall};
  color: ${({ theme }) => theme.primaryColor};
  text-transform: uppercase;
  font-weight: bold;
`;

export const ProductDescription = styled.Text`
  font-family: ${({ theme }) => theme.defaultFontFamily};
  font-size: ${({ theme }) => theme.defaultSizes.small};
  color: ${({ theme }) => theme.textColor};
  font-weight: light;
`;

export const ProductPrice = styled.Text`
  font-family: ${({ theme }) => theme.defaultFontFamily};
  font-size: ${({ theme }) => theme.defaultSizes.medium};
  color: ${({ theme }) => theme.textColor};
  font-weight: bold;
`;
