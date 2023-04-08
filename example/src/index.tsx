import React from 'react';

import { CalendarList, CalendarListProps, Calendar } from './components';
import type {
  BlockedMarking,
  _BlockedMarking,
  DotMarking,
  _DotMarking,
  PeriodMarking,
  _PeriodMarking,
} from './consts';
import { fromTo, isValidDateType, printInvalidErrorLog } from './utils';

interface KalenderProps
  extends Omit<
    CalendarListProps,
    'blockedDates' | 'dotDates' | 'periodDates' | 'blockedDate' | 'dotDate' | 'periodDate'
  > {
  isList?: boolean;
  blockedDates?: BlockedMarking;
  dotDates?: DotMarking[];
  periodDates?: PeriodMarking;
}

const Kalender = ({
  isList,
  blockedDates,
  dotDates,
  periodDates,
  current,
  ...rest
}: KalenderProps) => {
  const validPeriodDates = React.useMemo<_PeriodMarking | undefined>(() => {
    if (!periodDates) {
      return undefined;
    }

    const { dates, ...restOptions } = periodDates;
    const validDates = dates.filter(
      ({ startDate, endDate }) => isValidDateType(startDate) && isValidDateType(endDate),
    );

    if (!validDates.length) {
      printInvalidErrorLog('periodDates.dates');
      return;
    }

    const periods = validDates.map(({ startDate, endDate }) => {
      return fromTo(new Date(startDate), new Date(endDate)).map((periodDate, index, row) => {
        if (index === 0) {
          return { start: true, end: false, date: periodDate };
        } else if (index === row.length - 1) {
          return { start: false, end: true, date: periodDate };
        } else {
          return { start: true, end: true, date: periodDate };
        }
      });
    });

    return { dates: periods.flat(), ...restOptions };
  }, [periodDates]);

  const validBlockDates = React.useMemo<_BlockedMarking | undefined>(() => {
    if (!blockedDates) {
      return undefined;
    }
    const { dates, ...restOptions } = blockedDates;

    const validDates = dates
      .filter((blockedDate) => isValidDateType(blockedDate))
      .map((date) => new Date(date));

    if (!validDates.length) {
      printInvalidErrorLog('blockedDates.dates');
      return;
    }

    return { dates: validDates, ...restOptions };
  }, [blockedDates]);

  const validDotDates = React.useMemo<_DotMarking[] | undefined>(() => {
    if (!dotDates) {
      return undefined;
    }
    const validDates = dotDates
      .filter(({ date }) => isValidDateType(date))
      .map(({ date, ...restOptions }) => ({
        date: new Date(date),
        ...restOptions,
      }));

    if (!validDates.length) {
      printInvalidErrorLog('dotDates.date');
      return;
    }

    return validDates;
  }, [dotDates]);

  if (isList) {
    return (
      <CalendarList
        current={current}
        blockedDates={validBlockDates}
        dotDates={validDotDates}
        periodDates={validPeriodDates}
        {...rest}
      />
    );
  } else {
    return (
      <Calendar
        blockedDates={validBlockDates}
        dotDates={validDotDates}
        periodDates={validPeriodDates}
      />
    );
  }
};

export default Kalender;
