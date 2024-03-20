import { motion } from "framer-motion";
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
import { FaPlay } from "react-icons/fa";
import { MdMoreHoriz } from "react-icons/md";
import { Autoplay } from "swiper/modules";
import Genre from "./Genre";
import StarRatings from "./StarRatings";

const HeroSlideItem = ({ heroMovies }: HeroSlideProps) => {
  const imageAnimate = {
    inactive: {
      scale: 0,
    },
    active: {
      scale: 1,
      transition: { duration: 0.5 },
    },
  };
  const opacityAnimate = {
    inactive: {
      opacity: 0,
    },
    active: {
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };
  const textAnimate = {
    inactive: {
      y: -50,
    },
    active: {
      y: 0,
      transition: { duration: 0.5 },
    },
  };
  const buttonAnimate = {
    inactive: {
      y: 50,
    },
    active: {
      y: 0,
      transition: { duration: 0.5 },
    },
  };
  return (
    <div>
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
              <div>
                <div
                  className="banner-overlay bg-cover bg-no-repeat h-[50rem] max-lg:h-[]"
                  style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original/${poster.backdrop_path})`,
                  }}
                >
                  <div className="w-full absolute padding-x max-container top-[8.5rem]">
                    <div className="flex gap-[5rem] w-full">
                      <motion.img
                        variants={imageAnimate}
                        initial="inactive"
                        animate={isActive ? "active" : "inactive"}
                        src={`https://image.tmdb.org/t/p/w500/${poster.poster_path}`}
                        alt="movie poster"
                        width={400}
                        height={600}
                        className="poster-image  max-lg:hidden"
                      />
                      <div className="flex flex-col gap-4">
                        <div className="flex gap-5">
                          <motion.p
                            className="text-blue-400 font-montserrat font-semibold"
                            variants={opacityAnimate}
                            initial="inactive"
                            animate={isActive ? "active" : "inactive"}
                          >
                            {poster.release_date}
                          </motion.p>
                          <p className="uppercase font-montserrat font-semibold text-red-500">
                            {poster.original_language}
                          </p>
                        </div>
                        <motion.h1
                          className="text-white font-poppins font-bold text-[5rem] w-full max-lg:text-[3rem] max-md:text-[2rem] m-0 leading-none"
                          variants={textAnimate}
                          initial="inactive"
                          animate={isActive ? "active" : "inactive"}
                        >
                          {poster.title}
                        </motion.h1>
                        <motion.div
                          variants={opacityAnimate}
                          initial="inactive"
                          animate={isActive ? "active" : "inactive"}
                        >
                          <StarRatings rating={poster.vote_average} />
                        </motion.div>
                        <motion.div
                          variants={opacityAnimate}
                          initial="inactive"
                          animate={isActive ? "active" : "inactive"}
                        >
                          <Genre genreId={poster.genre_ids} />
                        </motion.div>
                        <motion.p
                          className="text-white font-poppins text-[1.1rem] max-md:text-[1rem] font-medium
                        "
                          variants={textAnimate}
                          initial="inactive"
                          animate={isActive ? "active" : "inactive"}
                        >
                          {poster.overview}
                        </motion.p>
                        <div>
                          <div className="flex gap-4 mt-[3rem] max-md:flex-col">
                            <motion.div
                              variants={buttonAnimate}
                              initial="inactive"
                              animate={isActive ? "active" : "inactive"}
                            >
                              <Link href="/">
                                <button className="glow-button-trailer bg-red-600 text-white font-bold font-montserrat py-4 px-4 rounded-full flex items-center gap-2">
                                  <FaPlay className="text-white" />
                                  Watch Trailer
                                </button>
                              </Link>
                            </motion.div>
                            <motion.div
                              variants={buttonAnimate}
                              initial="inactive"
                              animate={isActive ? "active" : "inactive"}
                            >
                              <Link href="/">
                                <button className="glow-button text-white font-bold font-montserrat py-4 px-4 rounded-full flex items-center gap-2">
                                  <MdMoreHoriz className="text-[20px]" />
                                  Read More
                                </button>
                              </Link>
                            </motion.div>
                          </div>
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
