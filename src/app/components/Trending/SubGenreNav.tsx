"use client";

import { useEffect, useState } from "react";
import CheckBox from "./DropDown/CheckBox";

const SubGenreNav = () => {
  const [genreActive, setGenreActive] = useState<string[]>([]);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {

    const genreNames = Object.values(subGenreMap);
    setGenreActive(genreNames);
  }, []);

  const toggleCheck = () => {
    setIsChecked((prevState) => !prevState);
  };

  return (
    <div className="overflow-y-scroll h-[10rem] divide-y">
      {genreActive.map((genre) => (
        <div
          key={genre}
          className="flex items-center gap-2 py-2 px-[10px] border-r"
        >
          <p className="cursor-pointer hover:text-blue-600">{genre}</p>
        </div>
      ))}
    </div>
  );
};

export default SubGenreNav;
