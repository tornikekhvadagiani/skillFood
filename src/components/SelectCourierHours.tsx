import { useState } from "react";
import useGetRequest from "../hooks/useGetRequest";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

const daysOfWeek = [
  "Friday",
  "Monday",
  "Saturday",
  "Sunday",
  "Thursday",
  "Tuesday",
  "Wednesday",
];

const SelectCourierHours = ({
  isOpen,
  setIsOpen,
  onTimeSelectionChange,
}: {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  onTimeSelectionChange: (selectedTimes: Record<string, string[]>) => void;
}) => {
  const [selectedTimes, setSelectedTimes] = useState<
    Record<string, Set<string>>
  >({});
  const { VITE_API_URL, VITE_DATES_KEY } = import.meta.env;

  const { data, loading } = useGetRequest({
    baseUrl: `${VITE_API_URL}`,
    endPoint: "dates",
    key: VITE_DATES_KEY,
  });

  const toggleTimeSelection = (day: string, time: string) => {
    if (!data[0][day][time]) {
      toast.error("This Time is Already Taken!!");
      return;
    }
    setSelectedTimes((prev) => {
      const updatedTimes = { ...prev };
      if (!updatedTimes[day]) {
        updatedTimes[day] = new Set([time]);
      } else {
        const newSet = new Set(updatedTimes[day]);
        newSet.has(time) ? newSet.delete(time) : newSet.add(time);
        updatedTimes[day] = newSet;
      }
      return updatedTimes;
    });
  };

  const handleConfirm = async () => {
    const formattedTimes: Record<string, string[]> = {};

    Object.keys(selectedTimes).forEach((day) => {
      formattedTimes[day] = Array.from(selectedTimes[day] || new Set());
    });

    onTimeSelectionChange(formattedTimes);
    setIsOpen(false);
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-var-black-transparent ">
        <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] h-auto text-center">
          <h2 className=" font-semibold mb-4 text-2xl text-var-blue">
            Select Working Hours
          </h2>
          {loading ? (
            <ClipLoader
              color={"royalblue"}
              loading={loading}
              size={150}
              aria-label="Loading Spinner"
              data-testid="loader"
              className="mx-auto "
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-20 max-h-[700px] overflow-y-auto p-4">
              {daysOfWeek.map((day) => (
                <div key={day}>
                  <h3 className="font-semibold mb-2 text-2xl">{day}</h3>
                  <div className="grid grid-cols-4 gap-2   ">
                    {data &&
                      Object.keys(data[0][day]).map((time: string) => {
                        const isSelected = selectedTimes[day]?.has(time);
                        return (
                          <button
                            key={`${day}-${time}`}
                            className={` p-2 text-xs border rounded-md cursor-pointer font-bold bg-transparent
                              ${
                                !data[0][day][time] &&
                                "!cursor-not-allowed !bg-gray-500 text-gray-300"
                              } 
                              ${
                                isSelected
                                  ? "!bg-blue-500 text-white"
                                  : "bg-gray-200"
                              }`} // Apply blue or gray
                            onClick={() => toggleTimeSelection(day, time)}
                          >
                            {time}
                          </button>
                        );
                      })}
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="flex justify-end mt-4">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
              onClick={handleConfirm}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default SelectCourierHours;
