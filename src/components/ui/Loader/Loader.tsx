import React from 'react';
import ReactLoader from 'react-loader-spinner';

interface LoaderProps {
  width?: number;
  height?: number;
  color?: string;
}

const Loader: React.FC<LoaderProps> = ({ width = 60, height = 60, color = '#58c0e9' }) => {
  return (
    <ReactLoader
      type="TailSpin"
      color={color}
      height={height}
      width={width}
    />
  );
}

export default Loader;