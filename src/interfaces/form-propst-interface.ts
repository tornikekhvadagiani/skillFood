import { InputFieldProps } from "./input-field-interface";

export interface FormProps {
  inputs: InputFieldProps[];
  stateValue?: string;
  className?: string;
  inputClassName?: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
