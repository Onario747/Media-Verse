import Image from "next/image";
import { MovieApiResults } from "../../../../types";

type prop = {
  movieList: MovieApiResults[];
};

const MovieList = ({ movieList }: prop) => {
  return (
    <div className="grid grid-cols-5 gap-y-4 items-center mt-9">
      {movieList.map((item, index) => (
        <div key={index}>
          <Image
            src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
            alt={item.title}
            height={410}
            width={210}
            className="rounded-lg"
          />
        </div>
      ))}
    </div>
  );
};

export default MovieList;
