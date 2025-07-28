import styled from "styled-components/native";

export const ListMenuWrapper = styled.View`
  gap: ${({ theme }) => theme.defaultSizes.medium};
`;

export const ListMenuItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.defaultSizes.xxSmall};
`;

export const ListMenuItemText = styled.Text`
  color: white;
  font-family: ${({ theme }) => theme.defaultFontFamily};
  font-weight: bold;
  font-size: ${({ theme }) => theme.defaultSizes.small};
`;

export const ListCardMenuBtn = styled.TouchableOpacity``;
