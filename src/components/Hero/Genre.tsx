type prop = {
  genreId: number[];
};

import { BsDot } from "react-icons/bs";
const Genre = ({ genreId }: prop) => {
  const genreMap: { [key: number]: string } = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    90: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Science Fiction",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western",
  };
  return (
    <div className="flex gap-1 flex-wrap">
      {genreId.map((genreId, index, array) => (
        <div key={genreId}>
          <div className="text-white flex items-center font-montserrat max-lg:text-[0.9rem] font-bold">
            {genreMap[genreId] || "Unknown Genre"}
            {index !== array.length - 1 && <BsDot className="text-red-600" />}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Genre;
