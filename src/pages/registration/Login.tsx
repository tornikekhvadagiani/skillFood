import React, { useRef, useState } from "react";
import { InputFieldProps } from "../../interfaces/input-field-interface";
import MyForm from "../../components/MyForm";

const Login: React.FC = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const inputs: InputFieldProps[] = [
    {
      name: "name",
      type: "text",
      placeholder: "Enter your name",
      inputRef: nameRef,
    },
    {
      name: "email",
      type: "text",
      placeholder: "Enter your email",
      inputRef: emailRef,
    },
  ];

  return (
    <div className="w-full h-full">
      <MyForm
        className="flex flex-col items-center justify-center w-full h-full px-10 gap-3  "
        inputs={inputs}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default Login;
