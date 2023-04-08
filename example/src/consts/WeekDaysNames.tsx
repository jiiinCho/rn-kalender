import * as React from 'react';
import { StyleProp, Text, TextStyle } from 'react-native';

import { weekDayNames } from '../utils';

interface WeekDaysNamesProps {
  firstDay?: number;
  style?: StyleProp<TextStyle>;
}

const WeekDaysNames = React.memo(({ firstDay, style }: WeekDaysNamesProps) => {
  const dayNames = weekDayNames(firstDay);

  if (!dayNames) {
    return null;
  }

  return (
    <>
      {dayNames.map((day: string, index: number) => (
        <Text
          allowFontScaling={false}
          key={index}
          style={style}
          numberOfLines={1}
          accessibilityLabel={''}
          // accessible={false} // not working
          // importantForAccessibility='no'
        >
          {day}
        </Text>
      ))}
    </>
  );
});

export default WeekDaysNames;
