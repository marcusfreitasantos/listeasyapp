import { useEffect, useState } from "react";
import * as S from "./styles";
import { CheckboxInputField } from "@/src/components/checkboxdInputField";
import { useTranslation } from "react-i18next";

type ItemsFilterProps = {
  filterMethod: (itemStatus: string[]) => void;
};

export const ItemsFilter = ({ filterMethod }: ItemsFilterProps) => {
  const { t } = useTranslation();

  const filterOptions = [
    {
      label: t("checked"),
      value: "checked",
    },
    {
      label: t("unchecked"),
      value: "unchecked",
    },
  ];

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleCheck = (option: string) => {
    if (selectedOptions?.includes(option)) {
      setSelectedOptions((prev) => prev?.filter((item) => item !== option));
    } else {
      setSelectedOptions((prev) => [...prev, option]);
    }
  };

  useEffect(() => {
    filterMethod(selectedOptions);
  }, [selectedOptions]);

  return (
    <S.FilterRow>
      {filterOptions.map((item, index) => {
        return (
          <CheckboxInputField
            key={item.value}
            isItemChecked={selectedOptions.includes(item.value)}
            handleCheckItem={() => handleCheck(item.value)}
            checkBoxLabel={item.label}
          />
        );
      })}
    </S.FilterRow>
  );
};
