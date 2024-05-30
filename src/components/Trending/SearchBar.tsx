"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { IoSearchCircleSharp } from "react-icons/io5";

import { SearchResults } from "../../../types";
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

    if (searchTerm.trim() !== "") {
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
  }, [searchTerm, isLoading]);

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

  return (
    <div
      className="flex flex-col relative w-full max-w-96"
      ref={InputSuggestionRef}
    >
      <div className="flex items-center justify-between [@media(max-width:854px)]:border-2 [@media(max-width:854px)]:border-black [@media(max-width:854px)]:rounded-3xl [@media(max-width:854px)]:mt-3">
        <div className="flex items-center gap-3 w-full">
          <IoSearchCircleSharp
            fontSize={45}
            color="red"
            cursor="pointer"
            onClick={handleInputFocus}
            className="[@media(max-width:854px)]:text-[2.5rem]"
          />
          <input
            placeholder="Search by name..."
            type="text"
            value={searchTerm}
            autoComplete="on"
            className="border-none bg-transparent w-full focus:outline-none font-montserrat text-[1.2rem] [@media(max-width:854px)]:text-[1rem] font-medium"
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={showResults}
            ref={inputFocusRef}
          />
        </div>
        <div className="flex items-center gap-3 mr-3">
          {isLoading ? (
            <div className="loader"></div>
          ) : (
            clearInput && (
              <IoMdClose
                className="text-[27px] cursor-pointer text-gray-400 transition-all"
                onClick={clearInputText}
              />
            )
          )}
        </div>
      </div>
      <div
        className={`max-h-[400px] overflow-y-auto absolute top-[4rem] [@media(max-width:854px)]:top-[3.7rem] z-30 bg-white w-full rounded drop-shadow-lg shadow-md suggestion ${
          showSuggestions && "suggestion-animated"
        } `}
      >
        {showSuggestions ? (
          <>
            {searchList.length > 0 && (
              <div className="flex flex-col w-full divide-y">
                {searchList.map((suggestion, index) => {
                  const getImageSource = () => {
                    switch (true) {
                      case !!suggestion.poster_path: {
                        return `https://image.tmdb.org/t/p/w500/${suggestion.poster_path}`;
                      }

                      case !!suggestion.profile_path: {
                        return `https://image.tmdb.org/t/p/w500${suggestion.profile_path}`;
                      }

                      default: {
                        return "/images/logo.png";
                      }
                    }
                  };
                  console.log(suggestion.profile_path);

                  return (
                    <div
                      key={suggestion.id}
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
                            // placeholder="blur"
                            src={getImageSource()}
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
                  );
                })}
              </div>
            )}
          </>
        ) : (
          ""
        )}
        {searchList.length === 0 && searchTerm.length > 0 && (
          <>
            <p className="p-3 font-poppins">
              No results found for your search.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
