import React from 'react';

import { fireEvent, render } from '@testing-library/react-native';

import { Kalender } from '..';

const testIdKalender = 'MyKalender';
const current = '2023-01-15';

const defaultProps = {
  testID: testIdKalender,
  current,
};

describe('props', () => {
  it('should not invoke `onDayPress` on dates with disabled touch events', () => {
    const onDayPress = jest.fn();
    const { getByTestId } = render(
      <Kalender
        {...defaultProps}
        blockedDates={{ dates: ['2023-01-20'], disableTouchEvent: true }}
        onDayPress={onDayPress}
        isList={false}
      />,
    );

    const disabledDay = getByTestId(`${testIdKalender}.day_20`);
    fireEvent(disabledDay, 'onPress');
    expect(onDayPress).not.toHaveBeenCalledWith();
  });

  it('should mark blocked dates', () => {
    const color = '#AAA';
    const { getByTestId } = render(
      <Kalender
        {...defaultProps}
        blockedDates={{ dates: ['2023-01-20'], backgroundColor: color }}
        isList={false}
      />,
    );

    expect(getByTestId(`${testIdKalender}.day_20`).props.style.backgroundColor).toBe(color);
  });

  it('should mark today', () => {
    const today = new Date().toISOString().slice(0, 10);
    const todayDate = new Date().getDate() < 10 ? `0${new Date().getDate()}` : new Date().getDate();
    const todayColor = '#CCC';

    const { getByText } = render(
      <Kalender
        {...defaultProps}
        current={today}
        isList={false}
        theme={{ todayTextColor: todayColor }}
      />,
    );

    const todayElementStyle = getByText(String(todayDate)).props.style;
    const found = todayElementStyle.find(({ color }: any) => color === todayColor);
    expect(found).not.toBeUndefined();
  });

  // TODO: it('should mark selected day', () => {});
});

describe('Accessibility labels', () => {
  it('should have correct label for blocked date', () => {
    const { getByTestId } = render(
      <Kalender
        {...defaultProps}
        current={current}
        blockedDates={{ dates: ['2023-01-20'] }}
        isList={false}
      />,
    );

    expect(getByTestId(`${testIdKalender}.day_20`).props.accessibilityLabel).toBe(
      'fredag 20 januari 2023 blocked',
    );
  });

  it('should have correct label for disabled touch event', () => {
    const { getByTestId } = render(
      <Kalender
        {...defaultProps}
        current={current}
        blockedDates={{ dates: ['2023-01-20'], disableTouchEvent: true }}
        isList={false}
      />,
    );
    expect(getByTestId(`${testIdKalender}.day_20`).props.accessibilityLabel).toBe(
      'fredag 20 januari 2023 blocked disabled',
    );
  });

  it('should have correct label for period start', () => {
    const { getByTestId } = render(
      <Kalender
        {...defaultProps}
        current={current}
        periodDates={{
          dates: [
            {
              startDate: '2023-01-12',
              endDate: '2023-01-15',
            },
            {
              startDate: '2023-01-20',
              endDate: '2023-01-22',
            },
          ],
        }}
        isList={false}
      />,
    );

    expect(getByTestId(`${testIdKalender}.day_12`).props.accessibilityLabel).toBe(
      'torsdag 12 januari 2023 period start',
    );
    expect(getByTestId(`${testIdKalender}.day_20`).props.accessibilityLabel).toBe(
      'fredag 20 januari 2023 period start',
    );
  });

  it('should have correct label for period end', () => {
    const { getByTestId } = render(
      <Kalender
        {...defaultProps}
        current={current}
        periodDates={{
          dates: [
            {
              startDate: '2023-01-12',
              endDate: '2023-01-15',
            },
            {
              startDate: '2023-01-20',
              endDate: '2023-01-22',
            },
          ],
        }}
        isList={false}
      />,
    );

    expect(getByTestId(`${testIdKalender}.day_15`).props.accessibilityLabel).toBe(
      'söndag 15 januari 2023 period end',
    );
    expect(getByTestId(`${testIdKalender}.day_22`).props.accessibilityLabel).toBe(
      'söndag 22 januari 2023 period end',
    );
  });

  // TODO: it('should have correct label for selected date', () => {});
});
