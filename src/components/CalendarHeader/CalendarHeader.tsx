import * as React from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleProp,
  ViewStyle,
  AccessibilityActionEvent,
  ColorValue,
  Insets,
} from 'react-native';

import type { Locale } from 'date-fns';
import { includes } from 'lodash';

import styles from './styles';
import type { Theme, Direction } from '../../consts';
import { weekDayNames, forwardRef, formatMonth } from '../../utils';

export interface CalendarHeaderProps {
  month: Date;
  addMonth?: (num: number) => void;
  /** Specify theme properties to override specific styles for calendar parts */
  theme?: Theme;
  /** If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday */
  firstDay?: number;
  /** Display loading indicator. Default = false */
  displayLoadingIndicator?: boolean;
  /** Foreground color of loading spinner */
  loadingIndicatorColor?: ColorValue;
  /** Month format in the title. Formatting values: https://date-fns.org/v2.29.3/docs/format */
  headerMonthFormat?: string;
  /** Month locale in the title. Locale lists: https://github.com/date-fns/date-fns/tree/main/src/locale */
  monthLocale?: Locale;
  /** Hide day names */
  hideDayNames?: boolean;
  /** Hide month navigation arrows */
  hideArrows?: boolean;
  /** Replace default arrows with custom ones (direction can be 'left' or 'right') */
  renderArrow?: (direction: Direction) => React.ReactNode;
  /** Handler which gets executed when press arrow icon left. It receive a callback can go back month */
  onPressArrowLeft?: (method: () => void, month?: Date) => void;
  /** Handler which gets executed when press arrow icon right. It receive a callback can go next month */
  onPressArrowRight?: (method: () => void, month?: Date) => void;
  /** Left & Right arrows. Additional distance outside of the buttons in which a press is detected, default: 20 */
  arrowsHitSlop?: Insets | number;
  /** Disable left arrow */
  disableArrowLeft?: boolean;
  /** Disable right arrow */
  disableArrowRight?: boolean;
  /** Apply custom disable color to selected day indexes */
  disabledDaysIndexes?: number[];
  /** Replace default title with custom one. the function receive a date as parameter */
  renderHeader?: (date: string) => React.ReactNode;
  /** Replace default title to custom string */
  customHeaderTitle?: string;
  /** Provide aria-level for calendar heading for proper accessibility when used with web (react-native-web) */
  testID?: string;
  style?: StyleProp<ViewStyle>;
  /** IOS support, set it true to turn off voice over. Default is false */
  accessibilityElementsHidden?: boolean;
  /** Android, to avoid confusion for accessibility service in case overlapping UI components with the same parent. Default auto */
  importantForAccessibility?: 'auto' | 'yes' | 'no' | 'no-hide-descendants';
  /** The current date presented */
  current?: string;
}

export interface CalenderHeaderImperativeMethods {
  onPressLeft: () => void;
  onPressRight: () => void;
}

/**
 * increment:
 * On iOS, VoiceOver generates this action when the component
 * has a role of 'adjustable' and the user places focus on it
 * and swipes upward. On Android, TalkBack generates this action
 * when the user places accessibility focus on the component
 * and presses the volume up button.
 */
const accessibilityActions = [
  { name: 'increment', label: 'increment' },
  { name: 'decrement', label: 'decrement' },
];

