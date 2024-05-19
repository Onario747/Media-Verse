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
    <div
      onClick={toggleMenu}
      className={
        toggleHamburger ? "hamburger-container-close" : "hamburger-container"
      }
    >
      <div className="bar"></div>
      <div className="bar"></div>
      <div className="bar"></div>
    </div>
  );
};

export default HamburgerMenu;
