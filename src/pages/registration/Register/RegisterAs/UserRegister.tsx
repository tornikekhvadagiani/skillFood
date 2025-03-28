import React, { useState } from "react";
import StageForm from "./StageForm";

import { toast } from "react-toastify";
import { InputFieldProps } from "../../../../interfaces/input-field-interface";
import BlueButton from "../../../../components/BlueButton";
import usePostRequest from "../../../../hooks/usePostRequest";
import { useNavigate } from "react-router-dom";
import { useCloudinaryUpload } from "../../../../hooks/useCloudinaryUpload";
import Coordinates from "../../../../components/Coordinates";
import useUser from "../../../../store/useUser";

const UserRegister: React.FC = () => {
  const [stage, setStage] = useState<number>(1);
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const { VITE_API_URL, VITE_USERS_KEY } = import.meta.env;
  const navigate = useNavigate();
  const { coordinates, setCoordinates } = useUser();
  const [isMapOpen, setIsMapOpen] = useState<boolean>(false);
  const requiredFields: string[] = [
    "role",
    "firstname",
    "email",
    "personalId",
    "phone",
    "password",
    "vehicle",
  ];

  const handleInputChange = (name: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const nextStage = () => {
    if (stage === 3) return;
    const currentStageInputs = inputsStages[stage - 1];
    let hasError = false;
    const newErrors: { [key: string]: boolean } = {};

    currentStageInputs.forEach((input) => {
      if (requiredFields.includes(input.name) && !formData[input.name]) {
        newErrors[input.name] = true;
        hasError = true;
      }
    });

    setErrors(newErrors);
    if (!hasError) setStage((prev) => prev + 1);
  };

  const prevStage = () => {
    if (stage > 1) setStage((prev) => prev - 1);
  };

  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    let hasError = false;
    const newErrors: { [key: string]: boolean } = {};

    if (!coordinates.lat) {
      newErrors["lat"] = true;
      hasError = true;
      toast.error("Please fill in the lat field");
    }
    if (!formData["role"]) {
      newErrors["role"] = true;
      hasError = true;
      toast.error("Please fill in the role field");
    }
    if (!coordinates.lng) {
      newErrors["lng"] = true;
      hasError = true;
      toast.error("Please fill in the lng field");
    }

    setErrors(newErrors);
    let profilePictureUrl: string | null = null;

    if (formData.profilepicture) {
      profilePictureUrl = await useCloudinaryUpload(formData.profilepicture);
      if (!profilePictureUrl) {
        return;
      }
    }

    if (!hasError) {
      const requestData = {
        email: formData.email,
        firstname: formData.firstname,
        lastname: formData.lastname || null,
        lng: coordinates.lng,
        lat: coordinates.lat,
        password: formData.password,
        personalId: formData.personalId,
        phone: formData.phone,
        profilepicture: profilePictureUrl,
        role: formData.role,
        calledCouriers: [],
      };
      usePostRequest({
        baseUrl: VITE_API_URL,
        key: VITE_USERS_KEY,
        data: requestData,
        endPoint: "users",
        toastError: "Failed To Create Account",
        toastSuccess: "Account Created Succesfully",
        navigate: navigate,
        navigateUrl: "/registration/login/users",
      }).then(() =>
        setCoordinates({
          lat: null,
          lng: null,
        })
      );
    }
  };

  const inputsStages: InputFieldProps[][] = [
    [
      {
        name: "firstname",
        type: "text",
        placeholder: "Enter your first name",
        value: formData.firstname || "",
        onChange: (e) => handleInputChange("firstname", e.target.value),
      },
      {
        name: "lastname",
        type: "text",
        placeholder: "Enter your last name",
        value: formData.lastname || "",
        onChange: (e) => handleInputChange("lastname", e.target.value),
      },
      {
        name: "personalId",
        type: "text",
        placeholder: "Enter your Personal ID",
        value: formData.personalId || "",
        onChange: (e) => handleInputChange("personalId", e.target.value),
      },
    ],
    [
      {
        name: "phone",
        type: "number",
        placeholder: "Enter your phone number",
        value: formData.phone || "",
        onChange: (e) => handleInputChange("phone", e.target.value),
      },
      {
        name: "email",
        type: "text",
        placeholder: "Enter your Email",
        value: formData.email || "",
        onChange: (e) => handleInputChange("email", e.target.value),
      },
      {
        name: "password",
        type: "password",
        placeholder: "Enter your password",
        value: formData.password || "",
        onChange: (e) => handleInputChange("password", e.target.value),
      },
      {
        name: "profilepicture",
        type: "file",
        isFile: true,

        onChange: (e) =>
          handleInputChange("profilepicture", e.target.files?.[0] || null),
      },
    ],
    [
      {
        name: "role",
        type: "text",
        placeholder: "Enter role role",
        value: formData.role || "",
        onChange: (e) => handleInputChange("role", e.target.value),
      },
      {
        name: "lng",
        type: "text",
        placeholder: "Enter Address LNG",
        inputClassName: "pointer-events-none text-gray-500",

        value: !coordinates.lat
          ? "Use map pin to get correct LAT"
          : coordinates.lat,
        onChange: (e) => handleInputChange("lng", e.target.value),
      },

      {
        name: "lat",
        type: "text",
        placeholder: "Enter Adress LAT",
        inputClassName: "pointer-events-none text-gray-500",
        value: !coordinates.lng
          ? "Use map pin to get correct LNG"
          : coordinates.lng,
        onChange: (e) => handleInputChange("lat", e.target.value),
      },
      {
        name: "map",
        type: "button",
        value: "Enter Map",
        inputClassName: "cursor-pointer",
        onClick: () => {
          setIsMapOpen(true);
        },
      },
      {
        name: "submit",
        type: "submit",
        value: "Submit Registration",
        inputClassName: "bg-var-blue text-white cursor-pointer mt-10",
        onClick: () => handleSubmit,
      },
    ],
  ];

  return (
    <>
      {isMapOpen && (
        <div className="left-0 top-0 px-10 fixed flex flex-col gap-2 justify-center items-center bg-var-black-transparent w-full h-full">
          <Coordinates />
          <button
            className="hover:bg-blue-400 transition-all bg-var-blue px-6 py-2 text-white rounded-md cursor-pointer"
            onClick={() => setIsMapOpen(false)}
          >
            Submit Changes
          </button>
        </div>
      )}
      <StageForm
        inputs={inputsStages[stage - 1]}
        onSubmit={handleSubmit}
        errors={errors}
      />
      <div className="flex py-10 gap-10">
        <BlueButton active={stage === 1} onClick={prevStage} title="Previous" />
        <BlueButton active={stage === 3} onClick={nextStage} title="Next" />
      </div>
    </>
  );
};

export default UserRegister;
