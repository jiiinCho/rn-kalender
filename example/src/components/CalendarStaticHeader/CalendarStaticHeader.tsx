import * as React from 'react';
import { View, Text, StyleProp, ViewStyle } from 'react-native';

import type { Locale } from 'date-fns';
import sv from 'date-fns/locale/sv';
import { includes } from 'lodash';

import styles from './styles';
import type { Theme } from '../../consts';
import { weekDayNames } from '../../utils';

export interface CalendarStaticHeaderProps {
  theme?: Theme;
  /** If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday */
  firstDay?: number;
  /** Day format. Formatting values: https://date-fns.org/v2.29.3/docs/format */
  headerDayFormat?: string;
  /** Day locale. Locale lists: https://github.com/date-fns/date-fns/tree/main/src/locale */
  headerDayLocale?: Locale;
  /** Apply custom disable color to selected day indexes */
  disabledDaysIndexes?: number[];
  /** Provide aria-level for calendar heading for proper accessibility when used with web (react-native-web) */
  testID?: string;
  style?: StyleProp<ViewStyle>;
  /** IOS support, set it true to turn off voice over. Default is false */
  accessibilityElementsHidden?: boolean;
  /** Android, to avoid confusion for accessibility service in case overlapping UI components with the same parent. Default auto */
  importantForAccessibility?: 'auto' | 'yes' | 'no' | 'no-hide-descendants';
}

const CalendarStaticHeader = ({
  theme,
  firstDay,
  disabledDaysIndexes,
  style: propsStyle,
  testID,
  accessibilityElementsHidden,
  importantForAccessibility,
  headerDayLocale = sv,
}: CalendarStaticHeaderProps) => {
  const style = React.useRef(styles(theme));
  const renderWeekDays = React.useMemo(() => {
    const weekDaysNames = weekDayNames(firstDay, headerDayLocale);
    if (!weekDaysNames) {
      return null;
    }

    return weekDaysNames.map((day: string, index: number) => {
      const dayStyle = [] as any;
      dayStyle.push(style.current.dayHeader);

      if (includes(disabledDaysIndexes, index)) {
        dayStyle.push(style.current.disabledDayHeader);
      }

      return (
        <Text
          allowFontScaling={false}
          key={index}
          style={dayStyle}
          numberOfLines={1}
          accessibilityLabel={day}
        >
          {day}
        </Text>
      );
    });
  }, [disabledDaysIndexes, firstDay, headerDayLocale]);

  return (
    <View
      testID={testID}
      style={propsStyle}
      accessible
      accessibilityRole={'text'}
      accessibilityElementsHidden={accessibilityElementsHidden} // iOS
      importantForAccessibility={importantForAccessibility} // Android
    >
      <View style={style.current.week} testID={`${testID}.dayNames`}>
        {renderWeekDays}
      </View>
    </View>
  );
};

export default CalendarStaticHeader;
CalendarStaticHeader.displayName = 'CalendarStaticHeader';
