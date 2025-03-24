import React, { useEffect, useState } from "react";
import Router from "./Router";
import { ToastContainer } from "react-toastify";
import useGetRequest from "./hooks/useGetRequest";
import usePostRequest from "./hooks/usePostRequest";

const App: React.FC = () => {
  // const { VITE_API_URL, VITE_USERS_KEY } = import.meta.env;
  const [data, setData] = useState<any>();

  useEffect(() => {
    // useGetRequest({
    //   baseUrl: `${VITE_API_URL}/task`,
    //   key: VITE_USERS_KEY,
    //   setState: setData,
    // });
  
  }, []);
  console.log(data?.items);

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Router />;
    </>
  );
};

export default App;
