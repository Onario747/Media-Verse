import { useId } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import Select, {
  ActionMeta,
  DropdownIndicatorProps,
  MultiValue,
  components,
} from "react-select";
import { categoriesGenre } from "../../../../data";

type OptionType = {
  value: number;
  label: string;
};

type Props = {
  selectedCategory: number[];
  setSelectedCategory: (value: number[]) => void;
  className?: string;
};

const Categories = ({ selectedCategory, setSelectedCategory }: Props) => {
  const handleChange = (
    newValue: MultiValue<OptionType>,
    actionMeta: ActionMeta<OptionType>
  ) => {
    const values = newValue.map((item) => item.value);
    setSelectedCategory(values);
  };

  const DropdownIndicator = (
    props: DropdownIndicatorProps<OptionType, true>
  ) => {
    return (
      <components.DropdownIndicator {...props}>
        <MdKeyboardArrowDown className="text-black text-[1.5rem]" />
      </components.DropdownIndicator>
    );
  };

  const selectStyles = {
    control: (styles: any) => ({
      ...styles,
      border: "2px solid black",
      borderRadius: "1.5rem",
      color: "#000",
    }),
    multiValue: (styles: any) => ({
      ...styles,
      backgroundColor: "red",
      borderRadius: "10px",
    }),
    multiValueLabel: (styles: any) => ({
      ...styles,
      color: "#fff",
    }),
    multiValueRemove: (styles: any) => ({
      ...styles,
      color: "#fff",
      cursor: "pointer",
    }),
    base: (base: any) => ({
      ...base,
      height: 20,
      minHeight: 20,
    }),
    placeholder: (styles: any) => ({
      ...styles,
      color: "#000",
    }),
  };

  return (
    <div className="max-w-[400px] z-20 max-md:max-w-full">
      <Select<OptionType, true>
        closeMenuOnSelect={false}
        components={{ DropdownIndicator }}
        options={categoriesGenre}
        isMulti
        isSearchable={false}
        onChange={handleChange}
        value={categoriesGenre.filter((option) =>
          selectedCategory.includes(option.value)
        )}
        instanceId={useId()}
        placeholder="All Categories"
        styles={selectStyles}
        className="react-select-container"
        classNamePrefix="react-select"
      />
    </div>
  );
};

export default Categories;
