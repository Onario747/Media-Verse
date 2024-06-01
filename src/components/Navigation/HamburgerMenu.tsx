import { IoClose, IoMenu } from "react-icons/io5";

type hamburgerProps = {
  toggleHamburger: Boolean;
  setToggleHamburger: (newState: boolean) => void;
};

const HamburgerMenu = ({
  toggleHamburger,
  setToggleHamburger,
}: hamburgerProps) => {
  const toggleMenu = () => {
    setToggleHamburger(!toggleHamburger);
  };
  return (
    <div className="border border-white rounded-full">
      {toggleHamburger ? (
        <IoClose
          onClick={toggleMenu}
          className="text-white text-[2.5em] p-[5px] bg-red-600 rounded-full"
        />
      ) : (
        <IoMenu
          onClick={toggleMenu}
          className="text-white text-[2.5rem] bg-transparent p-[5px]"
        />
      )}
    </div>
  );
};

export default HamburgerMenu;
