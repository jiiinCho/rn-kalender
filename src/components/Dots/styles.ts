import { StyleSheet } from 'react-native';

import { defaultTheme, Theme } from '../../consts';

export default function styles(theme: Theme = {}) {
  const appStyle = { ...defaultTheme, ...theme };

  return StyleSheet.create({
    root: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    dot: {
      width: 4,
      height: 6,
      marginTop: 1,
      marginHorizontal: 1,
      borderRadius: 2,
      opacity: 1,
      backgroundColor: appStyle.dotColor,
    },
  });
}
