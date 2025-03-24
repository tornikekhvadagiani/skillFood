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
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await axios.get(baseUrl, {
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
