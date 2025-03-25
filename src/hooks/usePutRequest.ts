import axios from "axios";
import { toast } from "react-toastify";

interface IPutReq {
  baseUrl: string;
  key: string;
  data: any;
  endPoint: string;
  toastSuccess?: string;
  toastError?: string;
  navigate?: (navigateTo: string) => void;
  navigateUrl?: string;
}

const usePutRequest = async ({
  baseUrl,
  key,
  data,
  endPoint,
  toastSuccess,
  toastError,
  navigate,
  navigateUrl,
}: IPutReq) => {
  try {
    const response = await axios.put(`${baseUrl}/${endPoint}`, data, {
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

export default usePutRequest;
