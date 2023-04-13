import * as React from 'react';
import type { ViewStyle, FlatListProps, ViewToken } from 'react-native';
import { View, FlatList } from 'react-native';

import { addMonths } from 'date-fns';
import { findIndex } from 'lodash';

import styleConstructor from './styles';
import { _BlockedMarking, _DotMarking, _PeriodMarking, settings } from '../../consts';
import { useDidUpdate } from '../../hooks';
import {
  extractCalendarProps,
  toMarkingFormat,
  forwardRef,
  extractStaticHeaderProps,
  getDifferenceInMonth,
  isValidDateType,
  isSameDate,
  isSameMonth,
  page,
  startOfMonth,
} from '../../utils';
import { CalendarStaticHeader, CalendarProps, CalendarListItem } from '../index';

export interface CalendarListProps
  extends CalendarProps,
    Omit<FlatListProps<any>, 'data' | 'renderItem' | 'keyExtractor'> {
  /** Max amount of months allowed to scroll to the past. Default = 50 */
  pastScrollRange?: number;
  /** Max amount of months allowed to scroll to the future. Default = 50 */
  futureScrollRange?: number;
  /** Used when calendar scroll is horizontal, default is device width, pagniation should be disabled */
  calendarWidth?: number;
  /** Dynamic calendar height */
  calendarHeight?: number;
  /** Styles for the List item (the calendar) */
  calendarStyle?: ViewStyle;
  /** Enable or disable vertical / horizontal scroll indicator. Default = false */
  showScrollIndicator?: boolean;
  /** Whether to animate the auto month scroll */
  animateScroll?: boolean;
}

const CALENDAR_WIDTH = settings.screenWidth;
const CALENDAR_HEIGHT = 540;
const PAST_SCROLL_RANGE = 6;
const FUTURE_SCROLL_RANGE = 6;

export interface CalendarListImperativeMethods {
  scrollToDay: (date: Date, offset: number, animated: boolean) => void;
  scrollToMonth: (date: Date, offset: number, animated: boolean) => void;
}

export type Props = CalendarListProps;

type ViewableMonthItems = Omit<ViewToken, 'item'> & { item: FlatListItem };
type FlatListItem = {
  month: Date;
  key: string;
};

