import React, { useState } from "react";
import useGetRequest from "../../hooks/useGetRequest";
import Card from "./Card";
import FetchButtons from "./FetchButtons";
import { ClipLoader } from "react-spinners";

const CardList: React.FC = () => {
  const { VITE_API_URL, VITE_USERS_KEY, VITE_COURIERS_KEY } = import.meta.env;
  const [activeIndex, setActiveIndex] = useState<number>(1);

  const { data, error, loading } = useGetRequest({
    baseUrl: `${VITE_API_URL}`,
    key: activeIndex === 1 ? VITE_USERS_KEY : VITE_COURIERS_KEY,
    endPoint: activeIndex === 1 ? "users" : "couriers",
  });
  if (loading)
    return (
      <div className="flex flex-col justify-center w-full h-full absolute  items-center ">
        <ClipLoader
          color={"royalblue"}
          loading={loading}
          size={250}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  if (error) return <p>{error}</p>;

  return (
    <div>
      <FetchButtons activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
      {Array.isArray(data) &&
        data.map((e) => {
          console.log(e);

          return (
            <Card
              key={e._uuid}
              email={e.email}
              firstname={e.firstname}
              lastname={e.lastname}
              lat={e.lat || ""}
              lng={e.lng || ""}
              password={e.password}
              personalId={e.personalId}
              profilepicture={e.profilepicture}
              phone={e.phone}
              vehicle={e.vehicle}
            />
          );
        })}
    </div>
  );
};

export default CardList;
