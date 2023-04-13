/* eslint-disable @typescript-eslint/no-unused-vars */
import type { CalendarProps, CalendarStaticHeaderProps, CalendarListProps } from '../components';

export function extractHeaderProps(props: CalendarProps) {
  const {
    theme,
    firstDay,
    displayLoadingIndicator,
    headerMonthFormat,
    hideDayNames,
    hideArrows,
    renderArrow,
    onPressArrowLeft,
    onPressArrowRight,
    disableArrowLeft,
    disableArrowRight,
    disabledDaysIndexes,
    renderHeader,
    customHeaderTitle,
    current,
    testID,
  } = props;

  const headerProps = {
    theme,
    firstDay,
    displayLoadingIndicator,
    headerMonthFormat,
    hideDayNames,
    hideArrows,
    renderArrow,
    onPressArrowLeft,
    onPressArrowRight,
    disableArrowLeft,
    disableArrowRight,
    disabledDaysIndexes,
    renderHeader,
    customHeaderTitle,
    current,
    testID,
  };

  return headerProps;
}

export function extractStaticHeaderProps(props: CalendarProps): CalendarStaticHeaderProps {
  const { theme, firstDay, disabledDaysIndexes, testID } = props;

  const calendarStaticHeaderProps: CalendarStaticHeaderProps = {
    theme,
    firstDay,
    disabledDaysIndexes,
    testID,
  };

  return calendarStaticHeaderProps;
}

export function extractCalendarProps(props: Omit<CalendarListProps, 'ref' | 'initialDate'>) {
  const {
    pastScrollRange,
    futureScrollRange,
    calendarWidth,
    calendarHeight,
    calendarStyle,
    showScrollIndicator,
    animateScroll,
    scrollEnabled,
    scrollsToTop,
    pagingEnabled,
    horizontal,
    keyboardShouldPersistTaps,
    onEndReachedThreshold,
    onEndReached,
    nestedScrollEnabled,
    ...others
  } = props;

  return others;
}
