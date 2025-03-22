import React, { useState } from "react";
import StageForm from "./StageForm";
import BlueButton from "../../../../components/BlueButton";
import { InputFieldProps } from "../../../../interfaces/input-field-interface";

const CourierRegister: React.FC = () => {
  const [stage, setStage] = useState<number>(1);
  const [formData, setFormData] = useState<{ [key: string]: string }>({});

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const inputsStages: InputFieldProps[][] = [
    [
      {
        name: "role",
        type: "text",
        placeholder: "Enter your Role (courier)",
        value: formData.role || "",
        onChange: (e) => handleInputChange("role", e.target.value),
      },
      {
        name: "name",
        type: "text",
        placeholder: "Enter your first name",
        value: formData.name || "",
        onChange: (e) => handleInputChange("name", e.target.value),
      },
      {
        name: "email",
        type: "text",
        placeholder: "Enter your last name",
        value: formData.email || "",
        onChange: (e) => handleInputChange("email", e.target.value),
      },
    ],
    [
      {
        name: "personalId",
        type: "text",
        placeholder: "Enter your Personal ID",
        value: formData.personalId || "",
        onChange: (e) => handleInputChange("personalId", e.target.value),
      },
      {
        name: "phone",
        type: "number",
        placeholder: "Enter your phone number",
        value: formData.phone || "",
        onChange: (e) => handleInputChange("phone", e.target.value),
      },
      {
        name: "password",
        type: "password",
        placeholder: "Enter your password",
        value: formData.password || "",
        onChange: (e) => handleInputChange("password", e.target.value),
      },
    ],
    [
      {
        name: "role",
        type: "text",
        placeholder: "Enter your Role (courier)",
        value: formData.role || "",
        onChange: (e) => handleInputChange("role", e.target.value),
      },
      {
        name: "name",
        type: "text",
        placeholder: "Enter your name",
        value: formData.name || "",
        onChange: (e) => handleInputChange("name", e.target.value),
      },
      {
        name: "email",
        type: "text",
        placeholder: "Enter your email",
        value: formData.email || "",
        onChange: (e) => handleInputChange("email", e.target.value),
      },
    ],
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  const nextStage = () => {
    if (stage < 3) setStage((prev) => prev + 1);
  };

  const prevStage = () => {
    if (stage > 1) setStage((prev) => prev - 1);
  };

  return (
    <>
      <StageForm
        stage={stage}
        inputs={inputsStages[stage - 1]}
        onSubmit={handleSubmit}
      />
      <div className="flex py-10 gap-10">
        <BlueButton active={stage > 1} onClick={prevStage} title="Previous" />
        <BlueButton active={stage < 3} onClick={nextStage} title="Next" />
      </div>
    </>
  );
};

export default CourierRegister;
