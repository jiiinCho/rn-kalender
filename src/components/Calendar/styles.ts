import { StyleSheet } from 'react-native';

import { defaultTheme, Theme } from '../../consts';

export default function styles(theme: Theme = {}) {
  const appStyle = { ...defaultTheme, ...theme };

  return StyleSheet.create({
    container: {
      paddingLeft: 5,
      paddingRight: 5,
      backgroundColor: appStyle.calendarBackground,
    },
    dayContainer: {
      flex: 1,
      alignItems: 'center',
    },
    emptyDayContainer: {
      flex: 1,
    },
    monthView: {
      backgroundColor: appStyle.calendarBackground,
    },
    week: {
      marginVertical: appStyle.weekVerticalMargin,
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
  });
}
