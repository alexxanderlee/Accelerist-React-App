import React from 'react';

const MapPinIcon: React.FC = () => {
  return (
    <svg
      width={20}
      height={20}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.5 8.333c0 5.834-7.5 10.834-7.5 10.834s-7.5-5-7.5-10.834a7.5 7.5 0 0115 0z"
        stroke="#2BAEE0"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 10.833a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
        stroke="#2BAEE0"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default MapPinIcon;
