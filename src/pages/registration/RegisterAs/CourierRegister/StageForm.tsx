import React from "react";
import { InputFieldProps } from "../../../../interfaces/input-field-interface";
import MyForm from "../../../../components/MyForm";

interface StageFormProps {
  stage: number;
  inputs: InputFieldProps[];
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const StageForm: React.FC<StageFormProps> = ({ stage, inputs, onSubmit }) => {
  return (
    <MyForm
      className="flex flex-col items-center justify-center w-full px-10 gap-3"
      inputs={inputs}
      onSubmit={onSubmit}
    />
  );
};

export default StageForm;
