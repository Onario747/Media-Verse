export type MovieApiResults = {
  title: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  overview: string;
  original_language: string;
  vote_average: number;
  original_name: string;
  first_air_date: string;
  genre_ids: number[];
};

export type SearchResults = {
  original_language: string;
  original_title: string;
  original_name: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  first_air_date: string
  media_type: string;
};
