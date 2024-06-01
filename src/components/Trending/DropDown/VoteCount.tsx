"use client";

import { useId } from "react";
import Select, {
  components,
  DropdownIndicatorProps,
  SingleValue,
  ActionMeta,
} from "react-select";
import { MdKeyboardArrowDown } from "react-icons/md";
import { voteCount } from "../../../../data";

type OptionType = {
  value: number;
  label: string;
};

type Prop = {
  selectedVote: number | null;
  setSelectedVote: (value: number | null) => void;
};

const VoteCount = ({ selectedVote, setSelectedVote }: Prop) => {
  const handleChange = (
    newValue: SingleValue<OptionType>,
    actionMeta: ActionMeta<OptionType>
  ) => {
    if (newValue) {
      setSelectedVote(newValue.value);
    } else {
      setSelectedVote(null);
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
      <Select<OptionType, false>
        isClearable
        components={{ DropdownIndicator }}
        options={voteCount}
        onChange={handleChange}
        placeholder="Vote Count"
        isSearchable={false}
        styles={selectStyles}
        value={
          selectedVote !== null
            ? voteCount.find((option) => option.value === selectedVote) || null
            : null
        }
        instanceId={useId()}
        className="react-select-container"
        classNamePrefix="react-select"
      />
    </div>
  );
};

export default VoteCount;
