export const screenSize = {
  mobileM: 376,
  mobileL: 470,
  tabletXS: 660,
  tablet: 769,
  tabletL: 860,
  laptop: 1025,
  laptopM: 1097,
};

const device = {
  mobileM: `(max-width: ${screenSize.mobileM}px)`,
  mobileL: `(max-width: ${screenSize.mobileL}px)`,
  tabletXS: `(max-width: ${screenSize.tabletXS}px)`,
  tablet: `(max-width: ${screenSize.tablet}px)`,
  tabletL: `(max-width: ${screenSize.tabletL}px)`,
  laptop: `(max-width: ${screenSize.laptop}px)`,
  laptopM: `(max-width: ${screenSize.laptopM}px)`,
};

export default device;
