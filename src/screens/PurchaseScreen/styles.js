import styled, { css } from "styled-components/native";

export const BackgroundImg = styled.ImageBackground`
  flex: 1;
  padding: 20px 20px 80px 20px;
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.lightColor};
    font-size: ${theme.font.size.title};
    font-family: ${theme.font.family.bold};
  `}
`;

export const WhiteLine = styled.View`
  ${({ theme }) => css`
    background-color: ${theme.colors.lightColor};
    height: 2px;
    width: 100%;
    margin: 20px 0;
  `}
`;

export const Benefits__wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10px 0;
`;

export const Benefits__text = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.lightColor};
    font-size: ${theme.font.size.subtitle};
    margin-left: 10px;
    font-family: ${theme.font.family.normal};
  `}
`;

export const Subtitle = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.lightColor};
    font-size: ${theme.font.size.subtitle};
    font-family: ${theme.font.family.bold};
    text-align: center;
  `}
`;

export const LegalText = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.lightColor};
    font-size: ${theme.font.size.details};
    text-align: center;
    font-family: ${theme.font.family.normal};
  `}
`;
