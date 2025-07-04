import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.secondaryColor};
  align-items: center;
  justify-content: center;
`;

export const ScreenTitle = styled.Text`
  color: white;
`;
