import styled from "styled-components/native";

export const DrawerWrapper = styled.View`
  padding-top: ${({ theme }) => theme.defaultSizes.xLarge};
`;

export const DrawerContainer = styled.View`
  padding: ${({ theme }) => theme.defaultSizes.medium};
  justify-content: space-between;
  background-color: ${({ theme }) => theme.secondaryColor};
  height: 100%;
`;

export const DrawerItemGroup = styled.View`
  flex: 1;
`;

export const DrawerUserInfo = styled.TouchableOpacity`
  gap: 6px;
  overflow: hidden;
`;

export const DrawerUserInfoAvatarWrapper = styled.View`
  background-color: ${({ theme }) => theme.primaryColor};
  width: 60px;
  height: 60px;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
`;

export const DrawerUserInfoAvatarDefaultContent = styled.Text`
  font-family: ${({ theme }) => theme.defaultFontFamily};
  font-size: ${({ theme }) => theme.defaultSizes.medium};
  font-weight: 700;
  color: ${({ theme }) => theme.secondaryColor};
`;

export const DrawerUserInfoTitle = styled.Text`
  font-family: ${({ theme }) => theme.defaultFontFamily};
  font-size: ${({ theme }) => theme.defaultSizes.medium};
  font-weight: 700;
  color: white;
  width: 90%;
`;

export const DrawerUserInfoText = styled.Text`
  font-family: ${({ theme }) => theme.defaultFontFamily};
  font-size: ${({ theme }) => theme.defaultSizes.small};
  font-weight: 300;
  color: white;
  width: 90%;
`;

export const DrawerDivisor = styled.View`
  margin: ${({ theme }) => theme.defaultSizes.medium} 0;
  padding: 1px;
  background-color: ${({ theme }) => theme.textColor};
  width: 100%;
`;

export const DrawerItem = styled.Pressable``;

export const DrawerItemText = styled.Text``;
