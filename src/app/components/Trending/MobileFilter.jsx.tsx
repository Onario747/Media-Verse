import { useState } from "react";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { LuSettings2 } from "react-icons/lu";
import { TrendingMobileDropDownData } from "../../../../data";

type OptionsState = {
  [key: number]: boolean;
};

const MobileFilter = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [showOptions, setShowOptions] = useState<OptionsState>({});

  const toggleFilter = () => {
    setShowFilters(!showFilters);
  };

  const toggleOptions = (index: number) => {
    setShowOptions({
      ...showOptions,
      [index]: !showOptions[index],
    });
  };

  return (
    <div className="flex flex-col items-end z-20">
      <div
        className="flex items-center gap-2 border-2 border-black rounded-xl font-semibold font-montserrat text-white bg-blue-500 p-[6px]"
        onClick={toggleFilter}
      >
        Filter
        <LuSettings2 />
      </div>
      <div className={`relative filter ${showFilters && "filter-animated"}`}>
        {showFilters && (
          <div
            className={`absolute top-1 right-0 bg-white shadow-xl drop-shadow-md flex flex-col gap-2 items-end w-[20rem] p-2 rounded-xl`}
          >
            {TrendingMobileDropDownData.map((filter, index) => (
              <div key={index} className="w-full">
                <div className="border-b border-black p-1 flex items-center gap-2 justify-between">
                  <h1 className="">{filter.name}</h1>
                  <IoIosArrowDropdownCircle
                    className="w-[20px] h-[20px]"
                    onClick={() => toggleOptions(index)}
                  />
                </div>
                <div>
                  {showOptions[index] && (
                    <div className="h-[200px] overflow-y-scroll p-2">
                      {TrendingMobileDropDownData[0].options.map(
                        (item, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <input type="checkbox" name="" id="" />
                            <p>{item.value}</p>
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileFilter;
