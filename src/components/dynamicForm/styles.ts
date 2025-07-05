import styled from "styled-components/native";

export const FormWrapper = styled.View``;

export const FormField = styled.View``;

export const MainContentRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 12px;
`;

export const MainContentText = styled.Text`
  color: ${({ theme }) => theme.primaryColor};
  font-family: ${({ theme }) => theme.defaultFontFamily};
  font-size: ${({ theme }) => theme.defaultSizes.medium};
  margin-bottom: ${({ theme }) => theme.defaultSizes.small};
  font-weight: 500;
`;

export const FormErrorText = styled.Text`
  color: ${({ theme }) => theme.textColor};
  font-family: ${({ theme }) => theme.defaultFontFamily};
  font-size: ${({ theme }) => theme.defaultSizes.xSmall};
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.defaultSizes.small};
`;

export const SecondaryContentText = styled.Text`
  color: ${({ theme }) => theme.primaryColor};
  font-family: ${({ theme }) => theme.defaultFontFamily};
  font-size: ${({ theme }) => theme.defaultSizes.small};
  font-weight: 300;
`;
