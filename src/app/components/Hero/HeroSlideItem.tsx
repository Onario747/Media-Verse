import { MovieApiResults } from "../../../../types";
type HeroSlideProps = {
  heroMovies: MovieApiResults[];
};

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

import Image from "next/image";
import Link from "next/link";
// import { FaPlay } from "react-icons/fa";
import { MdMoreHoriz } from "react-icons/md";
import { Autoplay } from "swiper/modules";
import Genre from "./Genre";
import StarRatings from "./StarRatings";

const HeroSlideItem = ({ heroMovies }: HeroSlideProps) => {
  return (
    <div className="h-full w-full relative">
      <Swiper
        modules={[Autoplay]}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 5000 }}
      >
        {heroMovies.map((poster, index) => (
          <SwiperSlide key={index}>
            {({ isActive }) => (
              <div className="h-full w-full">
                <div
                  className="banner-overlay bg-cover bg-center bg-no-repeat h-[50rem] max-md:h-[35rem]"
                  style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original/${poster.backdrop_path})`,
                  }}
                >
                  <div className="w-full absolute padding-x  max-container top-[8.5rem]">
                    <div className="flex gap-[5rem] w-full">
                      <Image
                        src={`https://image.tmdb.org/t/p/w500/${poster.poster_path}`}
                        alt="movie poster"
                        width={400}
                        height={600}
                        className="poster-image  max-lg:hidden"
                      />
                      <div className="flex flex-col gap-4 max-sm:gap-2">
                        <div className="flex gap-5">
                          <p className="text-blue-400 font-montserrat font-semibold">
                            {poster.release_date}
                          </p>
                          <p className="uppercase font-montserrat font-semibold text-red-500">
                            {poster.original_language}
                          </p>
                        </div>
                        <h1 className="text-white font-poppins font-bold text-[5rem] w-full max-lg:text-[3rem] max-md:text-[2rem] m-0 leading-none">
                          {poster.title}
                        </h1>
                        <StarRatings rating={poster.vote_average} />
                        <Genre genreId={poster.genre_ids} />
                        <p
                          className="text-white font-poppins text-[1.1rem] max-md:text-[1rem] max-sm:text-[0.8rem] font-medium
                        "
                        >
                          {poster.overview}
                        </p>
                        <div className="flex gap-4 mt-[3rem] max-md:mt-5">
                          <Link href="/">
                            <button className="glow-button-trailer bg-red-600 text-white font-bold font-montserrat max-sm:text-[15px] p-4 max-md:p-3 rounded-full flex items-center gap-2 max-md:gap-1">
                              <Image
                                src="/icons/play.svg"
                                alt="play"
                                height={20}
                                width={20}
                              />
                              Watch Trailer
                            </button>
                          </Link>
                          <Link href="/">
                            <button className="glow-button text-white max-sm:text-[15px] font-bold font-montserrat p-4 max-md:p-3 rounded-full flex items-center gap-2">
                              <MdMoreHoriz className="text-[20px]" />
                              Read More
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlideItem;
