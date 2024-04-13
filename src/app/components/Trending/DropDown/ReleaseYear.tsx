"use client";

import { useId } from "react";
import CreatableSelect from "react-select/creatable";
import { releaseYears } from "../../../../../data";

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

  const selectStyles = {
    control: (styles: any) => ({
      ...styles,
      border: "2px solid black",
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
  };

  return (
    <div>
      <CreatableSelect
        isClearable
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
