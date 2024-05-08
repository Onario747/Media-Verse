"use client";

import { MovieApiResults } from "../../../../types";
type HeroSlideProps = {
  heroMovies: MovieApiResults[];
};

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
// import brokenImage from '/images/Broken Image Link.png'

import Image from "next/image";
import Link from "next/link";
import { MdMoreHoriz } from "react-icons/md";
import { Autoplay } from "swiper/modules";
import Genre from "./Genre";
import StarRatings from "./StarRatings";

const HeroSlideItem = ({ heroMovies }: HeroSlideProps) => {
  const extractYearFromDate = (dateString: any) => {
    if (dateString) {
      const date = new Date(dateString);
      return date.getFullYear();
    } else {
      return "N/A";
    }
  };

  const shimmer = (w: number, h: number) => `
  <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <linearGradient id="g">
        <stop stop-color="#333" offset="20%" />
        <stop stop-color="#222" offset="50%" />
        <stop stop-color="#333" offset="70%" />
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="#333" />
    <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
  </svg>`;

  const toBase64 = (str: string) =>
    typeof window === "undefined"
      ? Buffer.from(str).toString("base64")
      : window.btoa(str);

  return (
    <div className="h-full w-full relative select-none">
      <Swiper
        modules={[Autoplay]}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 5000 }}
      >
        {heroMovies.map((poster, index) => (
          <SwiperSlide key={index}>
            {({ isActive }) => (
              <div className={`banner-overlay`}>
                <Image
                  src={`https://image.tmdb.org/t/p/original/${poster.backdrop_path}`}
                  alt={poster.title}
                  layout="fill"
                  // priority={true}
                  className="object-cover"
                />
                <div className="absolute h-full w-full bg-[#00000099]"></div>
                <div className="w-full relative padding-x max-container py-[9rem] max-lg:pb-[4rem]">
                  <div className="flex gap-[5rem] w-full">
                    <Image
                      // priority={true}
                      placeholder={`data:image/svg+xml;base64,${toBase64(
                        shimmer(600, 400)
                      )}`}
                      src={`https://image.tmdb.org/t/p/w500/${poster.poster_path}`}
                      alt="movie poster"
                      width={400}
                      height={600}
                      className={`poster-image max-lg:hidden z-10 ${
                        isActive ? "scale-up" : ""
                      }`}
                    />
                    <div className="flex flex-col gap-4 max-sm:gap-2">
                      <div
                        className={`poster-fade flex gap-5 ${
                          isActive ? "poster-fade-animate" : ""
                        }`}
                      >
                        <p className="text-blue-400 font-montserrat font-semibold">
                          {extractYearFromDate(poster.release_date)}
                        </p>
                        <p className="uppercase font-montserrat font-semibold text-red-500">
                          {poster.original_language}
                        </p>
                      </div>
                      <h1
                        className={`hero-title w-full max-lg:text-[3rem] max-md:text-[2rem] m-0 leading-none ${
                          isActive ? "text-animate" : ""
                        }`}
                      >
                        {poster.title}
                      </h1>
                      <div
                        className={`poster-fade ${
                          isActive ? "poster-fade-animate" : ""
                        }`}
                      >
                        <StarRatings
                          rating={poster.vote_average}
                          borderColor="white"
                        />
                        <Genre genreId={poster.genre_ids} />
                      </div>
                      <p
                        className={`overview max-md:text-[1rem] max-sm:text-[0.7rem] font-medium
                        ${isActive ? "text-animate" : ""}`}
                      >
                        {poster.overview}
                      </p>
                      <div
                        className={`hero-button max-md:mt-5 z-10 ${
                          isActive ? "text-animate" : ""
                        }`}
                      >
                        <Link href="/">
                          <button className="glow-button-trailer bg-red-600 text-white font-bold font-montserrat max-sm:text-[13px] p-4 max-md:p-3 rounded-full flex items-center gap-2 max-md:gap-1">
                            <Image
                              src="/icons/play.svg"
                              alt="play"
                              height={20}
                              width={20}
                            />
                            Watch Trailer
                          </button>
                        </Link>
                        <Link href="/">
                          <button className="glow-button text-white max-sm:text-[13px] font-bold font-montserrat p-4 max-md:p-3 rounded-full flex items-center gap-2">
                            <MdMoreHoriz className="text-[20px]" />
                            Read More
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlideItem;
