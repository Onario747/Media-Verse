"use client";

import { SetStateAction, useEffect, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { categoriesGenre } from "../../../../../data";

type props = {
  selectedCategory: number;
  setSelectedCategory: (value: any) => void
};

const Categories = ({ selectedCategory, setSelectedCategory }: props) => {
  const animatedComponents = makeAnimated();

  const handleChange = (options: any) => {
    options.map((item: { value: SetStateAction<undefined> }) =>
      setSelectedCategory(item.value)
    );
  };

  useEffect(() => {
    console.log("Categories", selectedCategory);
  }, [selectedCategory]);

  const selectStyles = {
    control: (styles: any) => ({
      ...styles,
      border: "2px solid black",
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
        ": hover": {
          color: "#fff",
          background: "transparent",
        },
      };
    },
  };
  return (
    <div className="max-w-[400px]">
      <Select
        closeMenuOnSelect={false}
        components={animatedComponents}
        options={categoriesGenre}
        isMulti
        onChange={handleChange}
        placeholder="All Categories"
        styles={selectStyles}
      />
    </div>
  );
};

export default Categories;
