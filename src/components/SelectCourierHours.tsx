import { useState } from "react";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
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

  const timeOptions = Array.from({ length: 48 }, (_, i) => {
    const hours = String(Math.floor(i / 2)).padStart(2, "0");
    const minutes = i % 2 === 0 ? "00" : "30";
    return `${hours}:${minutes}`;
  });

  const toggleTimeSelection = (day: string, time: string) => {
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
  const handleConfirm = () => {
    const formattedTimes: Record<string, string[]> = {};

    Object.keys(selectedTimes).forEach((day) => {
      formattedTimes[day] = Array.from(selectedTimes[day] || new Set());
    });

    onTimeSelectionChange(formattedTimes);
    setIsOpen(false);
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] h-auto text-center">
          <h2 className="text-lg font-semibold mb-4">Select Working Hours</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-20 max-h-[700px] overflow-y-auto p-4">
            {daysOfWeek.map((day) => (
              <div key={day}>
                <h3 className="font-semibold mb-2 text-2xl">{day}</h3>
                <div className="grid grid-cols-4 gap-2">
                  {timeOptions.map((time) => (
                    <button
                      key={`${day}-${time}`}
                      className={`p-2 text-xs border rounded-md cursor-pointer ${
                        selectedTimes[day]?.has(time)
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200"
                      }`}
                      onClick={() => toggleTimeSelection(day, time)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end mt-4">
            <button
              className="px-4 py-2 bg-gray-300 rounded mr-2"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded"
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
