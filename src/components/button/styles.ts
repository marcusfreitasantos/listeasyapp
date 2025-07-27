import styled from "styled-components/native";

type ButtonWrapperProps = {
  type: "dark" | "light";
};

export const ButtonWrapper = styled.TouchableOpacity<ButtonWrapperProps>`
  padding: ${({ theme }) => theme.defaultSizes.xxSmall}
    ${({ theme }) => theme.defaultSizes.medium};
  background-color: ${(props) =>
    props.type === "dark"
      ? props.theme.secondaryColor
      : props.theme.primaryColor};
  border-radius: ${({ theme }) => theme.defaultBorderRadius};
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text<ButtonWrapperProps>`
  font-family: ${({ theme }) => theme.defaultFontFamily};
  font-size: ${({ theme }) => theme.defaultSizes.small};
  font-weight: 700;
  color: ${(props) =>
    props.type === "dark"
      ? props.theme.primaryColor
      : props.theme.secondaryColor};
  width: 100%;
  text-align: center;
`;
