"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { IoSearchCircleSharp } from "react-icons/io5";

import { SearchResults } from "../../../../types";
import StarRatings from "../Hero/StarRatings";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuggestionLoading, setIsSuggestionLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [clearInput, setClearInput] = useState(false);
  const [searchList, setSearchList] = useState<SearchResults[]>([]);
  // const textInput = useRef<HTMLInputElement>(null);

  const InputSuggestionRef = useRef<HTMLDivElement>(null);
  const inputFocusRef = useRef<HTMLInputElement>(null);

  const [suggestionHovered, setSuggestionHovered] = useState(null);

  const suggestionHover = (index: any) => {
    setSuggestionHovered(index);
  };

  const suggestionHoverOut = () => {
    setSuggestionHovered(null);
  };

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/search/multi",
      params: {
        query: searchTerm,
        include_adult: "false",
        language: "en-US",
        page: "1",
      },
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjM2FhNjQzNTYyZDQyYTc0NTZlNTE4ZmZhMjNmZWE1ZCIsInN1YiI6IjY1ZjIwODhhOTkyNTljMDE4NjVlZjcwYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kpR4HyoUoLEcfCj2DqlIu4hK0dwSvVaEkj0F6dzw-sA",
      },
    };
    const searchMovies = async () => {
      setIsSuggestionLoading(true);
      setIsLoading(true);
      try {
        const response = await axios.request(options);
        const searchResults = response.data.results;
        setSearchList(searchResults);
      } catch (error) {
        console.error("Error fetching results:", error);
      } finally {
        setIsSuggestionLoading(false);
        setIsLoading(false);
      }
    };

    if (searchTerm.trim() !== "" && searchTerm.length > 1) {
      searchMovies();
      setShowSuggestions(true);
    } else {
      setSearchList([]);
    }
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        InputSuggestionRef.current &&
        !InputSuggestionRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    if (searchTerm.length === 0) {
      setClearInput(false);
    }

    if (searchTerm.length > 1) {
      setClearInput(true);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [searchTerm]);

  const handleInputFocus = () => {
    if (inputFocusRef.current) {
      inputFocusRef.current.focus();
    }
  };

  const showResults = () => {
    if (!showSuggestions && searchList.length > 0 && searchTerm.length > 1) {
      setShowSuggestions(true);
    }
  };

  const clearInputText = () => {
    setSearchTerm("");
  };

  const extractYearFromDate = (dateString: any) => {
    if (dateString) {
      const date = new Date(dateString);
      return date.getFullYear();
    } else {
      return "N/A";
    }
  };

  // const scrollUp = () => {
  //   if (InputSuggestionRef.current) {
  //     window.scrollTo({
  //       top: InputSuggestionRef.current.offsetTop,
  //       behavior: "smooth",
  //     });
  //   }
  // };

  // useEffect(() => {
  //   const handleResize = () => {
  //     alert("Viewport resized")
  //   }

  //   window.addEventListener("resize", handleResize);

  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   }
  // }, [])

  return (
    <div
      className="flex flex-col relative w-full max-w-96"
      ref={InputSuggestionRef}
    >
      <div className="flex items-center justify-between max-[854px]:border-2 max-[854px]:border-black max-[854px]:rounded-xl max-[854px]:mt-3">
        <div className="flex items-center gap-3 w-full">
          <IoSearchCircleSharp
            fontSize={45}
            color="red"
            cursor="pointer"
            onClick={handleInputFocus}
            className="max-[834px]:text-[2.22rem]"
          />
          <input
            placeholder="Search by name..."
            type="text"
            value={searchTerm}
            autoComplete="on"
            className="border-none bg-transparent w-full focus:outline-none font-montserrat text-[1.2rem] max-[834px]:text-[1rem] font-medium"
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={showResults}
            ref={inputFocusRef}
          />
        </div>
        <div className="flex items-center gap-3 mr-2">
          {clearInput && (
            <IoMdClose
              className="text-[27px] cursor-pointer text-gray-400"
              onClick={clearInputText}
            />
          )}
          {isLoading && <div className="loader mr-3"></div>}
        </div>
      </div>
      <div
        className={`max-h-[400px] overflow-y-auto absolute top-[4rem] max-[854px]:top-[3.7rem] z-30 bg-white w-full rounded drop-shadow-lg shadow-md suggestion ${
          showSuggestions && "suggestion-animated"
        } `}
      >
        {showSuggestions ? (
          <>
            {searchList.length > 0 && (
              <div className="flex flex-col w-full divide-y">
                {searchList.map((suggestion, index) => (
                  <div
                    key={index}
                    onMouseOver={() => suggestionHover(index)}
                    onMouseLeave={suggestionHoverOut}
                    className={`flex items-start gap-2 p-3 cursor-pointer ${
                      suggestionHovered === index &&
                      "bg-gray-900 bg-opacity-10 transition-all"
                    }`}
                  >
                    {isSuggestionLoading ? (
                      <div className="flex gap-2 w-full">
                        <div className="animate-pulse bg-gradient-to-l from-[#cacaca] to-gray-400 rounded h-[60px] w-[60px]"></div>
                        <div className="flex flex-col gap-2 w-full animate-pulse">
                          <div className="bg-gradient-to-l from-[#cacaca] to-gray-400 h-2 w-[30%] rounded"></div>
                          <div className="bg-gradient-to-l from-[#cacaca] to-gray-400 h-2 w-[60%] rounded"></div>
                          <div className="bg-gradient-to-l from-[#cacaca] to-gray-400 h-2 w-[50%] rounded"></div>
                        </div>
                      </div>
                    ) : (
                      <>
                        <Image
                          loading="lazy"
                          placeholder="blur"
                          blurDataURL="data:image/webp;base64,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"
                          src={`${
                            suggestion.poster_path
                              ? `https://image.tmdb.org/t/p/w500/${suggestion.poster_path}`
                              : "/images/logo.png"
                          } `}
                          width={60}
                          height={60}
                          alt={suggestion.original_title}
                          className="rounded object-cover max-h-full"
                        />
                        <div className="w-full">
                          <div className="flex items-center justify-between">
                            <p className="text-[11px] font-montserrat font-semibold text-blue-500">
                              {suggestion.media_type.toUpperCase()}
                            </p>
                            <StarRatings
                              rating={suggestion.vote_average}
                              hidden={true}
                              borderColor="black"
                              textColor="black"
                            />
                          </div>
                          <p
                            className={`font-poppins font-semibold line-clamp-3 ${
                              suggestionHovered === index &&
                              "underline underline-offset-2 transition-all"
                            }`}
                          >
                            {suggestion.original_title ||
                              suggestion.original_name}
                          </p>
                          <p className="font-montserrat text-red-500 font-semibold">
                            {extractYearFromDate(
                              suggestion.release_date ||
                                suggestion.first_air_date
                            )}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          ""
        )}
        {searchList.length === 0 && searchTerm.length > 0 && (
          <>
            <p>No results found for your search.</p>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
