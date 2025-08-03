import styled from "styled-components/native";

export const ListCardWrapper = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.thirdColor};
  margin-bottom: ${({ theme }) => theme.defaultSizes.xxSmall};
  padding: ${({ theme }) => theme.defaultSizes.small}
    ${({ theme }) => theme.defaultSizes.medium};
  border-radius: ${({ theme }) => theme.defaultBorderRadius};
`;

export const ListCardHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.secondaryColor};
  padding-bottom: ${({ theme }) => theme.defaultSizes.xSmall};
  margin-bottom: ${({ theme }) => theme.defaultSizes.xSmall};
`;

export const ListCardInfoWrapper = styled.View``;

export const ListCardTitle = styled.Text`
  color: white;
  font-family: ${({ theme }) => theme.defaultFontFamily};
  font-weight: bold;
  font-size: ${({ theme }) => theme.defaultSizes.medium};
`;

export const ListCardTotalPriceWrapper = styled.View`
  flex-direction: row;
`;

export const ListCardTotalPriceTextBold = styled.Text`
  color: white;
  font-family: ${({ theme }) => theme.defaultFontFamily};
  font-weight: bold;
  font-size: ${({ theme }) => theme.defaultSizes.small};
`;

export const ListCardTotalPriceTextRegular = styled.Text`
  color: white;
  font-family: ${({ theme }) => theme.defaultFontFamily};
  font-weight: light;
  font-size: ${({ theme }) => theme.defaultSizes.small};
`;

export const ListCardMenuBtn = styled.TouchableOpacity``;
