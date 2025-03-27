import { useEffect, useState } from "react";
import useGetRequest from "./useGetRequest";
import { useParams } from "react-router-dom";

export const useTransformedWorkingHours = (
  workingHours: Record<string, string[]>
) => {
  const { VITE_API_URL, VITE_DATES_KEY, VITE_COURIERS_KEY } = import.meta.env;
  const { uuid } = useParams();

  const { data } = useGetRequest({
    baseUrl: `${VITE_API_URL}`,
    key: VITE_DATES_KEY,
    endPoint: `dates`,
  });

  const { data: userData } = uuid
    ? useGetRequest({
        baseUrl: `${VITE_API_URL}`,
        key: VITE_COURIERS_KEY,
        endPoint: `couriers/${uuid}`,
      })
    : {};

  const [transformedData, setTransformedData] = useState<
    Record<string, Record<string, boolean>>
  >({});

  useEffect(() => {
    if (!data) return;

    const newTransformedData: Record<string, Record<string, boolean>> = {};

    Object.keys(workingHours).forEach((day) => {
      newTransformedData[day] = {};

      const allTimesOfDay = Array.from({ length: 48 }, (_, i) => {
        const hours = String(Math.floor(i / 2)).padStart(2, "0");
        const minutes = i % 2 === 0 ? "00" : "30";
        return `${hours}:${minutes}`;
      });

      allTimesOfDay.forEach((time) => {
        newTransformedData[day][time] = !workingHours[day].includes(time);
        if (workingHours[day].includes(time)) {
          newTransformedData[day][time] = false;
        } else {
          if (userData?.length && userData.dates[day].includes(time)) {
            newTransformedData[day][time] = true;
          } else {
            newTransformedData[day][time] = data[0][day][time];
          }
        }
      });
    });

    setTransformedData(newTransformedData);
  }, [data, workingHours]);

  return transformedData;
};
