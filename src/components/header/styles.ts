import styled from "styled-components/native";

export const HeaderWrapper = styled.View`
  background-color: ${({ theme }) => theme.secondaryColor};
  padding-top: ${({ theme }) => theme.defaultSizes.large};
`;

export const HeaderContainer = styled.View`
  padding: ${({ theme }) => theme.defaultContainerSpacing};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const HeaderUserInfo = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: 6px;
  overflow: hidden;
  flex: 1;
`;

export const HeaderUserInfoTitle = styled.Text`
  font-family: ${({ theme }) => theme.defaultFontFamily};
  font-size: ${({ theme }) => theme.defaultSizes.medium};
  font-weight: 700;
  color: white;
  width: 90%;
`;

export const HeaderUserInfoText = styled.Text`
  font-family: ${({ theme }) => theme.defaultFontFamily};
  font-size: ${({ theme }) => theme.defaultSizes.small};
  color: white;
`;

export const HeaderUserInfoAvatarWrapper = styled.View`
  background-color: ${({ theme }) => theme.primaryColor};
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
`;

export const HeaderUserInfoAvatarDefaultContent = styled.Text`
  font-family: ${({ theme }) => theme.defaultFontFamily};
  font-size: ${({ theme }) => theme.defaultSizes.medium};
  font-weight: 700;
  color: ${({ theme }) => theme.secondaryColor};
`;
