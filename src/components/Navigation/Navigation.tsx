"use client";
import { motion } from "framer-motion";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import logoImage from "../../../public/images/logo.png";
import HamburgerMenu from "./HamburgerMenu";
import NavSearch from "./NavSearch";

const Navigation = () => {
  const dropdownVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        // staggerChildren: 0.1,
      },
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };
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

  return (
    <header
      className={`padding-x py-4 w-full fixed max-sm:py-0 top-0 z-30 transition-all select-none`}
    >
      {/* Desktop Navigation */}
      <nav className="hidden [@media(min-width:834px)]:flex gap-[2rem] blur-nav rounded-xl px-4 py-1-xl w-fit items-center max-container justify-evenly font-montserrat">
        <Image
          src={logoImage}
          priority
          placeholder="blur"
          alt="Media-Verse logo"
          width={80}
          height={80}
          className="object-contain"
        />
        <div className="flex gap-[5em] font-bold ">
          {navLinks.map((link) => (
            <Link href={link.href} key={link.label} className={link.className}>
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-8">
          <NavSearch />
        </div>
      </nav>
      {/* Mobile Navigation */}
      <nav
        className={`[@media(min-width:834px)]:hidden flex items-center max-container justify-between blur-nav px-4 py-1 ${
          toggleHamburger ? "" : "rounded-bl-xl rounded-br-xl"
        } font-montserrat`}
      >
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="Media-Verse logo"
            priority={true}
            width={80}
            height={80}
            className="-ml-3"
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
            <motion.div
              initial="hidden"
              animate={toggleHamburger ? "visible" : "hidden"}
              variants={dropdownVariants}
              className={`flex flex-col items-start gap-5 font-bold mobile-nav bg-white rounded-br-xl rounded-bl-xl shadow-xl padding-x`}
            >
              <div className="flex flex-col items-start w-full">
                {navLinks.map((link) => (
                  <motion.div
                    key={link.label}
                    variants={linkVariants}
                    className="border-b border-gray-200 w-full py-2"
                  >
                    <Link href={link.href}>{link.label}</Link>
                  </motion.div>
                ))}
              </div>
              <div className="flex gap-3">
                <NavSearch />
              </div>
            </motion.div>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navigation;
