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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 2.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15zM.833 10a9.167 9.167 0 1118.333 0A9.167 9.167 0 01.833 10z"
        fill="#2BAEE0"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M.833 10c0-.46.373-.833.833-.833h16.667a.833.833 0 010 1.666H1.666A.833.833 0 01.833 10z"
        fill="#2BAEE0"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.5 10c.057 2.562.938 5.03 2.5 7.041A11.917 11.917 0 0012.5 10 11.917 11.917 0 0010 2.959 11.917 11.917 0 007.5 10zM10 1.667l-.616-.562a13.583 13.583 0 00-3.55 8.912 13.584 13.584 0 003.55 8.878.833.833 0 001.231 0 13.584 13.584 0 003.551-8.912 13.584 13.584 0 00-3.551-8.878L10 1.667z"
        fill="#2BAEE0"
      />
    </svg>
  );
};

export default GlobeIcon;