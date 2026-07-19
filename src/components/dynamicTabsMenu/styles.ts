import styled from "styled-components/native";

type TabItemProps = {
  selected: boolean;
};

export const TabsBtnWrapper = styled.View`
  background-color: ${({ theme }) => theme.secondaryColor};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.defaultSizes.medium};
  padding: ${({ theme }) => theme.defaultContainerSpacing};
  width: 100%;
`;

export const TabItem = styled.TouchableOpacity<TabItemProps>`
  padding: ${({ theme }) => theme.defaultSizes.small};
  border-bottom-width: 2px;
  border-bottom-color: ${({ theme, selected }) =>
    selected ? theme.primaryColor : theme.secondaryColor};
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const TabItemText = styled.Text`
  font-family: ${({ theme }) => theme.defaultFontFamily};
  font-size: ${({ theme }) => theme.defaultSizes.medium};
  font-weight: 400;
  color: ${({ theme }) => theme.primaryColor};
  align-text: center;
`;
