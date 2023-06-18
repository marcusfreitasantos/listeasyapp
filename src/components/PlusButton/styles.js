import styled, { css } from "styled-components/native";

export const PlusButton = styled.TouchableOpacity`
  ${({ theme }) => css`
    background-color: ${(props) =>
      props.Loading
        ? theme.colors.secondaryColorLight
        : theme.colors.primaryColor};
    padding: 5px;
    border-radius: 50px;
  `}
`;
