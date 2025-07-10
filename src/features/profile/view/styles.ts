import styled from "styled-components/native";
const imageSize = "100px";

export const Container = styled.View`
  padding: ${({ theme }) => theme.defaultContainerSpacing};
  background-color: ${({ theme }) => theme.secondaryColor};
  height: 100%;
`;

export const ContentTitle = styled.Text`
  color: ${({ theme }) => theme.primaryColor};
  font-family: ${({ theme }) => theme.defaultFontFamily};
  font-size: ${({ theme }) => theme.defaultSizes.large};
  line-height: ${({ theme }) => theme.defaultSizes.large};
  margin-bottom: ${({ theme }) => theme.defaultSizes.small};
  font-weight: 300;
`;

export const ContentText = styled.Text`
  font-family: ${({ theme }) => theme.defaultFontFamily};
  font-size: ${({ theme }) => theme.defaultSizes.small};
  color: ${({ theme }) => theme.primaryColor};
  margin-top: ${({ theme }) => theme.defaultSizes.small};
`;

export const ContentSubText = styled.Text`
  font-family: ${({ theme }) => theme.defaultFontFamily};
  font-size: ${({ theme }) => theme.defaultSizes.xSmall};
  color: ${({ theme }) => theme.primaryColor};
`;

export const UserInfoAvatarWrapper = styled.View`
  margin: ${({ theme }) => theme.defaultSizes.medium} 0;
  justify-content: center;
  align-items: center;
`;

export const UserInfoAvatarImgWrapper = styled.View`
  background-color: ${({ theme }) => theme.primaryColor};
  width: ${imageSize};
  height: ${imageSize};
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  overflow: hidden;
`;

export const UserInfoAvatarImage = styled.Image`
  width: ${imageSize};
  height: ${imageSize};
`;

export const UserInfoAvatarDefaultContent = styled.Text`
  font-family: ${({ theme }) => theme.defaultFontFamily};
  font-size: ${({ theme }) => theme.defaultSizes.large};
  font-weight: 700;
  color: ${({ theme }) => theme.secondaryColor};
`;
