import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme["secondaryColor"]};
  align-items: center;
  justify-content: center;
`;

export const ImageWrapper = styled.Image``;

export const ScreenTitle = styled.Text`
  color: white;
`;
