type props = {
  setSelectedDiscover: (option: any) => void;
  selectedDiscover: string;
};

const SelectedDiscover = ({ setSelectedDiscover, selectedDiscover }: props) => {
  const handleDiscovery = (option: string) => {
    setSelectedDiscover(option);
  };
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center w-fit gap-4 border-2 border-black rounded max-[854px]:rounded-xl py-[3px] px-[5px]">
        <p
          className={`font-montserrat font-semibold cursor-pointer ${
            selectedDiscover === "movie"
              ? "bg-red-600 text-white rounded max-[854px]:rounded-xl font-bold p-1 transition-colors duration-[0.6s]"
              : "text-gray-500"
          }`}
          onClick={() => handleDiscovery("movie")}
        >
          Movies
        </p>
        <p
          className={`font-montserrat font-semibold cursor-pointer ${
            selectedDiscover === "tv"
              ? "bg-red-600 text-white rounded max-[854px]:rounded-xl font-bold p-1 transition-colors duration-[0.6s]"
              : "text-gray-400"
          }`}
          onClick={() => handleDiscovery("tv")}
        >
          TV shows
        </p>
      </div>
    </div>
  );
};

export default SelectedDiscover;
