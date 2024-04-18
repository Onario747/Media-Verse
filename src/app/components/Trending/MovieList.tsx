"use client";

import Image from "next/image";
import { useState } from "react";
import { MdArrowRightAlt } from "react-icons/md";
import { MovieApiResults } from "../../../../types";
import StarRatings from "../Hero/StarRatings";
import Genre from "./Genre";

type prop = {
  movieList: MovieApiResults[];
  isLoading: boolean;
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

const MovieList = ({ movieList, isLoading }: prop) => {
  const [isMovieCardHovered, setIsMovieCardHovered] = useState(null);

  const movieCardHover = (index: any) => {
    setIsMovieCardHovered(index);
  };
  const movieCardNotHover = () => {
    setIsMovieCardHovered(null);
  };

  const extractYearFromDate = (dateString: any) => {
    if (dateString) {
      const date = new Date(dateString);
      return date.getFullYear();
    } else {
      return "N/A";
    }
  };
  return (
    <div>
      <div className="grid grid-cols-5 gap-y-4 items-center w-full mt-9 max-[1204px]:grid-cols-4 max-lg:hidden">
        {movieList.map((item, index) => (
          <div
            key={index}
            className={`w-fit relative ${
              isLoading
                ? ""
                : `shadow-lg shadow-blue-400 rounded-xl cursor-pointer ${
                    isMovieCardHovered === index &&
                    "shadow-xl shadow-red-500 transition-shadow duration-150"
                  }`
            }`}
            onMouseOver={() => movieCardHover(index)}
            onMouseOut={movieCardNotHover}
          >
            {isLoading ? (
              <div className="relative">
                <div className="animate-pulse bg-gradient-to-l from-[#cacaca] to-[#cacaca] rounded h-[310px] w-[210px] 2xl:w-[240px] 2xl:h-[340px]"></div>
                <div className=" animate-pulse absolute bottom-2 w-full ml-4 flex flex-col gap-2">
                  <div className="bg-gradient-to-l from-[#888888] to-[#bebebe] h-2 w-[50%] rounded"></div>
                  <div className="bg-gradient-to-l from-[#bebebe] to-[#888888] h-2 w-[70%] rounded"></div>
                  <div className="bg-gradient-to-l from-[#bebebe] to-[#888888] h-2 w-[80%] rounded"></div>
                </div>
              </div>
            ) : (
              <div>
                <div>
                  <div className="w-[210px] h-[310px] 2xl:w-[240px] 2xl:h-[340px] rounded-lg">
                    <Image
                      priority={true}
                      placeholder={`data:image/svg+xml;base64,${toBase64(
                        shimmer(210, 410)
                      )}`}
                      src={`${
                        item.poster_path
                          ? `https://image.tmdb.org/t/p/w500/${item.poster_path}`
                          : "/images/brokenImage.png"
                      } `}
                      alt={item.title}
                      layout="fill"
                      className={`rounded-lg object-cover`}
                    />
                  </div>
                  {isMovieCardHovered === index && (
                    <div className="movieCardHover active">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <MdArrowRightAlt className="text-white text-[30px] animate-arrow" />
                      </div>
                    </div>
                  )}
                </div>
                <div className="px-3 py-2 w-full overlay absolute bottom-0 rounded-b-lg">
                  <div className="flex items-center justify-between">
                    <StarRatings
                      rating={item.vote_average}
                      textColor="white"
                      borderColor="white"
                    />
                    <p className="font-semibold text-blue-400 font-montserrat">
                      {extractYearFromDate(
                        item.release_date
                          ? item.release_date
                          : item.first_air_date
                      )}
                    </p>
                  </div>
                  <div className="flex items-end justify-between">
                    <h2 className="font-poppins text-white font-bold text-[1.1rem]">
                      {item.title ? item.title : item.original_name}
                    </h2>
                    <p className="font-montserrat text-red-500 uppercase font-semibold">
                      {item.original_language}
                    </p>
                  </div>
                </div>
                <div className="absolute top-2 left-2">
                  <Genre genreId={item.genre_ids[0]} />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;

// ${
//             isMovieCardHovered === index &&
//             "shadow-xl shadow-red-500 transition-shadow duration-150"
//           }
