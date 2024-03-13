"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { IoIosArrowDropdownCircle, IoIosSearch } from "react-icons/io";
import NavDropdown from "./NavDropdown";

const Navigation = () => {
  const pathname = usePathname();
  return (
    <section className="padding-x py-5 border-b border-slate-500">
      <nav className="flex items-center max-container justify-between font-montserrat">
        <div>
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="Media-Verse logo"
              width={80}
              height={80}
              className="w-[80px] h-[80px]"
            />
          </Link>
        </div>
        <div className="flex gap-[5em] font-medium ">
          <Link href="/" className={pathname === "/" ? "active-link" : ""}>
            Home
          </Link>
          <Link
            href="/movies"
            className={pathname === "/movies" ? "active-link" : ""}
          >
            Movies
          </Link>
          <Link
            href="/tv-shows"
            className={pathname === "/tv-shows" ? "active-link" : ""}
          >
            Tv Shows
          </Link>
        </div>
        <NavDropdown />
      </nav>
    </section>
  );
};

export default Navigation;
