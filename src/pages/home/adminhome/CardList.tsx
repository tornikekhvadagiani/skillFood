import React, { useState, useEffect } from "react";
import useGetRequest from "../../../hooks/useGetRequest";
import Card from "./Card";
import FetchButtons from "./FetchButtons";
import { ClipLoader } from "react-spinners";
import useDeleteRequest from "../../../hooks/useDeleteRequest";

const CardList: React.FC = () => {
  const { VITE_API_URL, VITE_USERS_KEY, VITE_COURIERS_KEY } = import.meta.env;
  const [activeIndex, setActiveIndex] = useState<number>(1);
  const [users, setUsers] = useState<any[]>([]); // State to store users

  const { data, error, loading } = useGetRequest({
    baseUrl: `${VITE_API_URL}`,
    key: activeIndex === 1 ? VITE_USERS_KEY : VITE_COURIERS_KEY,
    endPoint: activeIndex === 1 ? "users" : "couriers",
  });

  useEffect(() => {
    if (Array.isArray(data)) {
      setUsers(data);
    }
  }, [data]);

  const deleteUser = async (uuid: string) => {
    try {
      await useDeleteRequest({
        baseUrl: VITE_API_URL,
        key: activeIndex === 1 ? VITE_USERS_KEY : VITE_COURIERS_KEY,
        endPoint: activeIndex === 1 ? "users" : "couriers",
        uuid,
        toastSuccess: "User deleted successfully!",
        toastError: "Failed to delete user.",
      });

      setUsers((prevUsers) => prevUsers.filter((user) => user._uuid !== uuid));
    } catch (error) {
      console.error(error);
    }
  };

  if (loading)
    return (
      <div className="flex flex-col justify-center w-full h-full absolute items-center ">
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
      {Array.isArray(users) &&
        users.map((e) => {
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
              uuid={e._uuid}
              onDelete={() => deleteUser(e._uuid)}
            />
          );
        })}
    </div>
  );
};

export default CardList;
