import { StyleSheet } from 'react-native';

import { defaultTheme, typography, Theme } from '../../consts';

export default function styles(theme: Theme = {}) {
  const appStyle = { ...defaultTheme, ...theme };

  return StyleSheet.create({
    week: {
      marginTop: 7,
      flexDirection: 'row',
      justifyContent: 'space-around',
      backgroundColor: appStyle.calendarBackground,
      borderBottomColor: appStyle.borderColor,
      borderBottomWidth: 1,
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
