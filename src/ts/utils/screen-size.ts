const MOBILE_SCREEN = 768;
const TABLET_SCREEN = 1152;

export const isMobileScreen = (): boolean => {
  return window.innerWidth < MOBILE_SCREEN;
}

export const isTabletScreen = (): boolean => {
  return !isMobileScreen() && window.innerWidth < TABLET_SCREEN;
}

export const isDesktopScreen = (): boolean => {
  return window.innerWidth >= TABLET_SCREEN;
}