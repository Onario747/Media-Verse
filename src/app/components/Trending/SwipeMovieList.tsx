import Image from "next/image";

// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "../../swiper-styles.css";

import { MovieApiResults } from "../../../../types";
import StarRatings from "../Hero/StarRatings";
import Genre from "./Genre";

type props = {
  movieList: MovieApiResults[];
  isLoading: boolean;
};

const SwipeMovieList = ({ movieList, isLoading }: props) => {
  const extractYearFromDate = (dateString: any) => {
    if (dateString) {
      const date = new Date(dateString);
      return date.getFullYear();
    } else {
      return "N/A";
    }
  };
  return (
    <div className="hidden max-sm:hidden max-lg:block mt-9 max-lg:pl-[3rem]">
      <Swiper slidesPerView={"auto"} spaceBetween={10} grabCursor={true}>
        {movieList.map((item, index) => (
          <SwiperSlide key={index}>
            {isLoading ? (
              <div className="relative">
                <div className="animate-pulse bg-gradient-to-l from-[#cacaca] to-[#cacaca] rounded h-[250px] w-[210px]"></div>
                <div className=" animate-pulse absolute bottom-2 w-full ml-4 flex flex-col gap-2">
                  <div className="bg-gradient-to-l from-[#888888] to-[#bebebe] h-2 w-[50%] rounded"></div>
                  <div className="bg-gradient-to-l from-[#bebebe] to-[#888888] h-2 w-[70%] rounded"></div>
                  <div className="bg-gradient-to-l from-[#bebebe] to-[#888888] h-2 w-[80%] rounded"></div>
                </div>
              </div>
            ) : (
              <div className="w-fit relative flex gap-9" key={index}>
                <div className="rounded-lg relative h-[310px] w-[210px] sm:w-[180px]">
                  <Image
                    src={`${
                      item.poster_path
                        ? `https://image.tmdb.org/t/p/w500/${item.poster_path}`
                        : "/images/brokenImage.png"
                    } `}
                    alt={item.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
                <div className="px-3 py-2 w-full overlay absolute bottom-0 rounded-b-lg">
                  <div className="flex items-center justify-between">
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
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwipeMovieList;
