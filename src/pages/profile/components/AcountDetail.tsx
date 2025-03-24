import React from "react";
interface IDetail {
  detailTitle: string;
  detail: string | undefined;
}
const AcountDetail: React.FC<IDetail> = ({ detailTitle, detail }) => {
  return (
    <div className="w-full border-b border-deadBlack flex justify-between items-center py-1 sm2:flex-col">
      <p className="font-bold text-mainBlack tracking-wider">{detailTitle}:</p>
      <p className=" font-bold text-subBlack tracking-wider">{detail}</p>
    </div>
  );
};

export default AcountDetail;
