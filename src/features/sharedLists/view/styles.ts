import styled from "styled-components/native";

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

export const ContentSubtitle = styled.Text`
  color: white;
  font-family: ${({ theme }) => theme.defaultFontFamily};
  font-size: ${({ theme }) => theme.defaultSizes.small};
  line-height: ${({ theme }) => theme.defaultSizes.medium};
  margin-bottom: ${({ theme }) => theme.defaultSizes.small};
  font-weight: 300;
`;
