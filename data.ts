export const categoriesGenre = [
  { value: 28, label: "Action" },
  { value: 12, label: "Adventure" },
  { value: 16, label: "Animation" },
  { value: 35, label: "Comedy" },
  { value: 80, label: "Crime" },
  { value: 99, label: "Documentary" },
  { value: 18, label: "Drama" },
  { value: 10751, label: "Family" },
  { value: 14, label: "Fantasy" },
  { value: 36, label: "History" },
  { value: 27, label: "Horror" },
  { value: 10402, label: "Music" },
  { value: 9648, label: "Mystery" },
  { value: 10749, label: "Romance" },
  { value: 878, label: "Science-Fiction" },
  { value: 10770, label: "TV Movie" },
  { value: 53, label: "Thriller" },
  { value: 10752, label: "War" },
  { value: 37, label: "Western" },
];

export const releaseYears = [
  { value: 2024, label: "2023" },
  { value: 2024, label: "2024" },
  { value: 2024, label: "2022" },
  { value: 2024, label: "2020" },
  { value: 2024, label: "2021" },
  { value: 2024, label: "2019" },
  { value: 2024, label: "2018" },
];

export const voteCount = [
  { value: 1.0, label: "1.0" },
  { value: 2.0, label: "2.0" },
  { value: 3.0, label: "3.0" },
  { value: 4.0, label: "4.0" },
  { value: 5.0, label: "5.0" },
  { value: 6.0, label: "6.0" },
  { value: 7.0, label: "7.0" },
];

export const TrendingMobileDropDownData = [
  {
    id: "category",
    name: "Category",
    options: categoriesGenre.map((item) => ({
      value: item.label,
      id: item.value,
    })),
  },
  {
    id: "releaseYear",
    name: "Release Year",
    options: releaseYears.map((item) => ({
      value: item.label,
      id: item.value,
    })),
  },
  {
    id: "voteCount",
    name: "Vote Count",
    options: voteCount.map((item) => ({
      value: item.label,
      id: item.value,
    })),
  },
];
// export const TrendingMobileDropDownData = [
//   {
//     id: "category",
//     name: "Category",
//     options: [
//       {
//         id: categoriesGenre.map((id) => id.label),
//         value: categoriesGenre.map((item) => item.value),
//       },
//     ],
//   },
// ];

// console.log(TrendingMobileDropDownData);
