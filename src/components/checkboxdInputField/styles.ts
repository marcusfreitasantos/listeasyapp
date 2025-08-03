import styled from "styled-components/native";

type CheckBoxItemProps = {
  size: number;
};

export const CheckBoxItem = styled.Pressable<CheckBoxItemProps>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border: ${({ theme }) => theme.defaultBorder};
  border-radius: 2px;
  border-color: white;
`;
