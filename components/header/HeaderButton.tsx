import React, { FC } from "react";

interface HeaderButtonProps {
  handleClick?: React.MouseEventHandler;
  label?: string;
}

const HeaderButton: FC<HeaderButtonProps> = ({ handleClick, label }) => {
  return <button className="bg-primary text-white px-6 py-2 rounded-2xl">{label}</button>;
};

export default HeaderButton;
