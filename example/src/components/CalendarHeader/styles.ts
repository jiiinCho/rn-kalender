import { StyleSheet } from 'react-native';

import { settings, defaultTheme, typography, Theme, dayLayout } from '../../consts';

export default function styles(theme: Theme = {}) {
  const appStyle = { ...defaultTheme, ...theme };
  const rtlStyle = settings.isRTL ? { transform: [{ scaleX: -1 }] } : undefined;

  return StyleSheet.create({
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingBottom: 8,
      paddingTop: dayLayout.headerTopMargin,
      marginLeft: 4, // TODO: check
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    headerMonthTextContainer: {
      flexDirection: 'row',
      alignItems: 'flex-end',
    },
    headerYearContainer: {
      marginBottom: 6,
      marginHorizontal: 4,
      marginRight: 8,
    },
    monthText: {
      color: appStyle.monthTextColor,
      textTransform: 'uppercase',
      ...typography.month,
    },
    yearText: {
      ...typography.year,
    },
    arrowContainer: {
      flexDirection: 'row',
    },
    arrow: {
      padding: 12,
      paddingHorizontal: 16,
    },
    arrowSpacing: {
      marginLeft: 8,
    },
    arrowImage: {
      ...rtlStyle,
      tintColor: appStyle.arrowColor,
    },
    disabledArrowImage: {
      ...rtlStyle,
      tintColor: appStyle.disabledArrowColor,
    },
    week: {
      marginTop: 7,
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    partialWeek: {
      paddingRight: 0,
    },
    dayHeader: {
      marginTop: 2,
      marginBottom: 7,
      width: 32,
      textAlign: 'center',
      color: appStyle.textSectionTitleColor,
      ...typography.dayHeader,
    },
    disabledDayHeader: {
      color: appStyle.textSectionTitleDisabledColor,
    },
  });
}
