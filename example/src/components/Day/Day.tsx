import * as React from 'react';

import { Text, TouchableOpacity } from 'react-native';
import type { ViewProps } from 'react-native';

import { omit, some, isEqual } from 'lodash';

import { Dots } from '../index';
import { getMarkingAccessibilityLabel } from '../../utils';
import type { DayState, Theme, BlockedMarking, PeriodMarking, Marking, DOT } from '../../consts';
import styles from './styles';

export interface DayProps extends ViewProps {
  state?: DayState;
  blockedDate?: Pick<BlockedMarking, 'borderColor' | 'backgroundColor'>;
  dotDate?: DOT[];
  periodDate?: Pick<PeriodMarking, 'borderColor' | 'backgroundColor'> & {
    start: boolean;
    end: boolean;
  };
  marking?: Marking;
  /** Theme object */
  theme?: Theme;
  /** onPress callback */
  onPress?: (date: string) => void;
  /** onLongPress callback */
  onLongPress?: (date: string) => void;
  /** Formatted date to return from press callbacks */
  date: string;
  /** Test ID */
  testID?: string;
  /** Provides custom day rendering component */
  DayComponent?: React.ComponentType<Omit<DayProps, 'DayComponent'>>;
  formattedDateStamp: string;
}

/**
 * If returns true, skip re-rendering
 * @returns boolean value whether previous and next props are equal
 */
function areEqual(prevProps: DayProps, nextProps: DayProps) {
  const prevPropsWithoutDotDates = omit(prevProps, 'dotDate');
  const nextPropsWithoutDotDates = omit(nextProps, 'dotDate');

  const didPropsChange = some(prevPropsWithoutDotDates, function (value, key) {
    const dayPropsKey = key as keyof typeof prevPropsWithoutDotDates;
    return value !== nextPropsWithoutDotDates[dayPropsKey];
  });

  // deep comparison
  const isMarkingEqual = isEqual(prevProps.dotDate, nextProps.dotDate);

  return !didPropsChange && isMarkingEqual;
}

const Day = React.memo(
  ({
    date,
    blockedDate,
    dotDate,
    periodDate,
    marking,
    DayComponent,
    onPress,
    onLongPress,
    theme,
    state,
    testID,
    formattedDateStamp,
  }: DayProps) => {
    const style = React.useRef(styles(theme));

    /* internal state */
    const isSelected = state === 'selected';
    const isDisabled = state === 'disabled';
    const isToday = state === 'today';

    // marking is superior to internal state
    const getContainerStyle = () => {
      const containerStyle = [];
      containerStyle.push(style.current.container);

      if (isSelected) {
        containerStyle.push(style.current.selected);
      } else if (isToday && !marking) {
        containerStyle.push(style.current.today);
      } else if (isDisabled) {
        containerStyle.push(style.current.disabled);
      }

      if (periodDate) {
        const { start, end, backgroundColor, borderColor } = periodDate;

        containerStyle.push({
          backgroundColor,
          borderColor,
        });

        // TODO: insert consumer styles
        if (start && !end) {
          containerStyle.push(style.current.periodStart);
        } else if (!start && end) {
          containerStyle.push(style.current.periodEnd);
        } else if (start && end) {
          containerStyle.push(style.current.periodStart);
          containerStyle.push(style.current.periodEnd);
        }
      }

      if (blockedDate) {
        containerStyle.push(style.current.blocked);
        if (blockedDate.backgroundColor) {
          containerStyle.push({
            backgroundColor: blockedDate.backgroundColor,
          });
        }

        if (blockedDate.borderColor) {
          containerStyle.push({
            borderColor: blockedDate.borderColor,
          });
        }
      }

      return containerStyle;
    };

    const getTextStyle = () => {
      const textStyle = [];
      textStyle.push(style.current.text);

      if (isSelected) {
        textStyle.push(style.current.selectedText);
      } else if (isDisabled) {
        textStyle.push(style.current.disabledText);
      } else if (isToday) {
        textStyle.push(style.current.todayText);
      }

      if (blockedDate) {
        textStyle.push(style.current.blockedText);
      }

      return textStyle;
    };

    const _onPress = React.useCallback(() => {
      onPress?.(date);
    }, [onPress, date]);

    const _onLongPress = React.useCallback(() => {
      onLongPress?.(date);
    }, [onLongPress, date]);

    const getAccessibilityLabel = React.useMemo(() => {
      const prefix = isToday ? 'today' : '';
      const markingAccessibilityLabel = getMarkingAccessibilityLabel({
        accessibilityLabel: marking?.accessibilityLabel,
        isSelected,
        isStartDay: !!periodDate?.start,
        isEndDay: !!periodDate?.end,
        isPeriod: !!periodDate?.start && !!periodDate?.end,
        isBlocked: !!blockedDate,
        isDisabled: isDisabled || !!marking?.disableTouchEvent,
      });

      return `${prefix} ${formattedDateStamp} ${markingAccessibilityLabel}`;
    }, [
      blockedDate,
      formattedDateStamp,
      isDisabled,
      isSelected,
      isToday,
      marking?.accessibilityLabel,
      marking?.disableTouchEvent,
      periodDate?.end,
      periodDate?.start,
    ]);

    if (DayComponent) {
      return (
        <DayComponent
          accessibilityLabel={getAccessibilityLabel}
          date={date}
          marking={marking}
          onPress={_onPress}
          onLongPress={_onLongPress}
          theme={theme}
          state={state}
          testID={testID}
          formattedDateStamp={formattedDateStamp}
        />
      );
    }

    return (
      <>
        <TouchableOpacity
          testID={testID}
          style={getContainerStyle()}
          disabled={marking?.disableTouchEvent}
          activeOpacity={marking?.activeOpacity}
          onPress={!marking?.disableTouchEvent ? _onPress : undefined}
          onLongPress={!marking?.disableTouchEvent ? _onLongPress : undefined}
          accessible
          accessibilityRole={isDisabled ? undefined : 'button'}
          accessibilityLabel={getAccessibilityLabel}
        >
          <Text allowFontScaling={false} style={getTextStyle()}>
            {date}
          </Text>
          {dotDate && <Dots theme={theme} dots={dotDate} />}
        </TouchableOpacity>
      </>
    );
  },
  areEqual,
) as any;

export default Day;
Day.displayName = 'Day';
