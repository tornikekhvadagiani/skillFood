import React from "react";
import useGetRequest, { IGetRequest } from "../../../hooks/useGetRequest";
import CourierCard from "./CourierCard";
import {
  IUserApiDefaultInfo,
  UserData,
} from "../../../interfaces/user-interface";
import { ClipLoader } from "react-spinners";
import usePutRequest from "../../../hooks/usePutRequest";
import useUser from "../../../store/useUser";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const CouriersList: React.FC = () => {
  const { VITE_API_URL, VITE_COURIERS_KEY, VITE_USERS_KEY } = import.meta.env;
  const { user, setUser } = useUser();
  const { uuid } = useParams();

  const { data: couriersData, loading: couriersLoading } = useGetRequest({
    baseUrl: `${VITE_API_URL}`,
    key: VITE_COURIERS_KEY,
    endPoint: `couriers`,
  });

  const { data: editUserData } = useGetRequest(
    uuid
      ? {
          baseUrl: `${VITE_API_URL}`,
          key: VITE_USERS_KEY,
          endPoint: `users/${uuid}`,
        }
      : ({} as IGetRequest)
  );

  const correctData = uuid ? editUserData : user;

  const callCourier = async (singleCourier: UserData & IUserApiDefaultInfo) => {
    if (!singleCourier.isAviable) {
      toast.error("This Courier is Taken!!");
      return;
    }
    await usePutRequest({
      baseUrl: VITE_API_URL,
      key: VITE_USERS_KEY,
      data: {
        calledCouriers: [...(correctData?.calledCouriers || []), singleCourier],
      },
      endPoint: `users/${correctData?._uuid}`,
      toastError: "Failed Call Courier",
      toastSuccess: "Courier Called Succesfully",
    }).then((e) => {
      if (!uuid) {
        setUser(e);
        localStorage.setItem("loginedAccount", JSON.stringify(e));
      } else {
        window.location.reload();
      }
    });

    await usePutRequest({
      baseUrl: VITE_API_URL,
      key: VITE_COURIERS_KEY,
      data: {
        userCalled: [...(singleCourier?.userCalled || []), correctData?._uuid],
        isAviable: false,
      },
      endPoint: `couriers/${singleCourier?._uuid}`,
      toastError: "Failed To Update Courier info (aviable)",
      toastSuccess: "succes updated",
    });
  };

  const removeCourier = async (
    singleCourier: UserData & IUserApiDefaultInfo
  ) => {
    const updatedCalledCouriers = correctData?.calledCouriers.filter(
      (e: any) => e._uuid !== singleCourier._uuid
    );

    await usePutRequest({
      baseUrl: VITE_API_URL,
      key: VITE_USERS_KEY,
      data: {
        calledCouriers: updatedCalledCouriers,
      },
      endPoint: `users/${correctData?._uuid}`,
      toastError: "Failed To Remove Courier",
      toastSuccess: "Courier Removed Successfully",
    }).then((e) => {
      if (!uuid) {
        setUser(e);
        localStorage.setItem("loginedAccount", JSON.stringify(e));
      }
      usePutRequest({
        baseUrl: VITE_API_URL,
        key: VITE_COURIERS_KEY,
        data: {
          isAviable: true,
        },
        endPoint: `couriers/${singleCourier?._uuid}`,
        toastError: "Failed To Update Courier info (aviable)",
        toastSuccess: "succes updated",
      }).then(() => {
        if (uuid) {
          window.location.reload();
        }
      });
    });
  };

  const isAlreadyCalled = (singleCourier: UserData & IUserApiDefaultInfo) =>
    correctData?.calledCouriers?.find(
      (e: any) => e._uuid === singleCourier._uuid
    );

  const filteredCouriers = uuid ? correctData?.calledCouriers : couriersData;

  return (
    <div className="py-10 gap-10 flex justify-center items-center flex-wrap">
      {couriersLoading ? (
        <ClipLoader
          color={"royalblue"}
          loading={couriersLoading}
          size={350}
          aria-label="Loading Spinner"
          data-testid="loader"
          className="mx-auto mt-20 "
        />
      ) : (
        filteredCouriers?.map((courier: UserData & IUserApiDefaultInfo) => (
          <CourierCard
            key={courier._uuid}
            removeCourier={() => removeCourier(courier)}
            isAlreadyCalled={isAlreadyCalled(courier)}
            courier={courier}
            callCourier={() => callCourier(courier)}
            userCalled={courier.userCalled ? courier.userCalled : []}
          />
        ))
      )}
    </div>
  );
};

export default CouriersList;
