import React from "react";
import { InputFieldProps } from "../../../../interfaces/input-field-interface";
import MyForm from "../../../../components/MyForm";

interface StageFormProps {
  inputs: InputFieldProps[];
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  errors: { [key: string]: boolean };
}

const StageForm: React.FC<StageFormProps> = ({ inputs, onSubmit, errors }) => {
  return (
    <MyForm
      className="flex flex-col items-center justify-center w-full px-10 gap-3"
      inputs={inputs}
      onSubmit={onSubmit}
      errors={errors}
    />
  );
};

export default StageForm;
