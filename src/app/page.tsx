import { Suspense } from "react";
import Hero from "./Home/sections/Hero";
import Trending from "./Home/sections/Trending";
import HeroLoader from "./components/HeroLoader";

export default function Home() {
  return (
    <main className="select-none">
      <Suspense fallback={<HeroLoader />}>
        <Hero />
      </Suspense>
      <Trending />
    </main>
  );
}
