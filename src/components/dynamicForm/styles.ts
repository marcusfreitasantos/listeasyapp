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

export const FormTitle = styled.Text`
  color: ${({ theme }) => theme.primaryColor};
  font-family: ${({ theme }) => theme.defaultFontFamily};
  font-size: ${({ theme }) => theme.defaultSizes.large};
  line-height: ${({ theme }) => theme.defaultSizes.large};
  margin-bottom: ${({ theme }) => theme.defaultSizes.small};
  font-weight: 300;
`;

export const FormErrorText = styled.Text`
  color: ${({ theme }) => theme.primaryColor};
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
