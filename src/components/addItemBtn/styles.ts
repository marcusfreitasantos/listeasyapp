import styled from "styled-components/native";
const btnSize = "60px";

type ButtonContentProps = {
  type: "dark" | "light";
};

export const BtnWrapper = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;

export const BtnContent = styled.TouchableOpacity<ButtonContentProps>`
  background-color: ${(props) =>
    props.type === "dark" ? props.theme.primaryColor : props.theme.fourthColor};
  padding: ${({ theme }) => theme.defaultSizes.small};
  border-radius: 50px;
  width: ${btnSize};
  height: ${btnSize};
  justify-content: center;
  align-items: center;
`;
