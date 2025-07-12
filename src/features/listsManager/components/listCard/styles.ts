import styled from "styled-components/native";

export const ListCardWrapper = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.thirdColor};
  margin-bottom: ${({ theme }) => theme.defaultSizes.xxSmall};
  padding: ${({ theme }) => theme.defaultSizes.small}
    ${({ theme }) => theme.defaultSizes.medium};
  border-radius: ${({ theme }) => theme.defaultBorderRadius};
  flex-direction: row;
  jusitify-content: space-between;
  align-items: center;
`;

export const ListCardInfoWrapper = styled.View`
  flex: 1;
`;

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
