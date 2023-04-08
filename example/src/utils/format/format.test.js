import { formatDay, formatMonth, formatUTCDate } from './format';
import en from 'date-fns/locale/en-GB';

describe('format', () => {
  it('format days in swedish locale by default', () => {
    const date = new Date('2023-03-27');
    expect(formatDay(date)).toBe('Måndag');
  });

  it('accepts any locale from date-fns/locale', () => {
    const date = new Date('2023-03-27');
    expect(formatDay(date, { locale: en })).toBe('Monday');
  });

  it('accepts patterns from date-fns definition', () => {
    const date = new Date('2023-03-27');
    expect(formatDay(date, { locale: en, pattern: 'EE' })).toBe('Mon');
  });

  it('format months in swedish locale by default', () => {
    const date = new Date('2023-03-27');
    expect(formatMonth(date)).toBe('Mars');
  });

  it('accepts any locales from date-fns/locale', () => {
    const date = new Date('2023-03-27');
    expect(formatMonth(date, { locale: en })).toBe('Mar');
  });

  it('accepts month patterns from date-fns definition', () => {
    const date = new Date('2023-03-27');
    expect(formatMonth(date, { locale: en, pattern: 'MMMM' })).toBe('March');
  });
});

describe('formatUTC', () => {
  it('returns YYYY-MM-DD foramt from given javascript Date type object', () => {
    const date = new Date('2023-04-01T09:23:00.760Z');
    expect(formatUTCDate(date)).toBe('2023-04-01');
  });
});
