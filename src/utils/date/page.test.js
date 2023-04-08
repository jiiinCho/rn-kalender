import { page } from './date';

describe('page', () => {
  it('returns full days for pagination in November 2021', () => {
    const today = new Date('2021-11-05');
    const result = page(today, 0, false);
    const firstDay = result[0];
    const lastDay = result[result.length - 1];

    expect(firstDay.getMonth()).toBe(9);
    expect(firstDay.getDate()).toBe(31);
    expect(lastDay.getMonth()).toBe(11);
    expect(lastDay.getDate()).toBe(4);
  });

  it('returns full days for pagination in December 2021', () => {
    const today = new Date('2021-12-05');
    const result = page(today, 0, false);
    const firstDay = result[0];
    const lastDay = result[result.length - 1];

    expect(firstDay.getMonth()).toBe(10);
    expect(firstDay.getDate()).toBe(28);
    expect(lastDay.getMonth()).toBe(0);
    expect(lastDay.getDate()).toBe(1);
  });

  it('returns full days for pagination in January 2022', () => {
    const today = new Date('2022-01-05');
    const result = page(today, 0, false);
    const firstDay = result[0];
    const lastDay = result[result.length - 1];

    expect(firstDay.getMonth()).toBe(11);
    expect(firstDay.getDate()).toBe(26);
    expect(lastDay.getMonth()).toBe(1);
    expect(lastDay.getDate()).toBe(5);
  });

  it('returns full days for pagination in February 2022', () => {
    const today = new Date('2022-02-05');
    const result = page(today, 0, false);
    const firstDay = result[0];
    const lastDay = result[result.length - 1];

    expect(firstDay.getMonth()).toBe(0);
    expect(firstDay.getDate()).toBe(30);
    expect(lastDay.getMonth()).toBe(2);
    expect(lastDay.getDate()).toBe(5);
  });

  it('returns full days for pagination in March 2022', () => {
    const today = new Date('2022-03-05');
    const result = page(today, 0, false);
    const firstDay = result[0];
    const lastDay = result[result.length - 1];

    expect(firstDay.getMonth()).toBe(1);
    expect(firstDay.getDate()).toBe(27);
    expect(lastDay.getMonth()).toBe(3);
    expect(lastDay.getDate()).toBe(2);
  });

  it('returns full days for pagination in April 2022', () => {
    const today = new Date('2022-04-05');
    const result = page(today, 0, false);
    const firstDay = result[0];
    const lastDay = result[result.length - 1];

    expect(firstDay.getMonth()).toBe(2);
    expect(firstDay.getDate()).toBe(27);
    expect(lastDay.getMonth()).toBe(3);
    expect(lastDay.getDate()).toBe(30);
  });

  it('returns full days for pagination in May 2022', () => {
    const today = new Date('2022-05-05');
    const result = page(today, 0, false);
    const firstDay = result[0];
    const lastDay = result[result.length - 1];

    expect(firstDay.getMonth()).toBe(4);
    expect(firstDay.getDate()).toBe(1);
    expect(lastDay.getMonth()).toBe(5);
    expect(lastDay.getDate()).toBe(4);
  });

  it('returns full days for pagination in June 2022', () => {
    const today = new Date('2022-06-05');
    const result = page(today, 0, false);
    const firstDay = result[0];
    const lastDay = result[result.length - 1];

    expect(firstDay.getMonth()).toBe(4);
    expect(firstDay.getDate()).toBe(29);
    expect(lastDay.getMonth()).toBe(6);
    expect(lastDay.getDate()).toBe(2);
  });

  it('returns full days for pagination in July 2022', () => {
    const today = new Date('2022-07-05');
    const result = page(today, 0, false);
    const firstDay = result[0];
    const lastDay = result[result.length - 1];

    expect(firstDay.getMonth()).toBe(5);
    expect(firstDay.getDate()).toBe(26);
    expect(lastDay.getMonth()).toBe(7);
    expect(lastDay.getDate()).toBe(6);
  });

  it('returns full days for pagination in August 2022', () => {
    const today = new Date('2022-08-05');
    const result = page(today, 0, false);
    const firstDay = result[0];
    const lastDay = result[result.length - 1];

    expect(firstDay.getMonth()).toBe(6);
    expect(firstDay.getDate()).toBe(31);
    expect(lastDay.getMonth()).toBe(8);
    expect(lastDay.getDate()).toBe(3);
  });

  it('returns full days for pagination in September 2022', () => {
    const today = new Date('2022-09-05');
    const result = page(today, 0, false);
    const firstDay = result[0];
    const lastDay = result[result.length - 1];

    expect(firstDay.getMonth()).toBe(7);
    expect(firstDay.getDate()).toBe(28);
    expect(lastDay.getMonth()).toBe(9);
    expect(lastDay.getDate()).toBe(1);
  });

  it('returns full days for pagination in October 2022', () => {
    const today = new Date('2022-10-05');
    const result = page(today, 0, false);
    const firstDay = result[0];
    const lastDay = result[result.length - 1];

    expect(firstDay.getMonth()).toBe(8);
    expect(firstDay.getDate()).toBe(25);
    expect(lastDay.getMonth()).toBe(10);
    expect(lastDay.getDate()).toBe(5);
  });

  it('returns full days for pagination in November 2022', () => {
    const today = new Date('2022-11-05');
    const result = page(today, 0, false);
    const firstDay = result[0];
    const lastDay = result[result.length - 1];

    expect(firstDay.getMonth()).toBe(9);
    expect(firstDay.getDate()).toBe(30);
    expect(lastDay.getMonth()).toBe(11);
    expect(lastDay.getDate()).toBe(3);
  });

  it('returns full days for pagination in December 2022', () => {
    const today = new Date('2022-12-05');
    const result = page(today, 0, false);
    const firstDay = result[0];
    const lastDay = result[result.length - 1];

    expect(firstDay.getMonth()).toBe(10);
    expect(firstDay.getDate()).toBe(27);
    expect(lastDay.getMonth()).toBe(11);
    expect(lastDay.getDate()).toBe(31);
  });

  it('returns full days for pagination in March 2023', () => {
    const today = new Date('2023-03-02');
    const result = page(today, 0, false);
    const firstDay = result[0];
    const lastDay = result[result.length - 1];

    expect(firstDay.getFullYear()).toBe(2023);
    expect(firstDay.getMonth()).toBe(1);
    expect(firstDay.getDate()).toBe(26);

    expect(lastDay.getFullYear()).toBe(2023);
    expect(lastDay.getMonth()).toBe(3);
    expect(lastDay.getDate()).toBe(1);
  });

  it('returns full days for pagination in April 2023', () => {
    const today = new Date('2023-04-02');
    const result = page(today, 0, false);
    const firstDay = result[0];
    const lastDay = result[result.length - 1];

    expect(firstDay.getMonth()).toBe(2);
    expect(firstDay.getDate()).toBe(26);
    expect(lastDay.getMonth()).toBe(4);
    expect(lastDay.getDate()).toBe(6);
  });

  it('returns full days for pagination in December 2023', () => {
    const today = new Date('2023-12-31');
    const result = page(today, 0, false);
    const firstDay = result[0];
    const lastDay = result[result.length - 1];

    expect(firstDay.getMonth()).toBe(10);
    expect(firstDay.getDate()).toBe(26);
    expect(lastDay.getMonth()).toBe(0);
    expect(lastDay.getDate()).toBe(6);
  });
});

describe('page options', () => {
  it('starts from Monday if firstDayOfWeek set to 1', () => {
    const today = new Date('2023-01-01');
    const result = page(today, 1, false);
    const firstDay = result[0];
    const lastDay = result[result.length - 1];

    expect(firstDay.getFullYear()).toBe(2022);
    expect(firstDay.getMonth()).toBe(11);
    expect(firstDay.getDate()).toBe(26);

    expect(lastDay.getFullYear()).toBe(2023);
    expect(lastDay.getMonth()).toBe(1);
    expect(lastDay.getDate()).toBe(5);
  });

  it('starts from Tuesday if firstDayOfWeek set to 2', () => {
    const today = new Date('2023-12-31');
    const result = page(today, 2, false);
    const firstDay = result[0];
    const lastDay = result[result.length - 1];

    expect(firstDay.getFullYear()).toBe(2023);
    expect(firstDay.getMonth()).toBe(10);
    expect(firstDay.getDate()).toBe(28);

    expect(lastDay.getFullYear()).toBe(2024);
    expect(lastDay.getMonth()).toBe(0);
    expect(lastDay.getDate()).toBe(1);
  });
});
