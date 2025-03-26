import axios from "axios";
import { toast } from "react-toastify";
import {
  ICreateAdminData,
  ICreateCouriers,
  ICreateUsersData,
} from "../interfaces/registration-interfaces";

interface IPostReq {
  baseUrl: string;
  key: string;
  data: ICreateUsersData | ICreateCouriers | ICreateAdminData | any;
  endPoint: string;
  toastSuccess?: string;
  toastError?: string;
  navigate?: (navigateTo: string) => void;
  navigateUrl?: string;
}

const usePostRequest = async ({
  baseUrl,
  key,
  data,
  endPoint,
  toastSuccess,
  toastError,
  navigate,
  navigateUrl,
}: IPostReq) => {
  try {
    const response = await axios.post(`${baseUrl}/${endPoint}`, [data], {
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
    });
    navigate && navigateUrl && navigate(navigateUrl);
    toast.success(toastSuccess);
    return response.data;
  } catch (error) {
    console.error("PUT Request Error:", error);
    toast.error(toastError);
    throw error;
  }
};

export default usePostRequest;
