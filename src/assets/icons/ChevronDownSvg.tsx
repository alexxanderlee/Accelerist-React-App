import React from 'react';

interface Props {
  width?: number;
  height?: number;
}

const ChevronDownSvg: React.FC<Props> = ({ width = 14, height = 8 }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 1L7 7L13 1" stroke="#122434" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

export default ChevronDownSvg;
