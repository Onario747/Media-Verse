"use client";
import { MovieApiResults } from "../../../types";

import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { MdMoreHoriz } from "react-icons/md";
import { Autoplay } from "swiper/modules";
import HeroLoader from "../HeroLoader";
import Genre from "./Genre";
import StarRatings from "./StarRatings";

const HeroSlideItem = () => {
  const fetchHeroData = async () => {
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/discover/movie",
      params: {
        include_adult: "false",
        include_video: "false",
        language: "en-US",
        page: "1",
        sort_by: "popularity.desc",
      },
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjM2FhNjQzNTYyZDQyYTc0NTZlNTE4ZmZhMjNmZWE1ZCIsInN1YiI6IjY1ZjIwODhhOTkyNTljMDE4NjVlZjcwYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kpR4HyoUoLEcfCj2DqlIu4hK0dwSvVaEkj0F6dzw-sA",
      },
    };
    try {
      const response = await axios.request(options);
      const modifiedResults = response.data.results;
      return modifiedResults;
    } catch (error) {
      console.error("Error fetching data:", error);
      return <div>No Connection!!</div>;
    }
  };
  const { data: heroMovies, isLoading } = useQuery<MovieApiResults[]>({
    queryKey: ["hero"],
    queryFn: () => fetchHeroData(),
  });

  if (isLoading) {
    return <HeroLoader />;
  }

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

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <div className="h-full w-full relative select-none">
      <Swiper
        modules={[Autoplay]}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 5000 }}
      >
        {heroMovies &&
          heroMovies.map((poster, index) => (
            <SwiperSlide key={index}>
              {({ isActive }) => (
                <div className={`banner-overlay`}>
                  <motion.div
                    initial="hidden"
                    animate={isActive ? "visible" : "hidden"}
                    variants={backdropVariants}
                    transition={{ duration: 1.5 }}
                  >
                    <Image
                      src={
                        poster.backdrop_path === null
                          ? `https://image.tmdb.org/t/p/original/${poster.poster_path}`
                          : `https://image.tmdb.org/t/p/original/${poster.backdrop_path}`
                      }
                      alt={poster.title}
                      fill={true}
                      quality={100}
                      priority={true}
                      sizes="(max-width: 768px) 80vw, (max-width: 480px) 60vw, 100vw"
                      className="object-cover object-center"
                    />
                  </motion.div>
                  <div className="absolute h-full w-full bg-[#00000099]"></div>
                  <div className="w-full relative padding-x max-container py-[9rem] max-sm:pt-[6rem] max-lg:pb-[4rem]">
                    <div className="flex gap-[5rem] w-full">
                      <Image
                        priority={true}
                        placeholder={`data:image/svg+xml;base64,${toBase64(
                          shimmer(600, 400)
                        )}`}
                        src={`https://image.tmdb.org/t/p/w500/${poster.poster_path}`}
                        alt="movie poster"
                        width={400}
                        height={600}
                        quality={100}
                        className={`poster-image object-cover max-lg:hidden z-10 ${
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
                          className={`hero-title w-full max-lg:text-[3rem] max-md:text-[2rem] max-sm:text-[1.8rem] lg:line-clamp-3 max-sm:line-clamp-2 m-0 leading-none ${
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
                          className={`overview max-md:text-[1rem] max-sm:text-[0.7rem] font-semibold max-md:line-clamp-3
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


