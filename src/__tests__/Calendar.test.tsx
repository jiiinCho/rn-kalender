import React from 'react';

import { fireEvent, render } from '@testing-library/react-native';

import { Calendar } from '../components';

const testIdCalendar = 'MyCalendar';
const testHeaderId = `${testIdCalendar}.header`;

const defaultProps = {
  testID: testIdCalendar,
};

describe('header arrows', () => {
  const onVisibleMonthsChangeMock = jest.fn();
  const current = '2023-01-15';

  const headerArrowDefaultProps = {
    ...defaultProps,
    current,
    onVisibleMonthsChange: onVisibleMonthsChangeMock,
  };

  it('should change month on press right arrow', () => {
    const nextMonth = new Date('2023-02-15');
    nextMonth.setUTCHours(0, 0, 0, 0);

    const { getByTestId } = render(<Calendar {...headerArrowDefaultProps} />);

    const headerRightArrow = getByTestId(`${testHeaderId}.rightArrow`);
    fireEvent(headerRightArrow, 'onPress');

    expect(onVisibleMonthsChangeMock).toHaveBeenCalledWith(nextMonth);
    expect(getByTestId(`${testHeaderId}.title`).props.children).toBe('Februari');
  });

  it('should change month on press left arrow', () => {
    const previousMonth = new Date('2022-12-15');
    previousMonth.setUTCHours(0, 0, 0, 0);

    const { getByTestId } = render(<Calendar {...headerArrowDefaultProps} />);

    const headerLeftArrow = getByTestId(`${testHeaderId}.leftArrow`);
    fireEvent(headerLeftArrow, 'onPress');

    expect(onVisibleMonthsChangeMock).toHaveBeenCalledWith(previousMonth);
    expect(getByTestId(`${testHeaderId}.title`).props.children).toBe('December');
  });
});

describe('month days', () => {
  const current = '2023-01-15';
  const defaultMonthProps = { ...defaultProps, current };

  it('should render month from `current` prop', () => {
    const { getAllByTestId, getByTestId } = render(<Calendar {...defaultMonthProps} />);

    for (let i = 1; i <= 31; i++) {
      expect(getAllByTestId(`${testIdCalendar}.day_${i}`)).toBeDefined();
    }

    expect(getByTestId(`${testIdCalendar}.header.title`).props.children).toBe('Januari');
  });

  it('should grey out extra days', () => {
    const customColor = '#AAA';
    const withThemeProp = { ...defaultMonthProps, theme: { disabledTextColor: customColor } };
    const { getAllByTestId } = render(<Calendar {...withThemeProp} />);

    const extraDay = getAllByTestId(`${testIdCalendar}.day_1`)[1].props.children.flat()[0];
    const extraDayStyles = extraDay.props.style.find((style: any) => style.color === customColor);

    const defaultDay = getAllByTestId(`${testIdCalendar}.day_1`)[0].props.children.flat()[0];
    const defaultDayStyles = defaultDay.props.style.find(
      (style: any) => style.color === customColor,
    );

    expect(extraDayStyles).not.toBeUndefined();
    expect(defaultDayStyles).toBeUndefined();
  });

  it('should not include extra days with `hideExtraDays={true}` prop', () => {
    const withHideExtraDaysProp = { ...defaultMonthProps, hideExtraDays: true };
    const { getAllByTestId } = render(<Calendar {...withHideExtraDaysProp} />);

    expect(getAllByTestId(`${testIdCalendar}.day_1`).length).toBe(1);
    expect(getAllByTestId(`${testIdCalendar}.day_2`).length).toBe(1);
  });

  it('should invoke `onDayPress` prop on day press', () => {
    const onDayPress = jest.fn();
    const withOnDayPressMock = { ...defaultMonthProps, onDayPress };

    const { getByTestId } = render(<Calendar {...withOnDayPressMock} />);
    const day = getByTestId(`${testIdCalendar}.day_15`);
    fireEvent(day, 'onPress');

    expect(onDayPress).toHaveBeenCalledWith('2023-01-15');
  });

  // TODO: it('should grey out dates not in interval between `minDate` and `maxDate`, () => {})
});

describe('Accessibility labels', () => {
  const current = '2023-01-15';
  const accessibilityDefaultProps = { ...defaultProps, current };
  it('should have default accessibility label', () => {
    const { getByTestId } = render(<Calendar {...accessibilityDefaultProps} />);
    expect(getByTestId(`${testIdCalendar}.day_10`).props.accessibilityLabel).toBe(
      'tisdag 10 januari 2023',
    );
  });
});

/* TODO: 
describe('Gesture Recognizer', () => {
  it('should not have `GestureRecognizer` root view by default', () => {});
  it('should have `GestureRecognizer` root view with `enableSwipeMonths={true}` prop', () => {});
  it('should not have `GestureRecognizer` root view with `enableSwipeMonths={false}` prop', () => {});
  it('should go forward on left swipe', () => {});
  it('should go back on right swipe', () => {});
});
*/
