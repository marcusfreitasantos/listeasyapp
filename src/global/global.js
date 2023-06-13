import styled from "styled-components/native";
import { css } from "styled-components";

export const Container = styled.View`
  ${({ theme }) => css`
    background-color: ${theme.colors.lightColor};
    flex: 1;
    justify-content: space-between;
    align-items: center;
    margin-top: ${theme.safeArea.safeAreaAndroid};
  `}
`;
