import React, { useState } from "react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";

const StarRating = ({ onRatingChange }: { onRatingChange: any }) => {
  const [rating, setRating] = useState<number>(3);

  const handleStar = (newRating: number) => {
    setRating(newRating);
    onRatingChange(newRating);
  };

  const stars = [1, 2, 3, 4, 5].map((starValue) => {
    const isHalfStar = rating + 0.5 === starValue;
    const isFullStar = rating >= starValue;

    return (
      <div key={starValue}>
        <div
          className="star"
          onClick={() => handleStar(isHalfStar ? starValue - 0.5 : starValue)}
          onMouseLeave={() => handleStar(0)} // Reset the rating on mouse leave
          onMouseEnter={() =>
            handleStar(isHalfStar ? starValue - 0.5 : starValue)
          }
        >
          {isFullStar ? (
            <BsStarFill className="text-amber-500" size={30} />
          ) : isHalfStar ? (
            <BsStarHalf className="text-amber-500" size={30} />
          ) : (
            <BsStar className="font-bold" size={30} />
          )}
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="flex items-center gap-2">{stars}</div>
    </div>
  );
};

export default StarRating;
