"use client";
import React, { FC } from "react";

interface ReviewsButtonProps {
  handleClick?: React.MouseEventHandler;
  children: React.ReactNode;
}

const ReviewsButton: FC<ReviewsButtonProps> = ({ children, handleClick }) => {
  return <button onClick={handleClick}>{children}</button>;
};

export default ReviewsButton;
