import { format, Locale } from 'date-fns';
import sv from 'date-fns/locale/sv';

type FormatDateOptions = {
  pattern?: string;
  locale?: Locale;
  capitalizeFirstLetter?: boolean; // some locales are lowecase in first letter by default
};

export function formatMonth(date: Date, options: FormatDateOptions = {}) {
  const { pattern = 'MMM', locale = sv, capitalizeFirstLetter = true } = options;
  const formatted = format(date, pattern, { locale });
  return !capitalizeFirstLetter ? formatted : _capitalizeFirstLetter(formatted);
}

function _capitalizeFirstLetter(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function formatDay(date: Date, options: FormatDateOptions = {}) {
  const { pattern = 'EEEE', locale = sv, capitalizeFirstLetter = true } = options;
  const formatted = format(date, pattern, { locale });
  return !capitalizeFirstLetter ? formatted : _capitalizeFirstLetter(formatted);
}

export function formatUTCDate(source: number | Date): string {
  return new Date(source).toISOString().split('T')[0];
}

export function toMarkingFormat(date: Date) {
  return date.toISOString().split('T')[0];
}

export function formatAccessbilityDate(date: Date, locale?: Locale) {
  return format(date, 'EEEE dd MMMM yyyy', { locale });
}
