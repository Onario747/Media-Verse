"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { BsFillGridFill } from "react-icons/bs";
import { FaArrowTrendUp } from "react-icons/fa6";
import { ImMenu } from "react-icons/im";
import Categories from "../components/Trending/DropDown/Categories";
import ReleaseYear from "../components/Trending/DropDown/ReleaseYear";
import VoteCount from "../components/Trending/DropDown/VoteCount";
import MovieList from "../components/Trending/MovieList";
import SearchBar from "../components/Trending/SearchBar";
import { MovieApiResults } from "../../../types";

const Trending = () => {
  const [movieList, setMovieList] = useState<MovieApiResults[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(Number);

  
  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/discover/movie",
      params: {
        include_adult: "false",
        include_video: "false",
        language: "en-US",
        page: "1",
        sort_by: "popularity.desc",
        with_genres: "",
        year: "",
      },
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjM2FhNjQzNTYyZDQyYTc0NTZlNTE4ZmZhMjNmZWE1ZCIsInN1YiI6IjY1ZjIwODhhOTkyNTljMDE4NjVlZjcwYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kpR4HyoUoLEcfCj2DqlIu4hK0dwSvVaEkj0F6dzw-sA",
      },
    };

    const fetchTrending = async () => {
      try {
        const response = await axios.request(options);
        const modifiedResults = response.data.results.splice(
          Math.floor(Math.random()),
          10
        );
        setMovieList(modifiedResults);
      } catch (error) {
        console.error("Error fetching Trending:", error);
      }
    };

    fetchTrending();
  }, []);
  return (
    <div className="padding-x max-container py-[2rem]">
      <div className="z-10 flex items-end justify-between border-b-2 border-red-400 pb-4">
        <div>
          {/* <span className="font-montserrat font-medium text-red-400">
            Let&apos;s Explore
          </span> */}
          <h1 className="flex items-center gap-2 text-black font-poppins text-[3.5rem] leading-none font-bold">
            Trending
            <FaArrowTrendUp className="text-blue-600" />
          </h1>
        </div>
        <SearchBar />
      </div>
      <div className="flex items-center justify-between p-[10px]">
        <div className="flex items-center gap-[20px]">
          <Categories
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <ReleaseYear />
          <VoteCount />
        </div>
        {/* <div className="flex items-center gap-2">
          <ImMenu className="text-[28px] cursor-pointer" />
          <BsFillGridFill className="text-[25px] cursor-pointer" />
        </div> */}
      </div>
      <div>
        <MovieList movieList={movieList} />
      </div>
    </div>
  );
};

export default Trending;
