import { useState, useEffect } from "react";
import useGetRequest, { IGetRequest } from "../hooks/useGetRequest";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { useParams } from "react-router-dom";
import useUser from "../store/useUser";

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
  updateWorkingHours,
}: {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  onTimeSelectionChange: (selectedTimes: Record<string, string[]>) => void;
  updateWorkingHours?: (data: any) => void;
}) => {
  const { uuid, role } = useParams();
  const [selectedTimes, setSelectedTimes] = useState<
    Record<string, Set<string>>
  >({});

  const { user } = useUser();
  const { VITE_API_URL, VITE_DATES_KEY, VITE_COURIERS_KEY } = import.meta.env;

  const { data: userData, loading: userLoading } = useGetRequest(
    uuid && role === "couriers"
      ? {
          baseUrl: `${VITE_API_URL}`,
          endPoint: `couriers/${uuid}`,
          key: VITE_COURIERS_KEY,
        }
      : ({} as IGetRequest)
  );

  const correctData = uuid ? userData : user;

  const { data, loading } = useGetRequest(
    uuid && role === "couriers"
      ? {
          baseUrl: `${VITE_API_URL}`,
          endPoint: "dates",
          key: VITE_DATES_KEY,
        }
      : ({} as IGetRequest)
  );

  const currentUsersDates = correctData?.dates || {};

  useEffect(() => {
    if (correctData?.dates) {
      const initialTimes: Record<string, Set<string>> = {};
      Object.entries(correctData.dates).forEach(([day, times]) => {
        initialTimes[day] = new Set(Array.isArray(times) ? times : []);
      });
      setSelectedTimes(initialTimes);
    }
  }, [correctData]);

  const toggleTimeSelection = (day: string, time: string) => {
    if (!data[0][day][time] && !currentUsersDates[day].includes(time)) {
      toast.error("This Time is Already Taken!!");
      return;
    }

    setSelectedTimes((prev) => {
      const updatedTimes = { ...prev };
      updatedTimes[day] = updatedTimes[day]
        ? new Set(updatedTimes[day])
        : new Set();

      if (updatedTimes[day].has(time)) {
        updatedTimes[day].delete(time);
      } else {
        updatedTimes[day].add(time);
      }

      const formattedTimes: Record<string, string[]> = {};
      Object.keys(updatedTimes).forEach((day) => {
        formattedTimes[day] = Array.from(updatedTimes[day]);
      });

      onTimeSelectionChange(formattedTimes);

      return updatedTimes;
    });
  };

  // Handle confirm action
  const handleConfirm = () => {
    const formattedTimes: Record<string, string[]> = {};
    Object.keys(selectedTimes).forEach((day) => {
      formattedTimes[day] = Array.from(selectedTimes[day]);
    });

    onTimeSelectionChange(formattedTimes);
    updateWorkingHours?.(formattedTimes);
    setIsOpen(false);
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-var-black-transparent">
        <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] h-auto text-center">
          <h2 className="font-semibold mb-4 text-2xl text-var-blue">
            Select Working Hours
          </h2>
          {loading || (userLoading && uuid) ? (
            <ClipLoader
              color={"royalblue"}
              loading
              size={150}
              className="mx-auto"
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-20 max-h-[700px] overflow-y-auto p-4">
              {daysOfWeek.map((day) => (
                <div key={day}>
                  <h3 className="font-semibold mb-2 text-2xl">{day}</h3>
                  <div className="grid grid-cols-4 gap-2">
                    {data?.[0]?.[day] &&
                      Object.keys(data[0][day]).map((time: string) => {
                        const isSelected = selectedTimes[day]?.has(time);
                        return (
                          <button
                            key={`${day}-${time}`}
                            className={`p-2 text-xs border rounded-md cursor-pointer font-bold bg-transparent
                              ${
                                !data[0][day][time]
                                  ? "cursor-not-allowed bg-gray-500 text-gray-300"
                                  : ""
                              }
                              ${
                                isSelected
                                  ? "!bg-blue-500 text-white"
                                  : "bg-gray-200"
                              }
                              ${
                                Array.isArray(currentUsersDates?.[day]) &&
                                currentUsersDates[day].includes(time) &&
                                !selectedTimes[day]?.has(time)
                                  ? "!bg-transparent !text-black !border"
                                  : ""
                              }
                            `}
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
