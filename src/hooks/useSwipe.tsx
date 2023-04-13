import { settings } from '../consts';

export function useSwipe(onSwipeLeft?: any, onSwipeRight?: any, rangeOffset = 4) {
  const width = settings.screenWidth;

  let firstTouch = 0;

  // set user touch start position
  function onTouchStart(e: any) {
    firstTouch = e.nativeEvent.pageX;
  }

  // when touch ends check for swipe directions
  function onTouchEnd(e: any) {
    // get touch position and screen size
    const positionX = e.nativeEvent.pageX;
    const range = width / rangeOffset;

    // check if position is growing positively and has reached specified range
    if (positionX - firstTouch > range) {
      onSwipeRight?.();
    }
    // check if position is growing negatively and has reached specified range
    else if (firstTouch - positionX > range) {
      onSwipeLeft?.();
    }
  }

  return { onTouchStart, onTouchEnd };
}
