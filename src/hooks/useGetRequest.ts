import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { UserData } from "../interfaces/user-interface";

export interface IGetRequest {
  baseUrl: string;
  key: string;
  endPoint: string;
  uuid?: string;
  loading?: boolean;
}

const useGetRequest = ({ baseUrl, key, endPoint, uuid }: IGetRequest) => {
  const [data, setData] = useState<UserData | UserData[] | any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const url = `${baseUrl}/${endPoint}${uuid ? `/${uuid}` : ""}`;
        const response = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${key}`,
          },
        });

        if (response.data.items !== undefined) {
          setData(response.data.items);
        } else {
          setData(response.data);
        }
      } catch (err) {
        console.error("GET Request Error:", err);
        toast.error("Something Went Wrong!");
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    if (baseUrl && key && endPoint) {
      fetchData();
    }
  }, [baseUrl, key, endPoint, uuid]);

  return { data, error, loading };
};

export default useGetRequest;
