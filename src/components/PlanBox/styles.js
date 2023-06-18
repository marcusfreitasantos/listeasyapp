import styled, { css } from "styled-components/native";

export const Plan__wrapper = styled.View`
  margin-top: 10px;
`;

export const Plan__boxActive = styled.TouchableOpacity`
  ${({ theme }) => css`
    background: ${(props) =>
      props.current === "active"
        ? theme.colors.secondaryColorLight
        : "rgba(0,0,0,0)"};
    border: 2px solid ${theme.colors.lightColor};
    padding: 20px 15px;
    border-radius: 5px;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 5px;
  `}
`;

export const Plan__name_text = styled.Text`
  ${({ theme }) => css`
    color: ${(props) =>
      props.current === "active"
        ? theme.colors.primaryColor
        : theme.colors.lightColor};
    font-family: ${theme.font.family.bold};
    font-size: ${theme.font.size.text};
    margin-left: 10px;
  `}
`;

export const Plan__button = styled.View`
  ${({ theme }) => css`
    height: 20px;
    width: 20px;
    background-color: ${(props) =>
      props.current === "active"
        ? theme.colors.primaryColorDark
        : theme.colors.primaryColor};
    border-radius: 50px;
    border: 2px solid ${theme.colors.lightColor};
    padding: 5px;
  `}
`;

export const Plan__name = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Plan__price = styled.Text`
  ${({ theme }) => css`
    color: ${(props) =>
      props.current === "active"
        ? theme.colors.primaryColor
        : theme.colors.lightColor};
    font-family: ${theme.font.family.bold};
    font-size: ${theme.font.size.text};
    margin-left: 10px;
  `}
`;

export const Plan__warning = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.lightColor};
    font-family: ${theme.font.family.normal};
    font-size: ${theme.font.size.text};
  `}
`;
