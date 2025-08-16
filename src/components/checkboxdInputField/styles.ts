import styled from "styled-components/native";

type CheckBoxItemProps = {
  size: number;
};

export const CheckBoxItemWrapper = styled.Pressable`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: ${({ theme }) => theme.defaultSizes.xxSmall};
`;

export const CheckBoxItem = styled.View<CheckBoxItemProps>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border: ${({ theme }) => theme.defaultBorder};
  border-radius: 2px;
  border-color: white;
`;

export const CheckBoxItemLabel = styled.Text`
  color: white;
  font-family: ${({ theme }) => theme.defaultFontFamily};
  font-size: ${({ theme }) => theme.defaultSizes.small};
`;
