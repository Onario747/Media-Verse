"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { LuArrowUpRight } from "react-icons/lu";

import { MovieApiResults } from "../../../types";
import Categories from "../components/Trending/DropDown/Categories";
import ReleaseYear from "../components/Trending/DropDown/ReleaseYear";
import VoteCount from "../components/Trending/DropDown/VoteCount";
import MovieList from "../components/Trending/MovieList";
import SearchBar from "../components/Trending/SearchBar";
import SwipeMovieList from "../components/Trending/SwipeMovieList";

import CoverFlowMovieList from "../components/Trending/CoverFlowMovieList";
import {
  default as MobileDropdown,
  default as MobileFilter,
} from "../components/Trending/MobileFilter.jsx";
import SelectedDiscover from "../components/Trending/SelectedDiscover";

const Trending = () => {
  const [movieList, setMovieList] = useState<MovieApiResults[]>([]);
  const [toggleGenreMenu, setToggleGenreMenu] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(Number);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedVote, setSelectedVote] = useState("");
  const [selectedDiscover, setSelectedDiscover] = useState("movie");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
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

    const fetchTrending = async () => {
      setIsLoading(true);
      try {
        const response = await axios.request(options);
        const modifiedResults = response.data.results.splice(
          Math.floor(Math.random()),
          10
        );
        setMovieList(modifiedResults);
        // setIsLoading(false);
      } catch (error) {
        console.error("Error fetching Trending:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrending();
  }, [selectedCategory, selectedYear, selectedVote, selectedDiscover]);
  return (
    <div className="padding-x max-container max-lg:px-0 pt-[1rem] relative">
      <div className="z-10 flex items-center justify-between py-4 max-lg:mx-[3rem] max-sm:mx-[1.5rem] border-b-2 border-red-400">
        <div>
          {/* <span className="font-montserrat font-medium max-sm:text-[13px] text-red-400">
            Let&apos;s Explore
          </span> */}
          <h1 className="flex items-center gap-2 text-black font-poppins text-[3.5rem] max-sm:text-[2rem] leading-none font-bold">
            Trending
            <LuArrowUpRight className="text-blue-600 max-sm:hidden" />
          </h1>
        </div>
        <div className="flex items-center gap-2 text-white bg-red-600 glow-button-trailer lg:hidden px-[8px] py-[5px] rounded-3xl font-medium">
          <p className="font-poppins">Discover</p>
          <FaArrowRightLong />
        </div>
        <div className="max-[854px]:hidden">
          <SearchBar />
        </div>
      </div>
      {/* Toggle Mobile Menu for Mobile */}
      {toggleGenreMenu && (
        <div className="flex justify-end p-[10px] bg-cyan-500 absolute z-10 right-0 w-[50%] h-1/2">
          <div className="flex">
            <MobileDropdown />
          </div>
        </div>
      )}
      <div className="flex items-center justify-between max-[995px]:grid max-[995px]:grid-cols-1 max-lg:pl-[3rem] max-[854px]:hidden gap-y-3 p-[10px] pl-0">
        <div className="flex items-center gap-[20px] z-20">
          <Categories
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <ReleaseYear setSelectedYear={setSelectedYear} />
          <VoteCount setSelectedVote={setSelectedVote} />
        </div>
        <SelectedDiscover
          selectedDiscover={selectedDiscover}
          setSelectedDiscover={setSelectedDiscover}
        />
      </div>
      <div className="hidden max-[854px]:flex flex-col gap-3 max-lg:px-[3rem] max-sm:px-[1.5rem]">
        <SearchBar />
        <div className="flex items-center justify-between flex-row-reverse">
          <MobileFilter />
          <SelectedDiscover
            setSelectedDiscover={setSelectedDiscover}
            selectedDiscover={selectedDiscover}
          />
        </div>
      </div>
      <div>
        <MovieList movieList={movieList} isLoading={isLoading} />
        <SwipeMovieList movieList={movieList} isLoading={isLoading} />
        <CoverFlowMovieList movieList={movieList} isLoading={isLoading} />
      </div>

      <div className="flex items-center justify-between gap-7 max-lg:hidden max-lg:pl-[3rem] pr-[2rem] py-6 w-full">
        <div className="h-[2px] w-full bg-red-600 rounded-full"></div>
        <div className="bg-red-600 glow-button-trailer flex items-center rounded-3xl whitespace-nowrap cursor-pointer">
          <p className="text-white px-[8px] py-[5px] font-medium font-poppins">
            Discover more
          </p>
        </div>
      </div>
    </div>
  );
};

export default Trending;
