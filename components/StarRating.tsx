import React from 'react'
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';

const StarRating = ({ rating }: { rating: number }) => {
    const MAX_STARS = 5;
    const roundedRating = Math.round(rating);
  
    const stars = [];
  
    for (let i = 1; i <= MAX_STARS; i++) {
      if (i <= roundedRating) {
        stars.push(<BsStarFill key={i} size={15} className="text-primary" />);
      } else if (i === roundedRating + 0.5) {
        stars.push(<BsStarHalf key={i} size={15} className="text-primary" />);
      } else {
        stars.push(<BsStar key={i} size={15} className="text-primary" />);
      }
    }
  
    return <div className="flex items-center gap-1">{stars}</div>;
  };

export default StarRating