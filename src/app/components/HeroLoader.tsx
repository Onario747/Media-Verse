"use client"

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import brokenImage from '/images/Broken Image Link.png'

import { Circles } from "react-loader-spinner";


const HeroLoader = () => {
  return (
    <div
      className="h-lvh w-full relative select-none bg-cover flex items-center justify-center"
      style={{
        backgroundImage:
          "url(https://image.tmdb.org/t/p/original//jnE1GA7cGEfv5DJBoU2t4bZHaP4.jpg)",
      }}
    >
      <Circles
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default HeroLoader;
