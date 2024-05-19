"use client";

import HeroLoader from "@/components/HeroLoader";
import { Suspense, useEffect, useState } from "react";
import Hero from "./Home/sections/Hero";
import Trending from "./Home/sections/Trending";
import OfflineError from "./OfflineError";

export default function Home() {
  const [offlineStatus, setOfflineStatus] = useState(true);
  useEffect(() => {
    const updateOnlineStatus = () => {
      setOfflineStatus(navigator.onLine);
    };
    updateOnlineStatus();
    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);
    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);
  return (
    <main className="select-none">
      <Suspense fallback={<HeroLoader />}>
        <Hero />
      </Suspense>
      <Trending />
      {offlineStatus ? null : <OfflineError />}
    </main>
  );
}
