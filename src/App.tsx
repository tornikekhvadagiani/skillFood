import React from "react";
import Router from "./Router";
import { ToastContainer } from "react-toastify";


const App: React.FC = () => {
  // const { VITE_API_URL, VITE_USERS_KEY } = import.meta.env;

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
