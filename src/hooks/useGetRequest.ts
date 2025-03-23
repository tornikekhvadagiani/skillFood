import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

interface IGetRequest {
  baseUrl: string;
  key: string;
}

const useGetRequest = ({ baseUrl, key }: IGetRequest) => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(baseUrl, {
          headers: {
            Authorization: `Bearer ${key}`,
          },
        });
        setData(response.data.items);
      } catch (error) {
        console.error("GET Request Error:", error);
        toast.error("Something Went Wrong!");
        setError("Failed to fetch data.");
      }
    };

    fetchData();
  }, [baseUrl, key]);

  return { data, error };
};

export default useGetRequest;
