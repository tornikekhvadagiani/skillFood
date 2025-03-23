import React, { useEffect, useState } from "react";
import MyForm from "../../../components/MyForm";

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});

  const handleInputChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const submitLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const loginInputs = [
    {
      name: "email",
      type: "text",
      placeholder: "Enter Email",
      value: formData.email || "",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        handleInputChange("email", e.target.value),
    },
    {
      name: "password",
      type: "password",
      placeholder: "Enter Password",
      value: formData.password || "",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        handleInputChange("password", e.target.value),
    },
    {
      name: "submit",
      type: "submit",
      value: "Submit Registration",
      inputClassName: "bg-var-blue text-white cursor-pointer ",
      onClick: () => submitLogin,
    },
  ];
  return (
    <MyForm
      className="flex flex-col items-center justify-center w-full px-10 gap-3"
      inputs={loginInputs}
      onSubmit={submitLogin}
      errors={errors}
    />
  );
};

export default LoginForm;
