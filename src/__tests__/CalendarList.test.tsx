import React from 'react';

import { render } from '@testing-library/react-native';
import en from 'date-fns/locale/en-GB';

import { CalendarList } from '../components';

describe('props', () => {
  const testIdCalendarList = 'MyCalendarList';
  const onVisibleMonthsChangeMock = jest.fn();

  const defaultProps = {
    testID: testIdCalendarList,
    onVisibleMonthsChange: onVisibleMonthsChangeMock,
  };

  it('should have correct number of list items', () => {
    const pastScrollRange = 5;
    const futureScrollRange = 5;
    const scrollProps = { ...defaultProps, pastScrollRange, futureScrollRange };

    const { getByTestId } = render(<CalendarList {...scrollProps} />);
    expect(getByTestId(`${testIdCalendarList}.list`).props.data.length).toBe(
      pastScrollRange + futureScrollRange + 1,
    );
  });

  it('should display current month', () => {
    const current = '2023-01-12';
    const props = { ...defaultProps, current };

    const { getByTestId } = render(<CalendarList {...props} />);

    // Header
    expect(getByTestId(`${testIdCalendarList}.item_2023-01.header.title`).props.children).toBe(
      'Januari',
    );

    // list
    expect(getByTestId(`${testIdCalendarList}.list`).props.horizontal).toBe(false);
    expect(getByTestId(`${testIdCalendarList}.list`).props.initialNumToRender).toBe(3);
    expect(getByTestId(`${testIdCalendarList}.list`).props.initialScrollIndex).toBe(6);

    // list item
    expect(getByTestId(`${testIdCalendarList}.item_2023-01`).props.children[0].props.current).toBe(
      '2023-01-01',
    );

    // events
    expect(onVisibleMonthsChangeMock).not.toHaveBeenCalled();
  });

  it('should render locale', () => {
    const current = '2023-01-12';
    const props = { ...defaultProps, current, locale: en };

    const { getByTestId } = render(<CalendarList {...props} />);

    // Header
    expect(getByTestId(`${testIdCalendarList}.item_2023-01.header.title`).props.children).toBe(
      'January',
    );
  });
});
