import { isLTE, isGTE, getDifferenceInMonth } from './date';

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

describe('getDifferenceInMonth', () => {
  it('returns positive value if baseDate is prior to currentDate', () => {
    const initialDate = new Date('2023-01-01');
    const currentDate = new Date('2023-12-25');
    expect(getDifferenceInMonth(initialDate, currentDate)).toBe(11);
  });

  it('returns negative value if currentDate is prior to baseDate', () => {
    const initialDate = new Date('2023-12-25');
    const currentDate = new Date('2023-01-01');
    expect(getDifferenceInMonth(initialDate, currentDate)).toBe(-11);
  });
});
