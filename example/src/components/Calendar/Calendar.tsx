import * as React from 'react';
import { StyleProp, ViewStyle, View } from 'react-native';
import { addMonths, parseISO } from 'date-fns';

import GestureRecognizer from 'react-native-swipe-gestures';

import styles from './styles';
import {
  Day,
  DayProps,
  CalendarHeader,
  CalendarHeaderProps,
  CalendarHeaderRefType,
} from '../index';
import { settings, Theme, _BlockedMarking, _DotMarking, _PeriodMarking } from '../../consts';
import { useDidUpdate } from '../../hooks';
import {
  extractHeaderProps,
  getState,
  isGTE,
  isLTE,
  page,
  isSameMonth,
  isSameDate,
  isValidDateType,
} from '../../utils';

const swipeDirections = {
  SWIPE_UP: 'SWIPE_UP',
  SWIPE_DOWN: 'SWIPE_DOWN',
  SWIPE_LEFT: 'SWIPE_LEFT',
  SWIPE_RIGHT: 'SWIPE_RIGHT',
};

export interface CalendarProps
  extends Omit<CalendarHeaderProps, 'month'>,
    Omit<DayProps, 'date' | 'formattedDateStamp'> {
  /** Specify theme properties to override specific styles for calendar parts */
  theme?: Theme;
  /** If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday */
  firstDay?: number;
  /** Display loading indicator */
  displayLoadingIndicator?: boolean;
  /** Specify style for calendar container element */
  style?: StyleProp<ViewStyle>;
  /** Minimum date that can be selected, dates before minDate will be grayed out */
  minDate?: string;
  /** Maximum date that can be selected, dates after maxDate will be grayed out */
  maxDate?: string;
  /** Do not show days of other months in month page */
  hideExtraDays?: boolean;
  /** Handler which gets executed on day press */
  onDayPress?: (date: string) => void;
  /** Handler which gets executed on day long press */
  onDayLongPress?: (date: string) => void;
  /** Handler which gets executed when visible month changes in calendar */
  onVisibleMonthsChange?: (months: Date) => void;
  /** Disables changing month when click on days of other months (when hideExtraDays is false) */
  disableMonthChange?: boolean;
  /** Enable the option to swipe between months */
  enableSwipeMonths?: boolean;
  /** Disable days by default */
  disabledByDefault?: boolean;
  /** Style passed to the header */
  headerStyle?: StyleProp<ViewStyle>;
  /** Allow selection of dates before minDate or after maxDate */
  allowSelectionOutOfRange?: boolean;
  blockedDates?: _BlockedMarking;
  dotDates?: _DotMarking[];
  periodDates?: _PeriodMarking;
}

