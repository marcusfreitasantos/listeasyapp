import * as S from "./styles";

type DynamicTabsMenuProps = {
  options: {
    label: string;
    value: string;
  }[];
  selectedOption: string;
  onSelectOption: (value: string) => void;
};

export const DynamicTabsMenu = ({
  options,
  selectedOption,
  onSelectOption,
}: DynamicTabsMenuProps) => {
  return (
    <S.TabsBtnWrapper>
      {options.map((option) => {
        return (
          <S.TabItem
            key={option.value}
            onPress={() => onSelectOption(option.value)}
            selected={selectedOption === option.value}
          >
            <S.TabItemText>{option.label}</S.TabItemText>
          </S.TabItem>
        );
      })}
    </S.TabsBtnWrapper>
  );
};
