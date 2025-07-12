import styled from "styled-components/native";

export const Container = styled.View`
  border: ${({ theme }) => theme.defaultBorder};
  padding: ${({ theme }) => theme.defaultContainerSpacing};
  border-radius: ${({ theme }) => theme.defaultBorderRadius};
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.defaultFontFamily};
  font-size: ${({ theme }) => theme.defaultSizes.small};
  font-weight: bold;
  color: ${({ theme }) => theme.primaryColor};
`;

export const ListEmptyTitle = styled.Text`
  font-family: ${({ theme }) => theme.defaultFontFamily};
  font-size: ${({ theme }) => theme.defaultSizes.small};
  font-weight: bold;
  color: ${({ theme }) => theme.primaryColor};
`;

export const ListEmptyText = styled.Text`
  font-family: ${({ theme }) => theme.defaultFontFamily};
  font-size: ${({ theme }) => theme.defaultSizes.small};
  color: ${({ theme }) => theme.textColor};
`;
