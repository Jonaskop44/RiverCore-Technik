import React from "react";
import {
  Autocomplete,
  AutocompleteItem,
  MenuTriggerAction,
} from "@nextui-org/react";
import { useFilter } from "@react-aria/i18n";
import { User } from "@/types/user";

type FieldState = {
  selectedKey: string | null;
  inputValue: string;
  items: User[];
};

type FilterAutocompleteProps = {
  data: User[];
};

const FilterAutocomplete = ({ data }: FilterAutocompleteProps) => {
  const [fieldState, setFieldState] = React.useState<FieldState>({
    selectedKey: "",
    inputValue: "",
    items: data,
  });

  const { startsWith } = useFilter({ sensitivity: "base" });

  const getFullName = (user: User) => {
    return `${user.firstName || ""} ${user.lastName || ""}`.trim();
  };

  const onSelectionChange = (key: string) => {
    setFieldState((prevState) => {
      let selectedItem = prevState.items.find(
        (option) => option.id === parseInt(key)
      );

      return {
        inputValue: selectedItem ? getFullName(selectedItem) : "",
        selectedKey: key,
        items: data.filter((item) =>
          startsWith(
            getFullName(item),
            selectedItem ? getFullName(selectedItem) : ""
          )
        ),
      };
    });
  };

  const onInputChange = (value: string) => {
    setFieldState((prevState) => ({
      inputValue: value,
      selectedKey: value === "" ? null : prevState.selectedKey,
      items: data.filter((item) => startsWith(getFullName(item), value)),
    }));
  };

  const onOpenChange = (isOpen: boolean, menuTrigger: MenuTriggerAction) => {
    if (menuTrigger === "manual" && isOpen) {
      setFieldState((prevState) => ({
        inputValue: prevState.inputValue,
        selectedKey: prevState.selectedKey,
        items: data,
      }));
    }
  };

  return (
    <Autocomplete
      className="max-w-xs"
      inputValue={fieldState.inputValue}
      items={fieldState.items}
      label="Search User"
      placeholder="Search a user"
      selectedKey={fieldState.selectedKey}
      variant="bordered"
      onInputChange={onInputChange}
      onOpenChange={onOpenChange}
      onSelectionChange={onSelectionChange}
    >
      {(item) => (
        <AutocompleteItem key={item.id.toString()}>
          {getFullName(item)}
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
};

export default FilterAutocomplete;
