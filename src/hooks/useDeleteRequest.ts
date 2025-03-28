import axios from "axios";
import { toast } from "react-toastify";

interface IDeleteReq {
  baseUrl: string;
  key: string;
  endPoint: string;
  toastSuccess?: string;
  toastError?: string;
  navigate?: (navigateTo: string) => void;
  navigateUrl?: string;
  uuid?: string;
}

const useDeleteRequest = async ({
  baseUrl,
  key,
  endPoint,
  uuid,
  toastSuccess,
  toastError,
  navigate,
  navigateUrl,
}: IDeleteReq) => {
  try {
    const url = uuid
      ? `${baseUrl}/${endPoint}/${uuid}`
      : `${baseUrl}/${endPoint}`;
    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
    });

    navigate && navigateUrl && navigate(navigateUrl);
    toastSuccess && toast.success(toastSuccess);
    return response.data;
  } catch (error) {
    console.error("DELETE Request Error:", error);
    toastError && toast.error(toastError);
    throw error;
  }
};

export default useDeleteRequest;
