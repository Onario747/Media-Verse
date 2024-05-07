"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { MovieApiResults } from "../../../types";
import HeroSlideItem from "../components/Hero/HeroSlideItem";

// type props = {
//   isPageLoading: boolean;
//   setIsPageLoading: (isPageLoading: boolean) => void
// };

const Hero = () => {
  const [heroMovies, setHeroMovies] = useState<MovieApiResults[]>([]);


  useEffect(() => {
    // setIsPageLoading(true)
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
    const fetchData = async () => {
      try {
        // setIsPageLoading(true);
        const response = await axios.request(options);
        const modifiedResults = response.data.results.splice(
          Math.floor(Math.random()),
          7
        );
        setHeroMovies(modifiedResults);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        // setIsPageLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section>
      <HeroSlideItem heroMovies={heroMovies} />
    </section>
  );
};

export default Hero;
