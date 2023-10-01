import React, { FC } from "react";

interface ServicePillProps {
  name: string;
  active?: boolean;
  handleClick?: React.MouseEventHandler;
}

const ServicePill: FC<ServicePillProps> = ({ name, active, handleClick }) => {
  return (
    <button
      onClick={handleClick}
      className={`rounded-2xl text-sm font-body font-semibold ${
        active ? "bg-primary text-white" : "bg-blue-50 text-neutral-400"
      } px-3 py-1 cursor-pointer `}
    >
      {name}
    </button>
  );
};

export default ServicePill;
