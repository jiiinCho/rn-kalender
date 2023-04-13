import { differenceInMonths } from 'date-fns';

import { formatDay } from '../format';

export function isValidDateType(date: any): date is Date {
  return !!date && typeof date === 'string' && !isNaN(Date.parse(date));
}

export function isSameMonth(a: Date, b: Date) {
  return a.getUTCFullYear() === b.getUTCFullYear() && a.getUTCMonth() === b.getUTCMonth();
}

export function isSameDate(a: Date, b: Date) {
  return (
    a.getUTCFullYear() === b.getUTCFullYear() &&
    a.getUTCMonth() === b.getUTCMonth() &&
    a.getUTCDate() === b.getUTCDate()
  );
}

const ADayInMs = 60 * 60 * 24 * 1000;

export function addDays(date: Date, days: number) {
  const ms = date.getTime() + days * ADayInMs;
  return new Date(ms);
}

function substractDays(date: Date, days: number) {
  const ms = date.getTime() - days * ADayInMs;
  return new Date(ms);
}

function differenceInDays(from: Date, to: Date) {
  const diff = to.getTime() - from.getTime();
  return diff / ADayInMs;
}

export function fromTo(from: Date, to: Date) {
  const fromDate = new Date(from);
  const toDate = new Date(to);

  fromDate.setUTCHours(0, 0, 0, 0);
  toDate.setUTCHours(0, 0, 0, 0);

  const diffDays = differenceInDays(fromDate, toDate);

  let days = [fromDate];
  for (let i = 1; i <= diffDays; i++) {
    const day = addDays(fromDate, i);
    days.push(day);
  }

  return days;
}

function getLastDayOfMonth(source: Date) {
  const date = new Date(source);

  const currentMonth = date.getUTCMonth();
  const nextMonth = currentMonth + 1;
  date.setUTCMonth(nextMonth);
  date.setUTCDate(-1);

  const lastDayOfMonth = date.getUTCDate() + 1;
  date.setUTCDate(lastDayOfMonth);

  return date;
}

export function getAllDaysInMonth(source: Date) {
  const firstDayOfMonth = new Date(source);
  firstDayOfMonth.setUTCDate(1);
  const lastDayOfMonth = getLastDayOfMonth(firstDayOfMonth);

  return fromTo(firstDayOfMonth, lastDayOfMonth);
}

export function page(date: Date, firstDayOfWeek = 0, showSixWeeks = false) {
  const days = getAllDaysInMonth(date);
  let before: Date[] = [];
  let after: Date[] = [];

  const fdow = (7 + firstDayOfWeek) % 7; // first day of week, sunday(0) by default
  const ldow = (fdow + 6) % 7; // last day of week in this calendar, saturday (6) by default

  firstDayOfWeek = firstDayOfWeek || 0; // safe boundary?

  let from = days[0];
  let to = days[days.length - 1];

  // if first day is not sunday, make `from` to sunday => i.e. from: 2023-03-26T00:00:00.000Z
  if (from.getDay() !== fdow) {
    const daysToSubstract = (from.getDay() + 7 - fdow) % 7;
    from = substractDays(from, daysToSubstract);
  }

  if (to.getDay() !== ldow) {
    const daysToAdd = (ldow + 7 - to.getDay()) % 7;
    to = addDays(to, daysToAdd);
  }

  const daysForSixWeeks = (from.getDay() + days.length) / 6 >= 6;
  if (showSixWeeks && !daysForSixWeeks) {
    to = addDays(to, 7);
  }

  if (isLTE(from, days[0])) {
    before = fromTo(from, days[0]);
  }
  if (isGTE(to, days[days.length - 1])) {
    after = fromTo(days[days.length - 1], to);
  }

  return before.concat(days.slice(1, days.length - 1), after);
}

export function isLTE(a: Date, b: Date) {
  return differenceInDays(a, b) > -1;
}

export function isGTE(a: Date, b: Date) {
  return differenceInDays(b, a) > -1;
}

export function isDateNotInRange(date: Date, minDate: Date, maxDate: Date) {
  return !isGTE(date, minDate) || (maxDate && !isLTE(date, maxDate));
}

export function getDifferenceInMonth(initialDateSource: Date, currentDateSource: Date) {
  const initialDate = new Date(initialDateSource);
  const currentDate = new Date(currentDateSource);

  currentDate.setUTCDate(1);
  initialDate.setUTCDate(1);

  return differenceInMonths(currentDate, initialDate);
}

export function startOfMonth(source: Date) {
  const date = new Date(source);

  date.setUTCDate(1);
  date.setUTCHours(0, 0, 0, 0);

  return date;
}

export function weekDayNames(firstDayOfWeek = 0, locale: Locale) {
  const Sunday = new Date('2023-04-02');
  const Saturday = new Date('2023-04-08');
  const Week = fromTo(Sunday, Saturday);

  let weekDaysNames = Week.map((date) => formatDay(date, { pattern: 'EEE', locale }));
  const dayShift = firstDayOfWeek % 7;

  if (!!dayShift && weekDaysNames) {
    weekDaysNames = weekDaysNames.slice(dayShift).concat(weekDaysNames.slice(0, dayShift));
  }
  return weekDaysNames;
}
