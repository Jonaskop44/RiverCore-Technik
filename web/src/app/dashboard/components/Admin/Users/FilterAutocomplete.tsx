import { User } from "@/types/user";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";

interface FilterAutocompleteProps {
  data: User[];
}

const FilterAutocomplete: React.FC<FilterAutocompleteProps> = ({ data }) => {
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Autocomplete
        label="Select a user"
        className="max-w-xs"
        variant="underlined"
      >
        {data.map((user) => (
          <AutocompleteItem key={user.email} value={user.email}>
            {user.firstName} {user.lastName}
          </AutocompleteItem>
        ))}
      </Autocomplete>
    </div>
  );
};

export default FilterAutocomplete;
