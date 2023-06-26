import React from "react";

type InputProps = {
  title: string;
  placeholder: string;
  type: string;
  value?: string | number;
  onchange: React.ChangeEventHandler<HTMLInputElement>;
};

const Input = ({ title, placeholder, type, onchange, value }: InputProps) => {
  return (
    <div className="mb-6 relative">
      <label
        htmlFor={title}
        className="block mb-2 font-bold text-gray-900"
      >
        {title}
      </label>
      <input
        value={value}
        onChange={onchange}
        type={type}
        id={title}
        className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-fuchsia-500 focus:border-fuchsia-500 block w-full p-2.5"
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
