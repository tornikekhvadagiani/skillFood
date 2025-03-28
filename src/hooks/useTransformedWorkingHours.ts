import { useEffect, useState } from "react";
import useGetRequest, { IGetRequest } from "./useGetRequest";
import { useParams } from "react-router-dom";
import useUser from "../store/useUser";

export const useTransformedWorkingHours = (
  workingHours: Record<string, string[]>
) => {
  const { VITE_API_URL, VITE_DATES_KEY, VITE_COURIERS_KEY } = import.meta.env;
  const { uuid, role } = useParams();
  const { user } = useUser();

  const { data: datesData } = useGetRequest(
    uuid && role === "couriers"
      ? {
          baseUrl: `${VITE_API_URL}`,
          key: VITE_DATES_KEY,
          endPoint: `dates`,
        }
      : ({} as IGetRequest)
  );

  const { data: userData } = useGetRequest(
    uuid && role === "couriers"
      ? {
          baseUrl: `${VITE_API_URL}`,
          key: VITE_COURIERS_KEY,
          endPoint: `couriers`,
          uuid: uuid,
        }
      : ({} as IGetRequest)
  );
  const [transformedData, setTransformedData] = useState<
    Record<string, Record<string, boolean>>
  >({});

  useEffect(() => {
    if (!datesData) return;

    const newTransformedData: Record<string, Record<string, boolean>> = {};

    Object.keys(workingHours).forEach((day) => {
      newTransformedData[day] = {};

      const allTimesOfDay = Array.from({ length: 48 }, (_, i) => {
        const hours = String(Math.floor(i / 2)).padStart(2, "0");
        const minutes = i % 2 === 0 ? "00" : "30";
        return `${hours}:${minutes}`;
      });

      allTimesOfDay.forEach((time) => {
        const isWorkingHour = workingHours[day].includes(time);

        if (isWorkingHour) {
          newTransformedData[day][time] = false;
        } else {
          if (!user?.dates && userData?.dates[day]?.includes(time)) {
            newTransformedData[day][time] = true;
          } else {
            if (user?.dates && user?.dates[day]?.includes(time)) {
              newTransformedData[day][time] = true;
            } else {
              newTransformedData[day][time] = datesData[0][day][time];
            }
          }
        }
      });
    });

    setTransformedData(newTransformedData);
  }, [datesData, workingHours, userData]);

  return transformedData;
};
