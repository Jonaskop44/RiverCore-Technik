import {
  Autocomplete,
  AutocompleteItem,
  Avatar,
  MenuTriggerAction,
} from "@nextui-org/react";
import { useFilter } from "@react-aria/i18n";
import { User } from "@/types/user";
import { useEffect, useState } from "react";
import { useUserStore } from "@/data/userStore";
import { motion } from "framer-motion";

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

  const { startsWith } = useFilter({ sensitivity: "base" });

  const getFullName = (user: User) => {
    return `${user.firstName || ""} ${user.lastName || ""}`.trim();
  };

  const onSelectionChange = (key: string) => {
    const selectedItem = data.find((user) => user.id === parseInt(key)) || null;
    setFieldState((prevState) => ({
      inputValue: selectedItem ? getFullName(selectedItem) : "",
      selectedKey: key,
      items: data.filter((item) =>
        startsWith(
          getFullName(item),
          selectedItem ? getFullName(selectedItem) : ""
        )
      ),
    }));
    onUserSelect(selectedItem);
  };

  const onInputChange = (value: string) => {
    setFieldState((prevState) => ({
      inputValue: value,
      selectedKey: value === "" ? null : prevState.selectedKey,
      items: data.filter((item) => startsWith(getFullName(item), value)),
    }));
    if (value === "") onUserSelect(null);
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
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          x: 20,
        },

        visible: {
          opacity: 1,
          x: 0,
        },
      }}
      initial="hidden"
      whileInView="visible"
      transition={{ duration: 0.5, delay: 0.3 }}
      viewport={{ once: true }}
    >
      <Autocomplete
        className="max-w-xs z-10"
        classNames={{
          popoverContent: "dark:bg-blacksection",
        }}
        inputValue={fieldState.inputValue}
        items={fieldState.items}
        label="Benutzer suchen"
        listboxProps={{
          emptyContent: "Keinen Benutzer gefunden",
          itemClasses: {
            base: ["dark:data-[hover=true]:bg-white/10"],
          },
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
                src={item.profilePicture}
              />
              <div className="flex flex-col">
                <span className="text-small">{getFullName(item)}</span>
                <span className="text-tiny text-default-400">{item.email}</span>
              </div>
            </div>
          </AutocompleteItem>
        )}
      </Autocomplete>
    </motion.div>
  );
};

export default FilterAutocomplete;
