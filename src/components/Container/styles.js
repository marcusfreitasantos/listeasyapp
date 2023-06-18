import styled, { css } from "styled-components/native";

export const Container = styled.View`
  ${({ theme }) => css`
    background-color: ${(props) =>
      props.backgroundColor ? props.backgroundColor : theme.colors.lightColor};
    flex: 1;
    justify-content: space-between;
    padding: 20px 20px 80px 20px;
  `}
`;
