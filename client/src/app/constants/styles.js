import { StyleSheet } from 'aphrodite';

export const TICKER_GREEN = '#00aa44';
export const TICKER_RED = '#ff0000';

export const ALT_TICKER_GREEN = '#5dc892';  //from TradingView
export const ALT_TICKER_RED = '#f35262';

export const LIGHT_HIGHLIGHT_GREEN = '#EDFFEE';
export const LIGHT_HIGHLIGHT_RED = '#FFEDED';
export const DARK_HIGHLIGHT_GREEN = '#001F12';
export const DARK_HIGHLIGHT_RED = '#210600';

export const ROYAL_BLUE = '#304FFE';
export const LIGHTNIGHT = '#0b1010';
export const SOFTGRAY = '#121515';
export const BLUEGRAY = '#0E1120';
export const LIGHTBACKGROUNDGRAY = '#ececec !important';

export const GOLD = '#FFD000';
export const GOLDINVERSEBLUE = "#2224FF !important";

//borders
export const BORDERLIGHT = '#999';
export const BORDERDARK = '#777';

export const BLOOMYBLUE = '#2900EA';
export const LAVENDER = '#6447ED';
export const ORANGE = '#FF8000';
export const FIREORANGE = '#FF5200';
export const PURPLE = '#640BD3';
export const TRIADORANGE = '#ED7518';
export const AUXORANGE = '#FF9F00';
export const COMPOUNDAQUA = '#3BECD1';
export const COMPOUNDGREEN = '#12B66F';
export const BLAZINGREEN = '#00EB77';
export const COMPBLUE = '#00CDE9';
export const TVBLUE = '#131722';

export const styles = StyleSheet.create({
  button: {
    letterSpacing: '1px',
    fontWeight: '700',
    borderBottom: '1px solid #777',
    textTransform: 'uppercase',
  },
  emphasize: {
    backgroundColor: GOLD,
    borderColor: '#000',
  },
  hollowButton: {
    border: '1px solid #000',
    borderRadius: '1px',
    color: '#000',
    padding: '8px 12px',
    textTransform: 'uppercase',
    fontWeight: '700',
    letterSpacing: '2px',
  },
  hollowButtonNight: {
    borderColor: "#fff",
    color: '#fff',
  },
  subtitle: {
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontWeight: '500',
    padding: '0px 10px',
  },
});
