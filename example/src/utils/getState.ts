import type { CalendarProps } from '../components';
import type { DayState } from '../consts';
import { isSameDate, isDateNotInRange, isValidDateType, isSameMonth } from './date';

type StateOptions = Pick<CalendarProps, 'minDate' | 'maxDate' | 'disabledByDefault'> & {
  day: Date;
  current: Date;
};

export const getState = ({
  day,
  current,
  minDate,
  maxDate,
  disabledByDefault,
}: StateOptions): DayState => {
  let state = 'default' as DayState;

  if (isSameDate(day, new Date())) {
    state = 'today' as DayState;
  }

  if (disabledByDefault) {
    state = 'disabled' as DayState;
  }

  const isValidMinDate = !!minDate && isValidDateType(minDate);
  const isValidMaxDate = !!maxDate && isValidDateType(maxDate);

  if (
    isValidMinDate &&
    isValidMaxDate &&
    isDateNotInRange(day, new Date(minDate), new Date(maxDate))
  ) {
    state = 'disabled' as DayState;
  }

  if (!isSameMonth(day, current)) {
    state = 'disabled' as DayState;
  }

  return state;
};
