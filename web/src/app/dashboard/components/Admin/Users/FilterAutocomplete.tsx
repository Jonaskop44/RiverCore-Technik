import React, { useState, useEffect } from "react";
import {
  Autocomplete,
  AutocompleteItem,
  Avatar,
  MenuTriggerAction,
} from "@nextui-org/react";
import { useFilter } from "@react-aria/i18n";
import { User } from "@/types/user";

type FieldState = {
  selectedKey: string | null;
  inputValue: string;
  items: User[];
};

interface FilterAutocompleteProps {
  data: User[];
  onUserSelect: (user: User) => void;
}

const FilterAutocomplete: React.FC<FilterAutocompleteProps> = ({
  data,
  onUserSelect,
}) => {
  const [fieldState, setFieldState] = useState<FieldState>({
    selectedKey: "",
    inputValue: "",
    items: data,
  });

  useEffect(() => {
    setFieldState((prevState) => ({
      ...prevState,
      items: data,
    }));
  }, [data]);

  const getFullName = (user: User) => {
    return `${user.firstName || ""} ${user.lastName || ""}`.trim();
  };

  const { startsWith } = useFilter({ sensitivity: "base" });

  const onSelectionChange = (key: React.Key) => {
    const selectedItem = data.find((option) => option.id === key);
    onUserSelect(selectedItem);
    setFieldState((prevState) => ({
      inputValue: selectedItem?.firstName || "",
      selectedKey: String(key),
      items: data.filter((item) =>
        startsWith(item.firstName, selectedItem?.firstName || "")
      ),
    }));
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
      label="Benutzer suchen"
      listboxProps={{
        emptyContent: "Keine Benutzer gefunden!",
      }}
      selectedKey={fieldState.selectedKey}
      variant="underlined"
      onInputChange={onInputChange}
      onOpenChange={onOpenChange}
      onSelectionChange={onSelectionChange}
    >
      {(item) => (
        <AutocompleteItem key={item.id.toString()}>
          <div className="flex gap-2 items-center">
            <Avatar
              alt={getFullName(item)}
              className="flex-shrink-0"
              size="sm"
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
            />
            <div className="flex flex-col">
              <span className="text-small">{getFullName(item)}</span>
              <span className="text-tiny text-default-400">{item.email}</span>
            </div>
          </div>
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
};

export default FilterAutocomplete;
