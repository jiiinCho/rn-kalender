import * as React from 'react';
import { Text } from 'react-native';

import { addMonths, subMonths } from 'date-fns';

import { Calendar, CalendarProps } from '../index';
import type { Theme } from '../../consts';
import { toMarkingFormat, extractCalendarProps } from '../../utils';
import styles from './styles';

export type CalendarListItemProps = CalendarProps & {
  item: Date;
  calendarWidth: number;
  calendarHeight: number;
  horizontal: boolean;
  theme?: Theme;
  scrollToMonth: (date: Date, offset?: number) => void;
  visible: boolean;
};

const CalendarListItem = React.memo((props: CalendarListItemProps) => {
  const {
    item,
    theme,
    scrollToMonth,
    horizontal,
    calendarHeight,
    calendarWidth,
    style: propsStyle,
    headerStyle,
    onPressArrowLeft,
    onPressArrowRight,
    visible,
  } = props;

  const style = React.useRef(styles(theme));

  const calendarProps = extractCalendarProps(props);
  const markingFormat = toMarkingFormat(item);

  const calendarStyle = React.useMemo(() => {
    return [
      {
        width: calendarWidth,
        minHeight: calendarHeight,
      },
      style.current.calendar,
      propsStyle,
    ];
  }, [calendarWidth, calendarHeight, propsStyle]);

  const _onPressArrowLeft = React.useCallback(
    (method: () => void, month?: Date) => {
      if (!month) {
        return;
      }

      onPressArrowLeft?.(method, month);
      const previousMonth = subMonths(month, 1);
      scrollToMonth(previousMonth);
    },
    [onPressArrowLeft, scrollToMonth],
  );

  const _onPressArrowRight = React.useCallback(
    (method: () => void, month?: Date) => {
      if (!month) {
        return;
      }
      onPressArrowRight?.(method, month);
      const nextMonth = addMonths(month, 1);
      scrollToMonth(nextMonth);
    },
    [onPressArrowRight, scrollToMonth],
  );

  const textStyle = React.useMemo(() => {
    return [calendarStyle, style.current.placeholderText];
  }, [calendarStyle]);

  if (!visible) {
    return <Text style={textStyle}>{markingFormat}</Text>;
  }

  return (
    <Calendar
      {...calendarProps}
      hideArrows={true}
      hideDayNames={true}
      current={markingFormat}
      style={calendarStyle}
      headerStyle={horizontal ? headerStyle : undefined}
      disableMonthChange
      onPressArrowLeft={horizontal ? _onPressArrowLeft : onPressArrowLeft}
      onPressArrowRight={horizontal ? _onPressArrowRight : onPressArrowRight}
    />
  );
});

export default CalendarListItem;
CalendarListItem.displayName = 'CalendarListItem';
