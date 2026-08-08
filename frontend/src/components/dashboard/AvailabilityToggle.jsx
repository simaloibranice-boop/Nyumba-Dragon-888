import { useState } from "react";
import { CircleCheck, CircleOff } from "lucide-react";


export default function AvailabilityToggle() {

  const [available, setAvailable] = useState(true);


  const toggleAvailability = () => {

    setAvailable((current) => !current);

  };


  return (

    <button
      onClick={toggleAvailability}
      className={`
        flex
        items-center
        gap-3
        px-5
        py-3
        rounded-xl
        font-bold
        transition-all
        duration-200
        border

        ${
          available
            ? "bg-green-600 text-white border-green-600 hover:bg-green-700"
            : "bg-white/10 text-white border-white/20 hover:bg-white/20"
        }
      `}
    >

      {available ? (
        <CircleCheck size={19} />
      ) : (
        <CircleOff size={19} />
      )}


      {available ? "Available for Jobs" : "Currently Offline"}

    </button>

  );

}
