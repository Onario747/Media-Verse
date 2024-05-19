import axios from "axios";
import { MovieApiResults } from "../../../../types";
import HeroSlideItem from "@/components/Hero/HeroSlideItem";

const fetchData = async () => {
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
    const modifiedResults = response.data.results
    return modifiedResults;
  } catch (error) {
    console.error("Error fetching data:", error);
    return (
      <div>No Connection!!</div>
    )
  }
};

const Hero = async () => {
  const heroData = await fetchData();
  const heroMovies = heroData as MovieApiResults[];
  return <HeroSlideItem heroMovies={heroMovies} />;
};

export default Hero;
