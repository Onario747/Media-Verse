import { IoSearchCircleSharp } from "react-icons/io5";

const SearchBar = () => {
  return (
    <div className="flex items-center">
      <input
        placeholder="Search by name..."
        type="text"
        className="border-none focus:outline-none font-montserrat text-[1.2rem] font-medium "
      />
      <IoSearchCircleSharp fontSize={44} color="red" cursor="pointer" />
    </div>
  );
};

export default SearchBar;
