"use client";

import { useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { LuArrowUpRight } from "react-icons/lu";

import Categories from "@/components/Trending/DropDown/Categories";
import ReleaseYear from "@/components/Trending/DropDown/ReleaseYear";
import VoteCount from "@/components/Trending/DropDown/VoteCount";
import MovieList from "@/components/Trending/MovieList";
import SearchBar from "@/components/Trending/SearchBar";

import MobileFilter from "@/components/Trending/MobileFilter";
import SelectedDiscover from "@/components/Trending/SelectedDiscover";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Trending = () => {
  const [selectedCategory, setSelectedCategory] = useState(Number);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedVote, setSelectedVote] = useState("");
  const [selectedDiscover, setSelectedDiscover] = useState("movie");

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <div className="padding-x max-container max-lg:px-0 pt-[1rem] max-sm:pt-[0rem] relative">
      <div className="z-10 flex items-center justify-between py-4 max-lg:mx-[3rem] max-sm:mx-[1.5rem] border-b-2 border-red-400">
        <div>
          <h1 className="flex items-center gap-2 text-black font-poppins text-[3.5rem] max-sm:text-[2rem] leading-none font-bold">
            Trending
            <LuArrowUpRight className="text-blue-600 max-sm:hidden" />
          </h1>
        </div>
        <div className="flex items-center gap-2 text-white bg-red-600 glow-button-trailer [@media(min-width:855px)]:hidden px-[8px] py-[5px] rounded-3xl font-medium">
          <p className="font-poppins">Discover</p>
          <FaArrowRightLong />
        </div>
        <div className="[@media(max-width:854px)]:hidden">
          <SearchBar />
        </div>
      </div>
      <div className="flex items-center justify-between max-lg:pl-[3rem] [@media(max-width:854px)]:hidden gap-y-3 p-[10px] pl-0">
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
      <div className="hidden [@media(max-width:854px)]:flex flex-col gap-3 max-lg:px-[3rem] max-sm:px-[1.5rem]">
        <SearchBar />
        <div className="flex items-center justify-between flex-row-reverse">
          <MobileFilter />
          <SelectedDiscover
            setSelectedDiscover={setSelectedDiscover}
            selectedDiscover={selectedDiscover}
          />
        </div>
      </div>
      <QueryClientProvider client={queryClient}>
        <MovieList
          selectedCategory={selectedCategory}
          selectedYear={selectedYear}
          selectedVote={selectedVote}
          selectedDiscover={selectedDiscover}
        />
      </QueryClientProvider>
      <div className="flex items-center justify-between gap-7 [@media(max-width:854px)]:hidden max-lg:pl-[3rem] pr-[2rem] py-6 w-full">
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
