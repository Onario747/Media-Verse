"use client";

import Hero from "./Home/sections/Hero";
import Trending from "./Home/sections/Trending";

export default function Home() {
  return (
    <main className="select-none">
      <>
        <Hero />
        <Trending />
      </>
    </main>
  );
}
