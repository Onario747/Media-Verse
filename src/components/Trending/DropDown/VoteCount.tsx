"use client";

import { useId } from "react";
import Select, { components, DropdownIndicatorProps } from "react-select";
import { MdKeyboardArrowDown } from "react-icons/md";
import { voteCount } from "../../../../data";

type prop = {
  setSelectedVote: (value: any) => void;
};

const VoteCount = ({ setSelectedVote }: prop) => {
  const handleChange = (option: any) => {
    if (option && option.label) {
      setSelectedVote(option.label);
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
        padding: "2px 5px",
        fontSize: "15px",
        borderRadius: "10px",
      };
    },
    placeholder: (styles: any) => {
      return {
        ...styles,
        color: "#000",
      }
    }
  };
  return (
    <div>
      <Select
        components={{ DropdownIndicator }}
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
