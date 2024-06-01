"use client";

import { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { LuSettings2 } from "react-icons/lu";
import Modal from "react-modal";
import Categories from "./DropDown/Categories";
import ReleaseYear from "./DropDown/ReleaseYear";
import VoteCount from "./DropDown/VoteCount";

// Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "0",
    marginRight: "-50%",
    width: "100%",
    maxHeight: "600px",
    maxWidth: "500px",
    border: "none",
    background: "none",
    padding: "0",
    overflow: "scroll",
    zIndex: "10000",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    zIndex: "9999",
  },
};

// type OptionsState = {
//   [key: number]: boolean;
// };

type props = {
  selectedCategory: number[];
  setSelectedCategory: (value: number[]) => void;
  setSelectedYear: (value: number | null) => void;
  setSelectedVote: (value: number | null) => void;
  selectedYear: number | null;
  selectedVote: number | null;
};

const MobileFilter = ({
  selectedCategory,
  setSelectedCategory,
  setSelectedYear,
  setSelectedVote,
  selectedYear,
  selectedVote,
}: props) => {
  const [showFilters, setShowFilters] = useState(false);
  // const [showOptions, setShowOptions] = useState<OptionsState>({});

  useEffect(() => {
    if (showFilters) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showFilters]);

  const openFilter = () => {
    setShowFilters(true);
  };

  const closeFilter = () => {
    setShowFilters(false);
  };
  return (
    <div className="flex flex-col items-end z-[999px]">
      {!showFilters && (
        <div
          className="flex items-center gap-2 border-2 border-black rounded-3xl font-semibold font-montserrat text-white bg-blue-500 p-[6px]"
          onClick={openFilter}
        >
          Filter
          <LuSettings2 />
        </div>
      )}
      <Modal
        isOpen={showFilters}
        onRequestClose={closeFilter}
        style={customStyles}
        contentLabel="Modal"
      >
        <div
          className={`filter fixed w-full left-0 bottom-0 ${
            showFilters && "filter-animated"
          }`}
        >
          {showFilters && (
            <div
              className={`bg-white h-[23rem] overflow-y-auto w-full shadow-xl drop-shadow-md flex flex-col gap-2 items-end py-[2rem] rounded-xl padding-x`}
            >
              <div className="flex items-center justify-between w-full text-blue-500">
                <div className="flex items-center gap-2 font-bold">
                  <FaFilter />
                  <p className="font-montserrat text-[1.5rem]">Filter</p>
                </div>
                <IoClose className="text-[2rem]" onClick={closeFilter} />
              </div>
              <div className="w-full flex flex-col gap-4 pt-5">
                <Categories
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                />
                <ReleaseYear
                  setSelectedYear={setSelectedYear}
                  selectedYear={selectedYear}
                />
                <VoteCount
                  setSelectedVote={setSelectedVote}
                  selectedVote={selectedVote}
                />
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default MobileFilter;
