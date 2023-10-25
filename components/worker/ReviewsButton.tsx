"use client";
import Worker from "@/types/Worker";
import Link from "next/link";
import React, { FC } from "react";

interface ReviewsButtonProps {
  handleClick?: React.MouseEventHandler;
  children: React.ReactNode;
  worker: Worker;
}

const ReviewsButton: FC<ReviewsButtonProps> = ({
  children,
  worker,
}) => {
  return (
    <Link
      href={`/worker/${worker?.id}-service-${worker?.service?.name}/?modal=true`}
    >
      {children}
    </Link>
  );
};

export default ReviewsButton;
