import React, { useState } from "react";
import StageForm from "./StageForm";

import { toast } from "react-toastify";
import { InputFieldProps } from "../../../../interfaces/input-field-interface";
import BlueButton from "../../../../components/BlueButton";
import usePostRequest from "../../../../hooks/usePostRequest";
import { useNavigate } from "react-router-dom";
import { useCloudinaryUpload } from "../../../../hooks/useCloudinaryUpload";

const AdminRegister: React.FC = () => {
  const [stage, setStage] = useState<number>(1);
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});

  const { VITE_API_URL, VITE_ADMINS_KEY } = import.meta.env;

  const navigate = useNavigate();

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
    if (!formData["role"]) {
      newErrors["role"] = true;
      hasError = true;
      toast.error("Please fill in the role field");
    }
    let profilePictureUrl: string | null = null;

    if (formData.profilepicture) {
      profilePictureUrl = await useCloudinaryUpload(formData.profilepicture);
      if (!profilePictureUrl) {
        return;
      }
    }
    setErrors(newErrors);
    if (!hasError) {
      const requestData = {
        firstname: formData.firstname,
        lastname: formData.lastname || null,
        email: formData.email,
        personalId: formData.personalId,
        phone: formData.phone,
        password: formData.password,
        profilepicture: profilePictureUrl,
        role: formData.role,
      };
      usePostRequest({
        baseUrl: VITE_API_URL,
        key: VITE_ADMINS_KEY,
        data: requestData,
        endPoint: "admins",
        toastError: "Failed To Create Admin Account",
        toastSuccess: "Admin Account Created Successfully",
        navigate: navigate,
        navigateUrl: "/registration/login/admins",
      });
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

export default AdminRegister;
