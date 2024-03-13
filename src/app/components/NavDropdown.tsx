import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowDropdownCircle, IoIosSearch } from "react-icons/io";

const NavDropdown = () => {
  const [toggleDropDown, setToggleDropDown] = useState(false);
  const handleDropDown = () => {
    setToggleDropDown((prevState) => !prevState);
  };
  const dropDownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(event.target as Node)
      ) {
        setToggleDropDown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center gap-8 font-medium">
      <div ref={dropDownRef}>
        <Link
          href="/"
          className="bg-blue-500 text-white p-2 rounded flex items-center gap-2"
          onClick={handleDropDown}
        >
          My List
          <IoIosArrowDropdownCircle className="w-[20px] h-[20px]" />
        </Link>
      </div>
      {toggleDropDown && (
        <div className="bg-blue-500 rounded absolute top-[5.5rem] flex flex-col text-white divide-y">
          <Link
            href="/"
            className="pl-2 pr-5 py-2"
            onClick={() => setToggleDropDown(false)}
          >
            Favorites
          </Link>
          <Link
            href="/"
            className="pl-2 pr-5 py-2"
            onClick={() => setToggleDropDown(false)}
          >
            PlayList
          </Link>
        </div>
      )}
      <IoIosSearch className="text-[2.1rem] text-white bg-red-600 rounded-full p-1 cursor-pointer" />
    </div>
  );
};

export default NavDropdown;
