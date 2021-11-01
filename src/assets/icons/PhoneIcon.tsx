import React from 'react';

const GlobeIcon: React.FC = () => {
  return (
    <svg
      width={20}
      height={20}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.333 14.1v2.5a1.667 1.667 0 01-1.816 1.667 16.492 16.492 0 01-7.192-2.559 16.25 16.25 0 01-5-5 16.491 16.491 0 01-2.558-7.225 1.666 1.666 0 011.658-1.816h2.5A1.667 1.667 0 017.592 3.1c.105.8.3 1.586.583 2.342A1.667 1.667 0 017.8 7.2L6.742 8.258a13.334 13.334 0 005 5L12.8 12.2a1.665 1.665 0 011.758-.375 10.7 10.7 0 002.342.583 1.666 1.666 0 011.433 1.692z"
        stroke="#2BAEE0"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default GlobeIcon;