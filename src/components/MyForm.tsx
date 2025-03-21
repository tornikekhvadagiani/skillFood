import React from "react";
import { FormProps } from "../interfaces/form-propst-interface";

const MyForm: React.FC<FormProps> = ({ inputs, onSubmit, className }) => {
  return (
    <form onSubmit={onSubmit} className={className}>
      {inputs.map((input) => (
        <input
          key={input.name}
          type={input.type}
          name={input.name}
          placeholder={input.placeholder}
          ref={input.inputRef ?? undefined}
          value={input.inputRef ? undefined : input.value}
          onChange={input.inputRef ? undefined : input.onChange}
          className="w-full p-2 border border-gray-300 rounded focus:ring-2 outline-none focus:ring-var-blue"
        />
      ))}
      <button
        type="submit"
        className="w-full bg-var-blue text-white py-2 rounded-md cursor-pointer hover:bg-blue-600 transition duration-200"
      >
        Submit
      </button>
    </form>
  );
};

export default MyForm;
