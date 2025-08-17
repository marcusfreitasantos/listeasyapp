import styled from "styled-components/native";

export const FoundUserCardWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.defaultSizes.medium};
`;

export const FoundUserCardName = styled.Text`
  color: white;
  font-family: ${({ theme }) => theme.defaultFontFamily};
  font-size: ${({ theme }) => theme.defaultSizes.small};
  line-height: ${({ theme }) => theme.defaultSizes.medium};
  font-weight: bold;
`;

export const FoundUserCardEmail = styled.Text`
  color: white;
  font-family: ${({ theme }) => theme.defaultFontFamily};
  font-size: ${({ theme }) => theme.defaultSizes.small};
  line-height: ${({ theme }) => theme.defaultSizes.medium};
`;

export const FoundUserCardRow = styled.View`
  justify-content: center;
  flex: 1;
  align-items: flex-start;
`;
