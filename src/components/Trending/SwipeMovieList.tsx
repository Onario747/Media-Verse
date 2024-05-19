import Image from "next/image";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "../../app/swiper-styles.css";

import { MovieApiResults } from "../../../types";
import Genre from "./Genre";

type props = {
  selectedCategory: Number;
  selectedVote: string;
  selectedYear: string;
  selectedDiscover: string;
};

const SwipeMovieList = ({
  selectedCategory,
  selectedVote,
  selectedYear,
  selectedDiscover,
}: props) => {
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
      "swipeMovieTrending",
      selectedCategory,
      selectedDiscover,
      selectedVote,
      selectedYear,
    ],
    queryFn: () => fetchTrending(),
  });

  if (isLoading) {
    return <div>Loading md..</div>;
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
  return (
    <div className="hidden max-lg:flex mt-9 max-lg:pl-[3rem] max-[640px]:pl-[1.5rem]">
      <Swiper slidesPerView={"auto"} spaceBetween={10} grabCursor={true}>
        {movieList &&
          movieList.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="w-fit relative flex gap-9" key={index}>
                <div className="rounded-lg relative h-[310px] w-[210px] max-sm:w-[150px] max-sm:h-[250px]">
                  <Image
                    src={`${
                      item.poster_path
                        ? `https://image.tmdb.org/t/p/w500/${item.poster_path}`
                        : "/images/brokenImage.png"
                    } `}
                    alt={item.title}
                    placeholder={`data:image/svg+xml;base64,${toBase64(
                      shimmer(210, 180)
                    )}`}
                    fill={true}
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
                <div className="px-3 py-2 w-full overlay absolute bottom-0 rounded-b-lg">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-blue-400 font-montserrat max-sm:text-[0.8rem]">
                      {extractYearFromDate(
                        item.release_date
                          ? item.release_date
                          : item.first_air_date
                      )}
                    </p>
                    <p className="font-montserrat text-red-500 uppercase font-semibold max-sm:text-[0.8rem]">
                      {item.original_language}
                    </p>
                  </div>
                  <div className="flex items-end justify-between">
                    <h2 className="font-poppins text-white font-bold text-[1.1rem] max-sm:text-[0.8rem]">
                      {item.title ? item.title : item.original_name}
                    </h2>
                  </div>
                </div>
                <div className="absolute top-2 left-2">
                  <Genre genreId={item.genre_ids[0]} />
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default SwipeMovieList;
