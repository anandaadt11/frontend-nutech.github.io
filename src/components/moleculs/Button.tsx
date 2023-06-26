import React from "react";

type ButtonProps = {
  title: string;
  width?: string;
  type: "button" | "submit" | "reset";
  onclick?: () => void | unknown;
  color: string;
  icon?: React.ReactNode;
  disabled?: boolean;
};

const Button = ({
  title,
  width,
  type,
  onclick,
  color,
  icon,
  disabled,
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      onClick={onclick}
      type={type}
      className={`bg-${color}-500 hover:bg-${color}-700 text-white text-sm font-bold py-2 px-4 rounded-xl ${width} flex gap-2 justify-center items-center`}
    >
      {icon}
      {title}
    </button>
  );
};

export default Button;
