import styled from "styled-components/native";

export const InviteItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: ${({ theme }) => theme.defaultSizes.medium} 0;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.primaryColor};
`;

export const InviteInfo = styled.View`
  flex: 1;
`;

export const InviteTittle = styled.Text`
  color: ${({ theme }) => theme.primaryColor};
  font-family: ${({ theme }) => theme.defaultFontFamily};
  font-size: ${({ theme }) => theme.defaultSizes.small};
  font-weight: bold;
  width: 80%;
`;

export const InviteListName = styled.Text`
  color: white;
  font-family: ${({ theme }) => theme.defaultFontFamily};
  font-size: ${({ theme }) => theme.defaultSizes.small};
`;

export const InviteBtnWrapper = styled.View`
  flex-direction: row;
  gap: 12px;
  justify-content: space-between;
`;
