import type { DotsProps } from '../components';

export interface Theme {
  textSectionTitleColor?: string;
  textSectionTitleDisabledColor?: string;
  textInactiveColor?: string;
  monthTextColor?: string;

  disabledBorderColor?: string;
  disabledTextColor?: string;

  calendarBackground?: string;

  selectedDayBackgroundColor?: string;
  selectedDayTextColor?: string;
  dayTextColor?: string;

  todayBorderColor?: string;
  todayTextColor?: string;

  periodBackgroundColor?: string;
  periodBorderColor?: string;

  blockedBackgroundColor?: string;
  blockedTextColor?: string;

  arrowColor?: string;
  disabledArrowColor?: string;

  weekVerticalMargin?: number;

  dotColor?: string;

  borderColor?: string;
}

export type Direction = 'left' | 'right';
export type DayState = 'selected' | 'disabled' | 'today' | '';

export type MarkedDates = {
  [key: string]: DotsProps;
};

export type DOT = {
  key?: string;
  color: string;
};

export type Marking = {
  activeOpacity?: number;
  disableTouchEvent?: boolean;
  accessibilityLabel?: string;
};

export type BlockedMarking = Marking & {
  dates: string[];
  borderColor?: string;
  backgroundColor?: string;
};

export type DotMarking = Marking & {
  date: string;
  dots: DOT[];
};

type PeriodDate = {
  startDate: string;
  endDate: string;
};

export type PeriodMarking = Marking & {
  dates: PeriodDate[];
  borderColor?: string;
  backgroundColor?: string;
};

export type _PeriodMarking = Marking & {
  dates: {
    start: boolean;
    end: boolean;
    date: Date;
  }[];
  borderColor?: string;
  backgroundColor?: string;
};

export type _BlockedMarking = Marking & {
  dates: Date[];
  borderColor?: string;
  backgroundColor?: string;
};

export type _DotMarking = Marking & {
  date: Date;
  dots: DOT[];
};
