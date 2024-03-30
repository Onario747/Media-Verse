"use client";

import { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import { releaseYears } from "../../../../../data";

const ReleaseYear = () => {
  const [selectedOption, setSelectedOption] = useState();

  const handleChange = (option: any) => {
    if (option && option.label) {
      setSelectedOption(option.label);
    }
  };

  useEffect(() => {
    console.log("ReleaseYear", selectedOption);
  }, [selectedOption]);

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
      />
    </div>
  );
};

export default ReleaseYear;
