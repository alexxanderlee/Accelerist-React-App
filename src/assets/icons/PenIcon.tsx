import React from 'react';

interface PenIconProps {
  size?: number;
  color?: string;
}

const PenIcon: React.FC<PenIconProps> = ({ color = '#2BAEE0', size = 18 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M11.7434 0.910826C12.0689 0.585389 12.5965 0.585389 12.9219 0.910826L17.0886 5.07749C17.414 5.40293 17.414 5.93057 17.0886 6.256L6.25527 17.0893C6.09899 17.2456 5.88703 17.3334 5.66602 17.3334H1.49935C1.03911 17.3334 0.666016 16.9603 0.666016 16.5001V12.3334C0.666016 12.1124 0.753813 11.9004 0.910093 11.7442L11.7434 0.910826ZM2.33268 12.6786V15.6668H5.32084L15.3208 5.66675L12.3327 2.67859L2.33268 12.6786Z" fill={color} />
    </svg>
  );
};

export default PenIcon;
