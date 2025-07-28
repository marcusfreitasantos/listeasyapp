import styled from "styled-components/native";
const btnSize = "60px";

export const BtnWrapper = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: flex-end;
`;

export const BtnContent = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.primaryColor};
  padding: ${({ theme }) => theme.defaultSizes.small};
  border-radius: 50px;
  width: ${btnSize};
  height: ${btnSize};
  justify-content: center;
  align-items: center;
`;
