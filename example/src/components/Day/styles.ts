import { StyleSheet } from 'react-native';

import { settings, defaultTheme, typography, dayLayout, Theme } from '../../consts';

export default function styles(theme: Theme = {}) {
  const appStyle = { ...defaultTheme, ...theme };

  return StyleSheet.create({
    container: {
      alignSelf: 'stretch',
      alignItems: 'center',
      height: dayLayout.dayHeight,
      marginHorizontal: 2,
      borderWidth: 1,
      borderRadius: dayLayout.borderRadius,
      borderColor: appStyle.borderColor,
    },
    selected: {
      backgroundColor: appStyle.selectedDayBackgroundColor,
    },
    today: {
      borderWidth: 1,
      borderColor: appStyle.todayBorderColor,
    },
    periodStart: {
      marginRight: 0,
      borderColor: appStyle.periodBorderColor,
      backgroundColor: appStyle.periodBackgroundColor,
      borderRightWidth: 0,
      borderTopEndRadius: 0,
      borderBottomEndRadius: 0,
    },
    periodMid: {
      marginLeft: 0,
      marginRight: 0,
      borderColor: appStyle.periodBorderColor,
      backgroundColor: appStyle.periodBackgroundColor,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderTopStartRadius: 0,
      borderBottomStartRadius: 0,
      borderTopEndRadius: 0,
      borderBottomEndRadius: 0,
    },
    periodEnd: {
      marginLeft: 0,
      borderColor: appStyle.periodBorderColor,
      backgroundColor: appStyle.periodBackgroundColor,
      borderLeftWidth: 0,
      borderTopStartRadius: 0,
      borderBottomStartRadius: 0,
    },
    disabled: {
      borderColor: appStyle.disabledBorderColor,
    },
    blocked: {
      backgroundColor: appStyle.blockedBackgroundColor,
    },
    blockedText: {
      color: appStyle.blockedTextColor,
    },
    text: {
      textAlign: 'center',
      marginTop: settings.isAndroid ? 4 : 6,
      color: appStyle.dayTextColor,
      ...typography.day,
    },
    selectedText: {
      color: appStyle.selectedDayTextColor,
    },
    disabledText: {
      color: appStyle.disabledTextColor,
      ...typography.disabledDay,
    },
    todayText: {
      color: appStyle.todayTextColor,
    },
    inactiveText: {
      color: appStyle.textInactiveColor,
    },
  });
}
