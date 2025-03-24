import axios from "axios";
import { toast } from "react-toastify";

interface ICreateUsersData {
  email: string;
  firstname: string;
  lastname: string | null;
  lat: string;
  lng: string;
  password: string;
  personalId: string;
  phone: string;
  profilepicture: File | null;
  role: string;
}
interface ICreateCouriers {
  email: string;
  firstname: string;
  lastname: string | null;
  dates: any;
  password: string;
  personalId: string;
  phone: string;
  profilepicture: File | null;
  role: string;
}

interface IPostReq {
  baseUrl: string;
  key: string;
  data: ICreateUsersData | ICreateCouriers;
  endPoint: string;
  toastSuccess: string;
  toastError: string;
  navigate: (navigateTo: string) => void;
}

const usePostRequest = async ({
  baseUrl,
  key,
  data,
  endPoint,
  toastSuccess,
  toastError,
  navigate,
}: IPostReq) => {
  try {
    const response = await axios.post(`${baseUrl}/${endPoint}`, [data], {
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
    });
    navigate("/");
    toast.success(toastSuccess);
    return response.data;
  } catch (error) {
    console.error("PUT Request Error:", error);
    toast.error(toastError);
    throw error;
  }
};

export default usePostRequest;
