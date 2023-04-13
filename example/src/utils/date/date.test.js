import {
  getAllDaysInMonth,
  isValidDateType,
  isLTE,
  isGTE,
  isSameDate,
  isSameMonth,
  isDateNotInRange,
  startOfMonth,
  fromTo,
} from './date';

describe('isValidDateType', () => {
  it('returns false if argument is invalid Javascript Date object type', () => {
    const inValid = 'Nineteen ninety ninety nine December First';
    const emptyString = '';

    expect(isValidDateType(inValid)).toBeFalsy();
    expect(isValidDateType(emptyString)).toBeFalsy();
  });

  it('returns true if argument is valid Javascript Date object type', () => {
    const valid = '2023-03-26T22:00:00.000Z';
    expect(isValidDateType(valid)).toBeTruthy();
  });
});

describe('getAllDaysInMonth', () => {
  it('creates days array in given month', () => {
    const january = new Date('2023-01-15');
    const januaries = getAllDaysInMonth(january);
    expect(januaries).toHaveLength(31);

    const february = new Date('2023-02-02');
    const februaries = getAllDaysInMonth(february);
    expect(februaries).toHaveLength(28);

    const april = new Date('2023-04-27');
    const aprils = getAllDaysInMonth(april);
    expect(aprils).toHaveLength(30);

    const december = new Date('2023-12-24');
    const decembers = getAllDaysInMonth(december);
    expect(decembers).toHaveLength(31);
  });
});

describe('isLTE', () => {
  it('returns true if first date argument prior to second date argument', () => {
    const today = new Date('2023-03-27');
    const tomorrow = new Date('2023-03-28');
    expect(isLTE(today, tomorrow)).toBeTruthy();
  });
});

describe('isGTE', () => {
  it('returns false if first date argument prior to second date argument', () => {
    const today = new Date('2023-03-27');
    const tomorrow = new Date('2023-03-28');

    expect(isGTE(today, tomorrow)).toBeFalsy();
  });
});

describe('same', () => {
  it('compares if arguments are same date', () => {
    const dateA = new Date('2023-12-31');
    const dateB = new Date('2023-12-31');
    const dateC = new Date('2024-01-01');

    expect(isSameDate(dateA, dateB)).toBeTruthy();
    expect(isSameDate(dateA, dateC)).toBeFalsy();
  });

  it('compares if arguments are same month', () => {
    const dateA = new Date('2023-01-01');
    const dateB = new Date('2023-01-31');
    const dateC = new Date('2024-02-01');

    expect(isSameMonth(dateA, dateB)).toBeTruthy();
    expect(isSameMonth(dateA, dateC)).toBeFalsy();
  });
});

describe('isDateNotInRange', () => {
  it('returns true if given date is not in between minDate and maxDate', () => {
    const date = new Date('2023-04-01');
    const minDate = new Date('2022-12-31');
    const maxDate = new Date('2024-01-01');

    const truthyDate = new Date('2025-04-01');

    expect(isDateNotInRange(date, minDate, maxDate)).toBeFalsy();
    expect(isDateNotInRange(truthyDate, minDate, maxDate)).toBeTruthy();
  });
});

describe('startOfMonth', () => {
  it('returns YYYY-MM-01T00:00:00 from given javascript Date type object', () => {
    const date = new Date('2023-04-15T09:23:00.760Z');
    expect(startOfMonth(date).toISOString()).toBe('2023-04-01T00:00:00.000Z');
  });
});

describe('fromTo', () => {
  it('returns Date object array from start to end dates', () => {
    const from = new Date('2023-01-05');
    const to = new Date('2023-01-07');

    const result = fromTo(from, to);
    expect(result[1].getDate()).toBe(6);
  });
});
