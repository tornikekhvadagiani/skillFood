import React from "react";
import CouriersList from "../userhome/CouriersList";
const CourierHome: React.FC = () => {
  return (
    <div>
      <h1 className="text-var-blue text-[40px] font-bold text-center py-20">
        Other Couriers
      </h1>
      <CouriersList />
    </div>
  );
};

export default CourierHome;
