const calculateAverageRating = (reviews: { rating: number }[]) => {
    if (reviews.length === 0) {
      return 0; // Return 0 when there are no reviews
    }
  
    const totalRating = reviews.reduce(
      (accum, review) => accum + review.rating,
      0
    );
    const avgRating = totalRating / reviews.length;
  
    const roundedAvgRating = parseFloat(avgRating.toFixed(2));
  
    return roundedAvgRating;
  };
  
  export default calculateAverageRating;
  