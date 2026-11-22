import styled from "styled-components/native";

export const LabelWrapper = styled.Text`
  align-items: flex-start;
`;

export const Label = styled.Text`
  width: 100%;
  font-family: ${({ theme }) => theme.defaultFontFamily};
  font-size: ${({ theme }) => theme.defaultSizes.xSmall};
  color: ${({ theme }) => theme.textColor};
  opacity: 0.45;
`;
