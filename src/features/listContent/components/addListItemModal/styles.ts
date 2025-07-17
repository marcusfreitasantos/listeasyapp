import styled from "styled-components/native";

export const FormWrapper = styled.View`
  position: absolute;
  top: 0;
  right: ${({ theme }) => theme.defaultContainerSpacing};
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.secondaryColor};
`;

export const FormContent = styled.View``;
