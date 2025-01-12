import React from "react";

const Rating = ({ rating }) => {
  const percentage = (rating / 10) * 100;
  return (
    <div className="relative w-full max-w-[120px] h-6 bg-gray-200 rounded-full overflow-hidden shadow-lg">
      <div
        className="absolute h-full bg-yellow-500 transition-all duration-300"
        style={{ width: `${percentage}%` }}
      ></div>
      <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm">
        {rating.toFixed(1)}
      </span>
    </div>
  );
};

export default Rating;
