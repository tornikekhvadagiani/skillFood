import React from "react";

interface AccountDetailProps {
  detail: string | undefined;
  detailTitle: string;
  type: "text" | "file";
  isEditing: boolean;
  onChange: (newValue: string | File) => void;
}

const AccountDetail: React.FC<AccountDetailProps> = ({
  detail,
  detailTitle,
  type,
  isEditing,
  onChange,
}) => {
  return (
    detail &&
    type && (
      <div className="w-full border-b border-deadBlack flex justify-between items-center py-1 sm2:flex-col">
        <p className="font-bold text-mainBlack tracking-wider">
          {detailTitle}:
        </p>
        {isEditing ? (
          type === "file" ? (
            <input
              type="file"
              className="font-bold tracking-wider border px-2"
              onChange={(e) => e.target.files && onChange(e.target.files[0])}
            />
          ) : (
            <input
              type={type}
              className="font-bold tracking-wider border px-2"
              defaultValue={detail}
              onChange={(e) => onChange(e.target.value)}
            />
          )
        ) : (
          <p className="border border-transparent">{detail}</p>
        )}
      </div>
    )
  );
};

export default AccountDetail;
