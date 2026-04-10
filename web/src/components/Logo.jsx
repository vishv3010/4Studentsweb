import React from 'react';

const Logo = ({ className = "w-10 h-10" }) => {
  return (
    <svg
      className={className}
      viewBox="-5 -5 110 110"
      xmlns="http://www.w3.org/2000/svg"
      fill="url(#logo-gradient)"
    >
      <defs>
        <linearGradient id="logo-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#9333EA" />
          <stop offset="100%" stopColor="#0D9488" />
        </linearGradient>
      </defs>
      <path 
        d="M 27.5 35 L 45.5 35 L 82.5 -2 L 64.5 -2 Z 
           M 62.5 25 L 77.5 25 L 77.5 35 L 62.5 35 Z 
           M 22.5 40 L 92.5 40 L 77.5 55 L 7.5 55 Z 
           M 62.5 60 L 77.5 60 L 77.5 80 A 20 20 0 0 1 57.5 100 L 12.5 100 L 27.5 85 L 57.5 85 A 5 5 0 0 0 62.5 80 Z"
      />
    </svg>
  );
};

export default Logo;
