import { useEffect, useState } from "react";
import * as S from "./styles";
import { CheckboxInputField } from "@/src/components/checkboxdInputField";

type ItemsFilterProps = {
  filterMethod: (itemStatus: string[]) => void;
};

export const ItemsFilter = ({ filterMethod }: ItemsFilterProps) => {
  const filterOptions = [
    {
      label: "Marcado",
      value: "checked",
    },
    {
      label: "Não marcado",
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
            key={item.label}
            isItemChecked={selectedOptions.includes(item.label)}
            handleCheckItem={(checked) => handleCheck(item.label)}
            checkBoxLabel={item.label}
          />
        );
      })}
    </S.FilterRow>
  );
};
