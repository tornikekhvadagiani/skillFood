export interface InputFieldProps {
  name: string;
  type: string;
  placeholder?: string;
  inputRef?: React.RefObject<HTMLInputElement | null>;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
