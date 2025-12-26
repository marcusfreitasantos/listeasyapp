import styled from "styled-components/native";

type InputFieldWrapperProps = {
  marginBottom: boolean;
};

export const InputFieldWrapper = styled.View<InputFieldWrapperProps>`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: ${({ theme }) => theme.defaultSizes.xxSmall}
    ${({ theme }) => theme.defaultSizes.medium};
  background-color: ${({ theme }) => theme.thirdColor};
  border-radius: ${({ theme }) => theme.defaultBorderRadius};
  margin-bottom: ${(props) =>
    props.marginBottom ? props.theme.defaultSizes.xxSmall : 0};
`;

export const InputField = styled.TextInput`
  flex: 1;
  padding: ${({ theme }) => theme.defaultSizes.xxSmall};
  font-family: ${({ theme }) => theme.defaultFontFamily};
  font-size: ${({ theme }) => theme.defaultSizes.small};
  color: ${({ theme }) => theme.primaryColor};
`;
