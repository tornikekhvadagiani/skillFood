import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { UserData } from "../interfaces/user-interface";

interface IGetRequest {
  baseUrl: string;
  key: string;
  endPoint: string;
}

const useGetRequest = ({ baseUrl, key, endPoint }: IGetRequest) => {
  const [data, setData] = useState<UserData | UserData[] | any>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await axios.get(`${baseUrl}/${endPoint}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${key}`,
          },
        });
        setData(response.data.items);
      } catch (error) {
        console.error("GET Request Error:", error);
        toast.error("Something Went Wrong!");
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    if (baseUrl && key) {
      fetchData();
    }
  }, [baseUrl, key]);

  return { data, error, loading };
};

export default useGetRequest;
