"use client";

import { useEffect, useState } from "react";
import Select from "react-select";
import { voteCount } from "../../../../../data";

const VoteCount = () => {
  const [selectedOption, setSelectedOption] = useState();

  const handleChange = (option: any) => {
    if (option && option.label) {
      setSelectedOption(option.label);
    }
  };

  useEffect(() => {
    console.log("Vote Count", selectedOption);
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
        padding: "2px 5px",
        fontSize: "15px",
        borderRadius: "10px",
      };
    },
  };
  return (
    <div>
      <Select
        options={voteCount}
        isClearable
        placeholder="Vote count"
        onChange={handleChange}
        styles={selectStyles}
      />
    </div>
  );
};

export default VoteCount;