const CalendarList = forwardRef<CalendarListImperativeMethods, Props>(
  (props: CalendarListProps, ref) => {
    const {
      /** Calendar props */
      theme,
      current,
      periodDates,
      blockedDates,
      dotDates,
      onVisibleMonthsChange,
      headerStyle,
      firstDay,
      /** CalendarList props */
      pastScrollRange = PAST_SCROLL_RANGE,
      futureScrollRange = FUTURE_SCROLL_RANGE,
      calendarHeight = CALENDAR_HEIGHT,
      calendarWidth = CALENDAR_WIDTH,
      calendarStyle,
      animateScroll = false,
      showScrollIndicator = false,
      /** View props */
      testID,
      style: propsStyle,
      onLayout,
      removeClippedSubviews,
      /** ScrollView props */
      horizontal = false,
      pagingEnabled = false,
      scrollEnabled = true,
      nestedScrollEnabled = true,
      scrollsToTop = false,
      keyboardShouldPersistTaps,
      onScrollBeginDrag,
      onScrollEndDrag,
      onMomentumScrollBegin,
      onMomentumScrollEnd,
      /** FlatList props */
      onEndReachedThreshold,
      onEndReached,
      locale,
    } = props;

    const initialDate = React.useRef<Date>(
      startOfMonth(current && isValidDateType(current) ? new Date(current) : new Date()),
    );

    const [currentMonth, setCurrentMonth] = React.useState<Date>(initialDate.current);

    const calendarProps = extractCalendarProps(props);
    const calendarSize = horizontal ? calendarWidth : calendarHeight;
    const visibleMonth = React.useRef(currentMonth);

    const style = React.useRef(styleConstructor(theme));
    const list = React.useRef<FlatList>(null);
    const listStyle = React.useMemo(() => {
      return [style.current.container, propsStyle];
    }, [propsStyle]);

    const range = React.useRef(horizontal ? 1 : 3);
    const items = React.useMemo<FlatListItem[]>(() => {
      const months = [];

      for (let i = 0; i <= pastScrollRange + futureScrollRange; i++) {
        const month = addMonths(initialDate.current, i - pastScrollRange);
        months.push({ month, key: month.getTime().toString() });
      }

      return months;
    }, [pastScrollRange, futureScrollRange, initialDate]);

    const initialDateIndex = React.useMemo<number>(() => {
      return findIndex(items, function ({ month }) {
        return month.toString() === initialDate.current.toString();
      });
    }, [initialDate, items]);

    const headerProps = extractStaticHeaderProps(props);
    const staticHeaderStyle = React.useMemo(() => {
      return [style.current.staticHeader, headerStyle];
    }, [headerStyle]);

    const renderStaticHeader = () => {
      return (
        <CalendarStaticHeader
          {...headerProps}
          testID={`${testID}.staticHeader`}
          style={staticHeaderStyle}
          headerDayLocale={locale}
          accessibilityElementsHidden={true} // iOS
          importantForAccessibility={'no-hide-descendants'} // Android
        />
      );
    };

    const scrollToDay = (date: Date, offset: number, animated: boolean) => {
      const differenceInMonth = getDifferenceInMonth(initialDate.current, date);
      let scrollAmount =
        calendarSize * pastScrollRange + differenceInMonth * calendarSize + (offset || 0);

      if (!horizontal) {
        const days = page(date, firstDay);

        let week = 0;
        for (let i = 0; i < days.length; i++) {
          week = Math.floor(i / 7);

          if (isSameDate(days[i], date)) {
            scrollAmount += 46 * week;
            break;
          }
        }
      }

      if (scrollAmount !== 0) {
        list.current?.scrollToOffset({ offset: scrollAmount, animated });
      }
    };

    const scrollToMonth = React.useCallback(
      (date: Date, offset?: number) => {
        const differenceInMonth = getDifferenceInMonth(initialDate.current, date);
        const scrollAmount =
          calendarSize * pastScrollRange + differenceInMonth * calendarSize + (offset || 0);
        list.current?.scrollToOffset({ offset: scrollAmount, animated: animateScroll });
      },
      [animateScroll, calendarSize, initialDate, pastScrollRange],
    );

    React.useImperativeHandle(ref, () => ({
      scrollToDay,
      scrollToMonth,
    }));

    React.useEffect(() => {
      if (current && isValidDateType(current)) {
        scrollToMonth(new Date(current));
      }
    }, [current, scrollToMonth]);

    useDidUpdate(() => {
      onVisibleMonthsChange?.(currentMonth);
    }, [currentMonth]);

    const getItemLayout = React.useCallback(
      (_: FlatListItem[] | undefined | null, index: number) => {
        return {
          length: calendarSize,
          offset: calendarSize * index,
          index,
        };
      },
      [calendarSize],
    );

    const isDateInRange = React.useCallback(
      (date: Date) => {
        for (let i = -range.current; i <= range.current; i++) {
          const newMonth = addMonths(currentMonth, i);
          if (isSameMonth(date, newMonth)) {
            return true;
          }
        }

        return false;
      },
      [currentMonth],
    );

    const getPeriodDates = React.useCallback(
      (item?: Date): _PeriodMarking | undefined => {
        if (!periodDates || !item) {
          return;
        }

        const periodInMonth = periodDates.dates.find(({ date: periodDate }) =>
          isSameMonth(periodDate, item),
        );

        if (!periodInMonth) {
          return;
        }

        return periodDates;
      },
      [periodDates],
    );

    const getBlockedDates = React.useCallback(
      (item?: Date): _BlockedMarking | undefined => {
        if (!blockedDates || !item) {
          return;
        }

        const blockedInMonth = blockedDates.dates.find((blockedDate) =>
          isSameMonth(blockedDate, item),
        );

        if (!blockedInMonth) {
          return;
        }

        return blockedDates;
      },
      [blockedDates],
    );

    const getDotDates = React.useCallback(
      (item?: Date): _DotMarking[] | undefined => {
        if (!dotDates || !item) {
          return;
        }

        const dotDateInMonth = dotDates.find(({ date }) => isSameMonth(date, item));
        if (!dotDateInMonth) {
          return;
        }

        return dotDates;
      },
      [dotDates],
    );

    const renderItem = React.useCallback(
      ({ item: { month } }: { item: FlatListItem }) => {
        const dateString = toMarkingFormat(month);
        const [dateYear, dateMonth] = dateString.split('-');
        const testId = `${testID}.item_${dateYear}-${dateMonth}`;

        return (
          <CalendarListItem
            {...calendarProps}
            testID={testId}
            blockedDates={getBlockedDates(month)}
            dotDates={getDotDates(month)}
            periodDates={getPeriodDates(month)}
            item={month}
            style={calendarStyle}
            horizontal={!!horizontal}
            calendarWidth={calendarWidth}
            calendarHeight={calendarHeight}
            scrollToMonth={scrollToMonth}
            visible={isDateInRange(month)}
          />
        );
      },
      [
        calendarHeight,
        calendarProps,
        calendarStyle,
        calendarWidth,
        getBlockedDates,
        getDotDates,
        getPeriodDates,
        horizontal,
        isDateInRange,
        scrollToMonth,
        testID,
      ],
    );

    const viewabilityConfig = React.useRef({
      viewAreaCoveragePercentThreshold: 20,
    });

    // update visibleMonth & currentMonth
    const onViewableItemsChanged = React.useCallback(
      ({ viewableItems }: { viewableItems: Array<ViewableMonthItems> }) => {
        const newVisibleMonth = viewableItems[0]?.item.month;
        if (isSameDate(visibleMonth.current, newVisibleMonth)) {
          return;
        }
        visibleMonth.current = newVisibleMonth; // update ref value
        setCurrentMonth(visibleMonth.current); // re-render?
      },
      [setCurrentMonth],
    );

    const viewabilityConfigCallbackPairs = React.useRef([
      {
        viewabilityConfig: viewabilityConfig.current,
        onViewableItemsChanged,
      },
    ]);

    return (
      <View testID={testID}>
        <FlatList
          ref={list}
          style={listStyle}
          showsVerticalScrollIndicator={showScrollIndicator}
          showsHorizontalScrollIndicator={showScrollIndicator}
          data={items}
          renderItem={renderItem}
          getItemLayout={getItemLayout}
          initialNumToRender={range.current}
          initialScrollIndex={initialDateIndex}
          viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
          testID={`${testID}.list`}
          onLayout={onLayout}
          removeClippedSubviews={removeClippedSubviews}
          pagingEnabled={pagingEnabled}
          scrollEnabled={scrollEnabled}
          scrollsToTop={scrollsToTop}
          horizontal={!!horizontal}
          keyboardShouldPersistTaps={keyboardShouldPersistTaps}
          keyExtractor={(item) => item.key}
          onEndReachedThreshold={onEndReachedThreshold}
          onEndReached={onEndReached}
          nestedScrollEnabled={nestedScrollEnabled}
          onMomentumScrollBegin={onMomentumScrollBegin}
          onMomentumScrollEnd={onMomentumScrollEnd}
          onScrollBeginDrag={onScrollBeginDrag}
          onScrollEndDrag={onScrollEndDrag}
        />
        {renderStaticHeader()}
      </View>
    );
  },
);

export default CalendarList;

/**
 * Example in React useRef hook:
 * const calendarRef = useRef<CalendarListRefType>(null);
 * calendarRef?.current?.scrollToMonth(date, offset, animated)
 */
export type CalendarListRefType = React.ElementRef<typeof CalendarList>;
