"use client";

import Image from "next/image";
import { useState } from "react";
import { MdArrowRightAlt } from "react-icons/md";
import { MovieApiResults } from "../../../types";
import StarRatings from "../Hero/StarRatings";
import Genre from "./Genre";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import MovieListLoading from "./loading/MovieListLoading";

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

type props = {
  selectedCategory: Number;
  selectedVote: string;
  selectedYear: string;
  selectedDiscover: string;
};

const MovieList = ({
  selectedCategory,
  selectedVote,
  selectedYear,
  selectedDiscover,
}: props) => {
  const [isMovieCardHovered, setIsMovieCardHovered] = useState(null);

  const fetchTrending = async () => {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/discover/${selectedDiscover}`,
      params: {
        include_adult: "false",
        include_video: "false",
        language: "en-US",
        page: "1",
        sort_by: "popularity.desc",
        with_genres: selectedCategory ? selectedCategory : "",
        year: selectedYear ? selectedYear : "",
        first_air_date_year: selectedYear ? selectedYear : "",
        "vote_average.lte": selectedVote ? selectedVote : "",
      },
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjM2FhNjQzNTYyZDQyYTc0NTZlNTE4ZmZhMjNmZWE1ZCIsInN1YiI6IjY1ZjIwODhhOTkyNTljMDE4NjVlZjcwYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kpR4HyoUoLEcfCj2DqlIu4hK0dwSvVaEkj0F6dzw-sA",
      },
    };
    try {
      const response = await axios.request(options);
      const modifiedResults = response.data.results.splice(
        Math.floor(Math.random()),
        10
      );
      return modifiedResults;
    } catch (error) {
      console.error("Error fetching Trending:", error);
    }
  };

  const {
    data: movieList,
    isLoading,
    error,
  } = useQuery<MovieApiResults[]>({
    queryKey: [
      "trending",
      selectedCategory,
      selectedVote,
      selectedYear,
      selectedDiscover,
    ],
    queryFn: () => fetchTrending(),
  });

  if (isLoading) {
    return <MovieListLoading />;
  }

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
      <div className="grid grid-cols-5 gap-y-4 items-center w-full mt-9 max-[1204px]:grid-cols-4 max-lg:flex max-lg:pl-[3rem] scroll-m-6 [@media(max-width:640px)]:pl-[1.5rem] [@media(max-width:995px)]:gap-4 max-sm:gap-3 overflow-x-auto max-md:snap-x max-sm:scroll-pl-[1.5rem]">
        {movieList &&
          movieList.map((item, index) => (
            <div
              key={index}
              className={`w-fit relative ${
                isLoading
                  ? ""
                  : `shadow-lg shadow-blue-400 rounded-xl cursor-pointer ${
                      isMovieCardHovered === index &&
                      "shadow-xl shadow-red-500 transition-shadow duration-150 max-md:snap-start"
                    }`
              }`}
              onMouseOver={() => movieCardHover(index)}
              onMouseOut={movieCardNotHover}
            >
              <div>
                <div className="w-[210px] h-[310px] max-sm:w-[140px] max-sm:h-[240px] max-md:w-[180px] 2xl:w-[240px] 2xl:h-[340px] rounded-lg">
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
                    fill={true}
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
                <div className="flex items-center justify-between w-full">
                  <StarRatings
                    rating={item.vote_average}
                    textColor="white"
                    borderColor="white"
                  />
                  <div className="flex items-center justify-between max-lg:w-full">
                    <p className="font-semibold text-blue-400 font-montserrat [@media(max-width:854px)]:text-[0.9rem]">
                      {extractYearFromDate(
                        item.release_date
                          ? item.release_date
                          : item.first_air_date
                      )}
                    </p>
                    <p className="font-montserrat text-red-500 uppercase font-semibold [@media(max-width:854px)]:text-[0.9rem] lg:hidden">
                      {item.original_language}
                    </p>
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <h2 className="font-poppins text-white font-bold text-[1.1rem] [@media(max-width:834px)]:text-[0.8rem]">
                    {item.title ? item.title : item.original_name}
                  </h2>
                  <p className="font-montserrat text-red-500 uppercase font-semibold max-sm:text-[0.8rem] [@media(max-width:995px)]:hidden">
                    {item.original_language}
                  </p>
                </div>
              </div>
              <div className="absolute top-2 left-2">
                <Genre genreId={item.genre_ids[0]} />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MovieList;
