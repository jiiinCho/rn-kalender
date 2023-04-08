import type { TextStyle } from 'react-native/types';

import type { Theme } from './types';

const palette = {
  primary: {
    default: '#EF7646',
    faded: '#FEE3D8',
  },
  secondary: {
    default: '#489F70',
    faded: '#E0EDE6',
  },
  grey: {
    dark: '#a7a7a7',
    regular: '#c0c0c0',
    light: '#D9D9D9',
    diminish: '#F4F4F4',
  },
  black: '#242324',
  white: '#FFF',
};

export const typography = {
  disabledDay: {
    fontFamily: 'System',
    fontWeight: '300' as TextStyle['fontWeight'],
    fontSize: 16,
  },
  day: {
    fontFamily: 'System',
    fontWeight: '400' as TextStyle['fontWeight'],
    fontSize: 16,
  },
  dayHeader: {
    fontFamily: 'System',
    fontWeight: '400' as TextStyle['fontWeight'],
    fontSize: 14,
  },
  month: {
    fontFamily: 'System',
    fontWeight: '500' as TextStyle['fontWeight'],
    fontSize: 32,
  },
  year: {
    fontFamily: 'System',
    fontWeight: '200' as TextStyle['fontWeight'],
    fontSize: 18,
  },
};

export const defaultTheme: Theme = {
  textSectionTitleColor: palette.grey.dark,
  textSectionTitleDisabledColor: palette.grey.light,
  textInactiveColor: palette.grey.regular,
  monthTextColor: palette.black,

  disabledBorderColor: palette.grey.diminish,
  disabledTextColor: palette.grey.regular,

  calendarBackground: palette.white,

  selectedDayBackgroundColor: palette.grey.regular,
  selectedDayTextColor: palette.white,
  dayTextColor: palette.black,

  todayBackgroundColor: palette.primary.faded,
  todayBorderColor: palette.primary.default,
  todayTextColor: palette.primary.default,

  periodBackgroundColor: palette.primary.faded,
  periodBorderColor: palette.primary.default,

  blockedBackgroundColor: palette.grey.diminish,
  blockedTextColor: palette.grey.regular,

  arrowColor: palette.grey.regular,
  disabledArrowColor: palette.grey.light,

  weekVerticalMargin: 7,

  dotColor: palette.primary.default,
  borderColor: palette.grey.light,
};

export const dayLayout = {
  dayHeight: 58,
  borderRadius: 8,
  headerTopMargin: 46,
};
