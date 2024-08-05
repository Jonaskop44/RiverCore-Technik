import { Autocomplete, AutocompleteItem } from "@nextui-org/react";

const animals = [
  { label: "Privatperson", value: "PERSON" },
  { label: "Firma", value: "COMPANY" },
];

const FilterAutocomplete = () => {
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Autocomplete
        label="Select an animal"
        className="max-w-xs"
        variant="underlined"
      >
        {animals.map((animal) => (
          <AutocompleteItem key={animal.value} value={animal.value}>
            {animal.label}
          </AutocompleteItem>
        ))}
      </Autocomplete>
    </div>
  );
};

export default FilterAutocomplete;