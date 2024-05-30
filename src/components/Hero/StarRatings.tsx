import { FaStar } from "react-icons/fa6";

type prop = {
  rating: number;
  textColor?: string;
  borderColor?: string;
  hidden?: boolean;
};

const StarRatings = ({
  rating,
  textColor = "white",
  borderColor = "black",
  hidden = false,
}: prop) => {
  const voteAverage = Math.round(rating / 2);
  const stars = [];
  for (let i = 0; i < voteAverage; i++) {
    stars.push(<FaStar key={i} />);
  }
  return (
    <div className="flex items-center gap-2 max-lg:hidden">
      <div className="flex text-yellow-300 gap-1">{stars}</div>
      <div
        className={`h-[18px] w-[2px] bg-${borderColor} ${
          hidden ? "hidden" : ""
        }`}
      ></div>
      <div
        className={`text-${textColor} font-montserrat font-medium ${
          hidden ? "hidden" : ""
        }`}
      >
        {voteAverage} / 5
      </div>
    </div>
  );
};

export default StarRatings;
