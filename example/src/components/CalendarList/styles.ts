import { StyleSheet } from 'react-native';

import { defaultTheme, Theme } from '../../consts';

export default function styles(theme: Theme = {}) {
  const appStyle = { ...defaultTheme, ...theme };

  return StyleSheet.create({
    container: {
      backgroundColor: appStyle.calendarBackground,
    },
    staticHeader: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      backgroundColor: appStyle.calendarBackground,
      paddingHorizontal: 15,
    },
  });
}
