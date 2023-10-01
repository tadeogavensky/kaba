import React, { FC } from "react";

interface LoadingSkeletonProps {
  className: string;
}

const LoadingSkeleton: FC<LoadingSkeletonProps> = ({ className }) => (
  <div className={className}></div>
);

export default LoadingSkeleton;
