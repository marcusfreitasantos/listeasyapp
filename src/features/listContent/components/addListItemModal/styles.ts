import styled from "styled-components/native";

export const FormWrapper = styled.View`
  position: absolute;
  top: 0;
  right: ${({ theme }) => theme.defaultContainerSpacing};
  width: 100%;
  height: 90%;
  background-color: ${({ theme }) => theme.secondaryColor};
  justify-content: center;
  padding: ${({ theme }) => theme.defaultSizes.large};
`;

export const FormContent = styled.View``;