const CalendarHeader = forwardRef<CalenderHeaderImperativeMethods, CalendarHeaderProps>(
  (props, ref) => {
    const {
      theme,
      style: propsStyle,
      addMonth: propsAddMonth,
      month,
      headerMonthFormat = 'MMMM',
      monthLocale,
      firstDay,
      hideDayNames,
      hideArrows,
      renderArrow,
      onPressArrowLeft,
      onPressArrowRight,
      arrowsHitSlop = 20,
      disableArrowLeft,
      disableArrowRight,
      disabledDaysIndexes,
      displayLoadingIndicator,
      loadingIndicatorColor,
      renderHeader,
      customHeaderTitle,
      testID,
      accessibilityElementsHidden,
      importantForAccessibility,
    } = props;

    const style = React.useRef(styles(theme));

    // TODO: Test arrowsHitSlop
    const hitSlop = React.useMemo(
      () =>
        typeof arrowsHitSlop === 'number'
          ? {
              top: arrowsHitSlop,
              left: arrowsHitSlop,
              bottom: arrowsHitSlop,
              right: arrowsHitSlop,
            }
          : arrowsHitSlop,
      [arrowsHitSlop],
    );

    const addMonth = React.useCallback(() => {
      propsAddMonth?.(1);
    }, [propsAddMonth]);

    const subtractMonth = React.useCallback(() => {
      propsAddMonth?.(-1);
    }, [propsAddMonth]);

    const onPressLeft = React.useCallback(() => {
      if (typeof onPressArrowLeft === 'function') {
        return onPressArrowLeft(subtractMonth, month);
      }
      return subtractMonth();
    }, [onPressArrowLeft, subtractMonth, month]);

    const onPressRight = React.useCallback(() => {
      if (typeof onPressArrowRight === 'function') {
        return onPressArrowRight(addMonth, month);
      }
      return addMonth();
    }, [onPressArrowRight, addMonth, month]);

    React.useImperativeHandle(ref, () => ({
      onPressLeft,
      onPressRight,
    }));

    const renderWeekDays = React.useMemo(() => {
      const weekDaysNames = weekDayNames(firstDay);

      if (!weekDaysNames) {
        return null;
      }

      return weekDaysNames.map((day: string, index: number) => {
        const dayStyle = [];
        dayStyle.push(style.current.dayHeader);

        if (includes(disabledDaysIndexes, index)) {
          dayStyle.push(style.current.disabledDayHeader);
        }

        return (
          <Text
            allowFontScaling={false}
            key={index}
            style={dayStyle}
            numberOfLines={1}
            accessibilityLabel={''}
          >
            {hideDayNames ? '' : day}
          </Text>
        );
      });
    }, [disabledDaysIndexes, firstDay, hideDayNames]);

    const _renderHeader = () => {
      if (!renderHeader) {
        return (
          <View style={style.current.headerMonthTextContainer}>
            <Text
              allowFontScaling={false}
              style={style.current.monthText}
              testID={`${testID}.title`}
            >
              {customHeaderTitle ||
                formatMonth(month, { locale: monthLocale, pattern: headerMonthFormat })}
            </Text>
            <View style={style.current.headerYearContainer}>
              <Text
                allowFontScaling={false}
                style={style.current.yearText}
                testID={`${testID}.year`}
              >
                {`/ ${formatMonth(month, { locale: monthLocale, pattern: 'yyyy' })}`}
              </Text>
            </View>
          </View>
        );
      }

      return renderHeader(month.toString());
    };

    const _renderArrow = (direction: Direction) => {
      if (hideArrows) {
        return <View />;
      }

      const isLeft = direction === 'left';
      const arrowId = isLeft ? 'leftArrow' : 'rightArrow';
      const shouldDisable = isLeft ? disableArrowLeft : disableArrowRight;
      const onPress = !shouldDisable ? (isLeft ? onPressLeft : onPressRight) : undefined;
      const imageSource = isLeft ? require('./img/previous.png') : require('./img/next.png');
      const renderArrowDirection = isLeft ? 'left' : 'right';

      return (
        <TouchableOpacity
          accessibilityRole="button"
          onPress={onPress}
          disabled={shouldDisable}
          style={style.current.arrow}
          hitSlop={hitSlop}
          testID={`${testID}.${arrowId}`}
        >
          {renderArrow ? (
            renderArrow(renderArrowDirection)
          ) : (
            <Image
              accessibilityIgnoresInvertColors={true}
              source={imageSource}
              style={shouldDisable ? style.current.disabledArrowImage : style.current.arrowImage}
            />
          )}
        </TouchableOpacity>
      );
    };

    const renderDayNames = () => {
      return (
        <View style={style.current.week} testID={`${testID}.dayNames`}>
          {renderWeekDays}
        </View>
      );
    };

    /**
     * Allow assistive technology to programmatically invoke the actions of a component
     * should be paried with `accessibilityActions` prop
     * */
    const onAccessibilityAction = React.useCallback(
      (event: AccessibilityActionEvent) => {
        switch (event.nativeEvent.actionName) {
          case 'decrement':
            onPressLeft();
            break;
          case 'increment':
            onPressRight();
            break;
          default:
            break;
        }
      },
      [onPressLeft, onPressRight],
    );

    return (
      <View
        testID={testID}
        style={propsStyle}
        accessible
        accessibilityRole={'adjustable'}
        accessibilityActions={accessibilityActions}
        onAccessibilityAction={onAccessibilityAction}
        accessibilityElementsHidden={accessibilityElementsHidden} // iOS
        importantForAccessibility={importantForAccessibility} // Android
      >
        <View style={style.current.header}>
          <View style={style.current.headerContainer}>
            {_renderHeader()}
            {displayLoadingIndicator && (
              <ActivityIndicator color={loadingIndicatorColor} testID={`${testID}.loader`} />
            )}
          </View>
          <View style={style.current.arrowContainer}>
            {_renderArrow('left')}
            {_renderArrow('right')}
          </View>
        </View>
        {!hideDayNames && renderDayNames()}
      </View>
    );
  },
);

export default CalendarHeader;
CalendarHeader.displayName = 'CalendarHeader';

export type CalendarHeaderRefType = React.ElementRef<typeof CalendarHeader>;
