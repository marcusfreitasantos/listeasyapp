import styled from "styled-components/native";

export const DrawerItem = styled.Pressable`
  flex-direction: row;
  gap: 12px;
  align-items: center;
`;

export const DrawerItemText = styled.Text`
  padding: ${({ theme }) => theme.defaultSizes.small} 0;
  font-family: ${({ theme }) => theme.defaultFontFamily};
  font-size: ${({ theme }) => theme.defaultSizes.small};
  font-weight: 700;
  color: white;
`;
