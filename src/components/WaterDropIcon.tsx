
import React from "react";

interface WaterDropIconProps {
  size?: number;
  className?: string;
}

const WaterDropIcon: React.FC<WaterDropIconProps> = ({ 
  size = 48, 
  className = "" 
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`water-drop ${className}`}
    >
      <path
        d="M12 21C15.866 21 19 17.866 19 14C19 10.134 12 3 12 3C12 3 5 10.134 5 14C5 17.866 8.13401 21 12 21Z"
        fill="url(#water-gradient)"
        stroke="#0284c7"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="water-gradient"
          x1="5"
          y1="3"
          x2="19"
          y2="21"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#38bdf8" />
          <stop offset="1" stopColor="#0284c7" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default WaterDropIcon;
