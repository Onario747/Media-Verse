import { FaStar } from "react-icons/fa6";

type prop = {
  rating: number;
};

const StarRatings = ({ rating }: prop) => {
  const voteAverage = Math.round(rating / 2);
  const stars = [];
  for (let i = 0; i < voteAverage; i++) {
    stars.push(<FaStar key={i} />);
  }
  return (
    <div className="flex items-center gap-2">
    <div className="flex text-yellow-300 gap-1">{stars}</div>
      <div className="h-[19px] w-[1.5px] bg-white"></div>
      <div className="text-white font-montserrat">{voteAverage} / 5</div>
    </div>
  )
};

export default StarRatings;
