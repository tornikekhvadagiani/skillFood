import React from "react";
import { FormProps } from "../interfaces/form-props-interface";

const MyForm: React.FC<FormProps> = ({
  inputs,
  onSubmit,
  className,
  errors,
}) => {
  return (
    <form onSubmit={onSubmit} className={className}>
      {inputs.map((input) => (
        <React.Fragment key={input.name}>
          {input.isFile && (
            <label htmlFor={input.name}>Upload Profile Picture</label>
          )}
          <input
            id={input.name}
            type={input.type}
            name={input.name}
            placeholder={input.placeholder}
            ref={input.inputRef ?? undefined}
            value={input.inputRef ? undefined : input.value}
            onChange={input.inputRef ? undefined : input.onChange}
            onClick={
              typeof input.onClick === "function"
                ? (e) => input.onClick?.(e as any)
                : undefined
            }
            className={`w-full p-2 border rounded focus:ring-2 outline-none 
        ${errors[input.name] ? "border-red-400" : "border-gray-300"} 
        focus:ring-var-blue ${input.inputClassName}`}
          />
        </React.Fragment>
      ))}

      {/* <button
        type="submit"
        className="w-full bg-var-blue text-white py-2 rounded-md cursor-pointer hover:bg-blue-600 transition duration-200"
      >
        Submit
      </button> */}
    </form>
  );
};

export default MyForm;
