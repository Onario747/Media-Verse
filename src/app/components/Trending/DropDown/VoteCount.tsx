"use client";

import { useId } from "react";
import Select from "react-select";
import { voteCount } from "../../../../../data";

type prop = {
  setSelectedVote: (value: any) => void;
};

const VoteCount = ({ setSelectedVote }: prop) => {
  const handleChange = (option: any) => {
    if (option && option.label) {
      setSelectedVote(option.label);
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
        instanceId={useId()}
        className="react-select-container"
        classNamePrefix="react-select"
      />
    </div>
  );
};

export default VoteCount;
