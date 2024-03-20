"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import HamburgerMenu from "./HamburgerMenu";
import NavDropdown from "./NavDropdown";
import NavSearch from "./NavSearch";

const Navigation = () => {
  const [isblurred, setIsBlurred] = useState(false);
  const [toggleHamburger, setToggleHamburger] = useState(false);
  const pathname = usePathname();
  const navLinks = [
    {
      href: "/",
      label: "Home",
      className: `text-white ${pathname === "/" ? "active-link" : ""}`,
    },
    {
      href: "/movies",
      label: "Movies",
      className: `text-white ${pathname === "/movies" ? "active-link" : ""}`,
    },
    {
      href: "/tv-shows",
      label: "Tv shows",
      className: `text-white ${pathname === "/tv-shows" ? "active-link" : ""}`,
    },
  ];
  useEffect(() => {
    const handleScroll = () => {
      setIsBlurred(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`padding-x py-4 w-full fixed top-0 z-10 transition-all ${
        isblurred ? "blur-nav" : ""
      } `}
    >
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center max-container justify-between font-montserrat">
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="Media-Verse logo"
            width={80}
            height={80}
            className="w-[80px] h-[80px]"
          />
        </Link>
        <div className="flex gap-[5em] font-bold ">
          {navLinks.map((link) => (
            <Link href={link.href} key={link.label} className={link.className}>
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-8">
          <NavDropdown />
          <NavSearch />
        </div>
      </nav>
      {/* Mobile Navigation */}
      <nav className="md:hidden flex items-center max-container justify-between font-montserrat">
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="Media-Verse logo"
            width={80}
            height={80}
            className="w-[80px] h-[80px]"
          />
        </Link>
        <div>
          <HamburgerMenu
            toggleHamburger={toggleHamburger}
            setToggleHamburger={setToggleHamburger}
          />
        </div>
        {toggleHamburger && (
          <>
            <div className="flex flex-col items-start gap-5 font-bold mobile-nav bg-slate-100 h-screen padding-x">
              <div className="flex flex-col items-start w-full">
                {navLinks.map((link) => (
                  <Link
                    href={link.href}
                    key={link.label}
                    className="border-b border-gray-200 w-full py-2"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="flex flex-col gap-3">
                <NavDropdown />
                <NavSearch />
              </div>
            </div>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navigation;
