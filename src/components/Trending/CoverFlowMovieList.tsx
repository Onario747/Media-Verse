import { MovieApiResults } from "../../../types";
import { useQuery } from "@tanstack/react-query";

type props = {
  selectedCategory: Number;
  selectedVote: string;
  selectedYear: string;
  selectedDiscover: string
};

import "../../app/swiper-styles.css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import "../../app/swiper-cover-flow.css";

import Image from "next/image";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import Genre from "./Genre";
import axios from "axios";

const CoverFlowMovieList = ({ selectedCategory, selectedVote, selectedYear, selectedDiscover }: props) => {

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
  
  const { data: movieList, isLoading, error } = useQuery<MovieApiResults[]>({
    queryKey: ["trending", selectedCategory, selectedDiscover, selectedVote, selectedYear],
    queryFn: () => fetchTrending()
  })

  if (isLoading) {
    return <div>Loading sm...</div>
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
    <div className="max-sm:flex mt-7 hidden">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        spaceBetween={25}
        // loop={true}
        slidesPerView={"auto"}
        initialSlide={3}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 200,
          modifier: 1,
        }}
        pagination={{ el: ".swiper-pagination", clickable: true }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="swiper_container"
      >
        {movieList && movieList.map((item, index) => (
          <SwiperSlide key={index}>
            {({ isActive }) => (
              <>
                  <div
                    className={`w-fit relative flex gap-9 shadow-lg shadow-blue-400 rounded-xl ${
                      isActive && "shadow-xl shadow-red-500"
                    }`}
                    key={index}
                  >
                    <div className="rounded-lg relative h-[310px] w-[210px]">
                      <Image
                        src={`${
                          item.poster_path
                            ? `https://image.tmdb.org/t/p/w500/${item.poster_path}`
                            : "/images/brokenImage.png"
                        } `}
                        alt={item.title}
                        fill={true}
                        placeholder={`data:image/svg+xml;base64,${toBase64(
                          shimmer(210, 180)
                        )}`}
                        objectFit="cover"
                        className="rounded-lg"
                      />
                    </div>
                    <div className="px-3 py-2 w-full overlay absolute bottom-0 rounded-b-lg">
                      <div className="flex items-center justify-between">
                        {/* <StarRatings
                    rating={item.vote_average}
                    textColor="white"
                    borderColor="white"
                  /> */}
                        <p className="font-semibold text-blue-400 font-montserrat">
                          {extractYearFromDate(
                            item.release_date
                              ? item.release_date
                              : item.first_air_date
                          )}
                        </p>
                        <p className="font-montserrat text-red-500 uppercase font-semibold">
                          {item.original_language}
                        </p>
                      </div>
                      <div className="flex items-end justify-between">
                        <h2 className="font-poppins text-white font-bold text-[1.1rem]">
                          {item.title ? item.title : item.original_name}
                        </h2>
                      </div>
                    </div>
                    <div className="absolute top-2 left-2">
                      <Genre genreId={item.genre_ids[0]} />
                    </div>
                  </div>
              </>
            )}
          </SwiperSlide>
        ))}
        <div className="slider-controler">
          <div className="swiper-pagination"></div>
        </div>
      </Swiper>
    </div>
  );
};

export default CoverFlowMovieList;