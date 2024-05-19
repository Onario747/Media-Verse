"use client";

import { useId } from "react";
import CreatableSelect from "react-select/creatable";
import { components, DropdownIndicatorProps } from "react-select";
import { MdKeyboardArrowDown } from "react-icons/md";
import { releaseYears } from "../../../../data";

type prop = {
  setSelectedYear: (value: any) => void;
};

const ReleaseYear = ({ setSelectedYear }: prop) => {
  const handleChange = (option: any) => {
    if (option && option.label) {
      setSelectedYear(option.label);
    } else {
      setSelectedYear("");
    }
  };

    const DropdownIndicator = (props: DropdownIndicatorProps) => {
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
    singleValue: (styles: any) => {
      return {
        ...styles,
        backgroundColor: "red",
        color: "white",
        padding: "2px",
        fontSize: "15px",
        borderRadius: "10px",
      };
    },
    placeholder: (styles: any) => {
      return {
        ...styles,
        color: "#000",
      };
    },
  };

  return (
    <div>
      <CreatableSelect
        isClearable
        components={{ DropdownIndicator }}
        options={releaseYears}
        onChange={handleChange}
        placeholder="Release Year"
        styles={selectStyles}
        instanceId={useId()}
        className="react-select-container"
        classNamePrefix="react-select"
      />
    </div>
  );
};

export default ReleaseYear;
