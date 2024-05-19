type props = {
  genreId: number
}


const Genre = ({genreId}: props) => {
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
    <div className="bg-yellow-400 text-black font-montserrat text-[11px] max-sm:text-[0.7rem] font-semibold p-[2px] rounded-md">
      {genreMap[genreId] || "unknown"}
    </div>
  );
}

export default Genre
