"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import HamburgerMenu from "./HamburgerMenu";
import NavDropdown from "./NavDropdown";
import NavSearch from "./NavSearch";

const Navigation = () => {
  const [toggleHamburger, setToggleHamburger] = useState(false);
  const pathname = usePathname();
  const navLinks = [
    {
      href: "/",
      label: "Home",
      className: `${pathname === "/" ? "active-link" : ""}`,
    },
    {
      href: "/movies",
      label: "Movies",
      className: `${pathname === "/movies" ? "active-link" : ""}`,
    },
    {
      href: "/tv-shows",
      label: "Tv shows",
      className: `${pathname === "/tv-shows" ? "active-link" : ""}`,
    },
  ];
  return (
    <header className="padding-x py-5 border-b border-slate-500">
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
        <div className="flex gap-[5em] font-medium ">
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
            <div className="flex flex-col items-start gap-5 font-medium mobile-nav padding-x bg-blue-300">
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
