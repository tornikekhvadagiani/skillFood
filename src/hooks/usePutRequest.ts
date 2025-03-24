import axios from "axios";
import { toast } from "react-toastify";

export interface IData {}

interface IPostReq {
  url: string;
  key: string;
  uuid: string;
  data: IData;
  navigate: (path: string) => void;
}

const usePutRequest = async ({ url, key, uuid, data }: IPostReq) => {
  try {
    const response = await axios.put(`${url}/${uuid}`, data, {
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      
    });

    return response.data;
  } catch (error) {
    console.error("PUT Request Error:", error);
    toast.error("Something Went Wrong!");
    throw error;
  }
};

export default usePutRequest;