const Calendar = (props: CalendarProps) => {
  const {
    current,
    theme,
    blockedDates,
    dotDates,
    periodDates,
    minDate,
    maxDate,
    allowSelectionOutOfRange,
    onDayPress,
    onDayLongPress,
    onVisibleMonthsChange,
    disabledByDefault,
    disableMonthChange,
    enableSwipeMonths,
    hideExtraDays,
    firstDay,
    displayLoadingIndicator,
    headerStyle,
    accessibilityElementsHidden,
    importantForAccessibility,
    testID,
    style: propsStyle,
    DayComponent,
  } = props;

  const [currentMonth, setCurrentMonth] = React.useState<Date>(
    isValidDateType(current) ? new Date(current) : new Date(),
  );

  const style = React.useRef(styles(theme));
  const header = React.useRef<CalendarHeaderRefType>(null);

  // Triggered when using <Calendar /> only
  useDidUpdate(() => {
    onVisibleMonthsChange?.(currentMonth);
  }, [currentMonth]);

  const updateMonth = React.useCallback(
    (newMonth: Date) => {
      if (isSameMonth(newMonth, currentMonth)) {
        return;
      }
      setCurrentMonth(newMonth);
    },
    [currentMonth, setCurrentMonth],
  );

  const addMonth = React.useCallback(
    (count: number) => {
      const newMonth = addMonths(currentMonth, count);
      updateMonth(newMonth);
    },
    [currentMonth, updateMonth],
  );

  const handleDayInteraction = React.useCallback(
    (date: string, interaction?: (date: string) => void) => {
      const parsedDate = parseISO(date);

      if (
        allowSelectionOutOfRange ||
        (!(minDate && !isGTE(parsedDate, new Date(minDate))) &&
          !(maxDate && !isLTE(parsedDate, new Date(maxDate))))
      ) {
        if (!disableMonthChange) {
          updateMonth(parsedDate);
        }
        interaction?.(date);
      }
    },
    [minDate, maxDate, allowSelectionOutOfRange, disableMonthChange, updateMonth],
  );

  const _onDayPress = React.useCallback(
    (date?: string) => {
      if (!date) {
        return;
      }
      handleDayInteraction(date, onDayPress);
    },
    [handleDayInteraction, onDayPress],
  );

  const _onDayLongPress = React.useCallback(
    (date?: string) => {
      if (!date) {
        return;
      }
      handleDayInteraction(date, onDayLongPress);
    },
    [handleDayInteraction, onDayLongPress],
  );

  const onSwipeLeft = React.useCallback(() => {
    header.current?.onPressRight();
  }, [header]);

  const onSwipeRight = React.useCallback(() => {
    header.current?.onPressLeft();
  }, [header]);

  const onSwipe = React.useCallback(
    (gestureName: string) => {
      const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;

      switch (gestureName) {
        case SWIPE_UP:
        case SWIPE_DOWN:
          break;
        case SWIPE_LEFT:
          settings.isRTL ? onSwipeRight() : onSwipeLeft();
          break;
        case SWIPE_RIGHT:
          settings.isRTL ? onSwipeLeft() : onSwipeRight();
          break;
      }
    },
    [onSwipeLeft, onSwipeRight],
  );

  const renderDay = (day: Date, id: number) => {
    if (!isSameMonth(day, currentMonth) && hideExtraDays) {
      return <View key={id} style={style.current.emptyDayContainer} />;
    }

    const date = day.getDate();
    const state = getState({ day, current: currentMonth, minDate, maxDate, disabledByDefault });

    const isBlockedDate = blockedDates?.dates.find((blockDate) => isSameDate(blockDate, day));
    const isDotDate = dotDates?.find(({ date: dotDate }) => isSameDate(dotDate, day));
    const isPeriod = periodDates?.dates.find(({ date: periodDate }) => isSameDate(periodDate, day));

    return (
      <View style={style.current.dayContainer} key={id}>
        <Day
          formattedDateStamp={day.toDateString()}
          theme={theme}
          testID={`${testID}.day_${date}`}
          date={date < 10 ? `0${date}` : date}
          state={state}
          onPress={_onDayPress}
          onLongPress={_onDayLongPress}
          DayComponent={DayComponent}
          {...(isDotDate && {
            dotDate: isDotDate.dots,
            marking: {
              activeOpacity: isDotDate.activeOpacity,
              disableTouchEvent: isDotDate.disableTouchEvent,
              accessibilityLabel: isDotDate.accessibilityLabel,
            },
          })}
          {...(isBlockedDate && {
            blockedDate: {
              backgroundColor: blockedDates?.backgroundColor,
              borderColor: blockedDates?.borderColor,
            },
            marking: {
              activeOpacity: blockedDates?.activeOpacity,
              disableTouchEvent: blockedDates?.disableTouchEvent,
              accessibilityLabel: blockedDates?.accessibilityLabel,
            },
          })}
          {...(isPeriod && {
            periodDate: {
              backgroundColor: periodDates?.backgroundColor,
              borderColor: periodDates?.borderColor,
              start: isPeriod.start,
              end: isPeriod.end,
            },
            marking: {
              activeOpacity: periodDates?.activeOpacity,
              disableTouchEvent: periodDates?.disableTouchEvent,
              accessibilityLabel: periodDates?.accessibilityLabel,
            },
          })}
        />
      </View>
    );
  };

  const renderWeek = (days: Date[], id: number) => {
    return (
      <View style={style.current.week} key={id}>
        {days.map((day: Date, index: number) => renderDay(day, index))}
      </View>
    );
  };

  const renderMonth = () => {
    const days = page(currentMonth, firstDay);
    const weeks = [];

    while (days.length) {
      weeks.push(renderWeek(days.splice(0, 7), weeks.length));
    }

    return <View style={style.current.monthView}>{weeks}</View>;
  };

  const renderHeader = () => {
    const headerProps = extractHeaderProps(props);

    return (
      <CalendarHeader
        {...headerProps}
        testID={`${testID}.header`}
        style={headerStyle}
        month={currentMonth}
        addMonth={addMonth}
        displayLoadingIndicator={displayLoadingIndicator}
        ref={header}
      />
    );
  };

  const GestureComponent = enableSwipeMonths ? GestureRecognizer : View;
  const swipeProps = {
    onSwipe: (direction: string) => onSwipe(direction),
  };

  return (
    <GestureComponent {...(enableSwipeMonths && swipeProps)}>
      <View
        style={[style.current.container, propsStyle]}
        testID={testID}
        accessibilityElementsHidden={accessibilityElementsHidden} // iOS
        importantForAccessibility={importantForAccessibility} // Android
      >
        {renderHeader()}
        {renderMonth()}
      </View>
    </GestureComponent>
  );
};

export default Calendar;
