"use client";

import { useId } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import {
  ActionMeta,
  DropdownIndicatorProps,
  SingleValue,
  components,
} from "react-select";
import CreatableSelect from "react-select/creatable";
import { releaseYears } from "../../../../data";

type OptionType = {
  value: number;
  label: string;
};

type Prop = {
  selectedYear: number | null;
  setSelectedYear: (value: number | null) => void;
};

const ReleaseYear = ({ selectedYear, setSelectedYear }: Prop) => {
  const handleChange = (
    newValue: SingleValue<OptionType>,
    actionMeta: ActionMeta<OptionType>
  ) => {
    if (newValue) {
      setSelectedYear(newValue.value);
    } else {
      setSelectedYear(null);
    }
  };

  const DropdownIndicator = (
    props: DropdownIndicatorProps<OptionType, false>
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
    }),
    singleValue: (styles: any) => ({
      ...styles,
      backgroundColor: "red",
      color: "white",
      padding: "2px",
      fontSize: "15px",
      borderRadius: "10px",
      width: "fit-content",
    }),
    placeholder: (styles: any) => ({
      ...styles,
      color: "#000",
    }),
  };

  return (
    <div>
      <CreatableSelect<OptionType, false>
        isClearable
        components={{ DropdownIndicator }}
        options={releaseYears}
        onChange={handleChange}
        isSearchable={false}
        placeholder="Release Year"
        styles={selectStyles}
        value={
          selectedYear !== null
            ? releaseYears.find((option) => option.value === selectedYear) ||
              null
            : null
        }
        instanceId={useId()}
        className="react-select-container"
        classNamePrefix="react-select"
      />
    </div>
  );
};

export default ReleaseYear;
