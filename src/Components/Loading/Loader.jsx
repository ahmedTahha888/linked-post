import { FaSpinner } from "react-icons/fa";

export default function Loader() {
  return (
    <div className="absolute z-50 inset-0 flex items-center  justify-center bg-[rgba(0,0,0,0.7)]">
      <p className="bg-white rounded-3xl p-3 font-semibold">
        <FaSpinner className="animate-spin inline me-2 text-2xl text-blue-500" />
      
        Refreshing Your Timeline...
      </p>
    </div>
  );
}
