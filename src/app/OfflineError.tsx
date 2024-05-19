import { TiWarning } from "react-icons/ti";
const OfflineError = () => {
  return (
    <div className="fixed bottom-8 flex items-center justify-center mx-auto z-50 w-full">
      <div className="bg-red-700 p-4 text-white font-poppins rounded-xl md:flex items-center gap-2 font-semibold hidden">
        <TiWarning className="text-[1.2rem]" />
        Oops... You&apos;re currently not connected to the internet
      </div>
      <div className="bg-red-700 p-4 text-white font-poppins rounded-xl items-center gap-2 font-semibold max-md:flex hidden">
        <TiWarning className="text-[1.2rem]" />
        Oops... You&apos;re offline
      </div>
    </div>
  );
};

export default OfflineError;
