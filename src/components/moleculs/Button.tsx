import React from "react";

type ButtonProps = {
  title: string;
  width?: string;
  type: "button" | "submit" | "reset";
  onclick?: () => void | unknown;

  icon?: React.ReactNode;
  disabled?: boolean;
};

const Button = ({
  title,
  width,
  type,
  onclick,
  icon,
  disabled,
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      onClick={onclick}
      type={type}
      className={`bg-fuchsia-500 hover:bg-fuchsia-700 text-white text-sm font-bold py-2 px-4 rounded-xl ${width} flex gap-2 justify-center items-center`}
    >
      {icon}
      {title}
    </button>
  );
};

export default Button;
