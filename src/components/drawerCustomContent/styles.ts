import styled from "styled-components/native";

export const DrawerWrapper = styled.View`
  padding-top: ${({ theme }) => theme.defaultSizes.xLarge};
`;

export const DrawerContainer = styled.View`
  padding: ${({ theme }) => theme.defaultSizes.medium};
  justify-content: space-between;
  background-color: #eee;
  height: 100%;
`;

export const DrawerItemGroup = styled.View`
  flex: 1;
`;

export const DrawerItem = styled.Pressable``;

export const DrawerItemText = styled.Text``;
