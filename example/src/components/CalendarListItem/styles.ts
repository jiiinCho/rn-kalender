import { StyleSheet } from 'react-native';

import { defaultTheme, Theme } from '../../consts';

export default function styles(theme: Theme = {}) {
  const appStyle = { ...defaultTheme, ...theme };

  return StyleSheet.create({
    calendar: {
      paddingLeft: 15,
      paddingRight: 15,
    },
    placeholderText: {
      fontSize: 20,
      fontWeight: '200',
      color: appStyle.dayTextColor,
    },
  });
}
