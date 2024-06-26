"use client";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


const HeroLoader = () => {
  return (
    <div className="h-lvh w-full flex items-center justify-center">
      <div className="lds-default">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default HeroLoader;
