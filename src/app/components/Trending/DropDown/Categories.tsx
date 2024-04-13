"use client";

import { useId } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { categoriesGenre } from "../../../../../data";

type props = {
  selectedCategory: number;
  setSelectedCategory: (value: any) => void;
};

const Categories = ({ setSelectedCategory }: props) => {
  const animatedComponents = makeAnimated();

  const handleChange = (options: any) => {
    options.map((item: { value: any }) => {
      if (item && item.value) {
        setSelectedCategory(`${item.value} ,`);
      } else {
        setSelectedCategory("");
      }
    });
  };

  const selectStyles = {
    control: (styles: any) => ({
      ...styles,
      border: "2px solid black",
      color: "#000"
    }),
    multiValue: (styles: any) => {
      return {
        ...styles,
        backgroundColor: "red",
        borderRadius: "10px",
      };
    },
    multiValueLabel: (styles: any) => {
      return {
        ...styles,
        color: "#fff",
      };
    },
    multiValueRemove: (styles: any) => {
      return {
        ...styles,
        color: "#fff",
        cursor: "pointer",
      };
    },
    base: (base: any) => {
      return {
        ...base,
        height: 20,
        minHeight: 20,
      };
    },
  };
  return (
    <div className="max-w-[400px] z-20 max-[834px]:max-w-[250px]">
      <Select
        closeMenuOnSelect={false}
        components={animatedComponents}
        options={categoriesGenre}
        isMulti
        onChange={handleChange}
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
