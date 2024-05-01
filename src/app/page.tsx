"use client";

import { Suspense } from "react";
import Hero from "./sections/Hero";
import Trending from "./sections/Trending";
import HeroLoading from "./heroLoading";

export default function Home() {
  return (
    <main className="select-none">
      {/* Hero loading state */}
      <Suspense fallback={<HeroLoading />}>
        <Hero />
      </Suspense>

      <Trending />
    </main>
  );
}
