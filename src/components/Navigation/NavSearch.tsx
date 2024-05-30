import { IoIosSearch } from "react-icons/io";

const NavSearch = () => {
  return (
    <div className="flex items-center gap-3">
      <IoIosSearch className="text-[2.1rem] text-white bg-red-600 rounded-full p-1 cursor-pointer" />
      <span className="button-glow border-2 border-blue-500 rounded-full px-2 py-1">Search...</span>
    </div>
  );
}

export default NavSearch