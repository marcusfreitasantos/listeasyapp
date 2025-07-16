import styled from "styled-components/native";

export const ListItemWrapper = styled.View`
  padding: ${({ theme }) => theme.defaultContainerSpacing};
  background-color: ${({ theme }) => theme.thirdColor};
  margin: ${({ theme }) => theme.defaultSizes.xxSmall} 0;
  border-radius: ${({ theme }) => theme.defaultBorderRadius};
`;

export const ListItemHeader = styled.View`
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.secondaryColor};
  margin-bottom: ${({ theme }) => theme.defaultSizes.small};
  padding-bottom: ${({ theme }) => theme.defaultSizes.small};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ListItemIconsRow = styled.View`
  flex-direction: row;
  gap: 12px;
  align-items: center;
`;
export const ListItemName = styled.Text`
  color: white;
  font-family: ${({ theme }) => theme.defaultFontFamily};
  font-size: ${({ theme }) => theme.defaultSizes.medium};
  font-weight: bold;
`;

export const ListInfoRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ListItemPrice = styled.Text`
  color: white;
  font-family: ${({ theme }) => theme.defaultFontFamily};
  font-size: ${({ theme }) => theme.defaultSizes.small};
`;

export const ListItemQnt = styled.Text`
  color: white;

  font-family: ${({ theme }) => theme.defaultFontFamily};
  font-size: ${({ theme }) => theme.defaultSizes.small};
`;
