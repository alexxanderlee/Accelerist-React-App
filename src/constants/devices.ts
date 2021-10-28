export const screenSize = {
  mobileM: 376,
  tablet: 769,
};

const device = {
  mobileM: `(max-width: ${screenSize.mobileM}px)`,
  tablet: `(max-width: ${screenSize.tablet}px)`,
};

export default device;
