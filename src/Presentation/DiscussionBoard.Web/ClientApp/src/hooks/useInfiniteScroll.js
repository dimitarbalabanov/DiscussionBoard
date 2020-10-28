import { useEffect, useRef, useState } from 'react';
import useWindowSize from './useWindowSize';
import useInterval from './useInterval';
import { isNullOrUndefined } from './utils';

function getElementSizes(element) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const parentRect = element.getBoundingClientRect();
  const { top, bottom, left, right } = parentRect;
  return { top, bottom, left, right };
}

function isElementInView(element) {
  if (element) {
    const { left, right, top, bottom } = getElementSizes(element);
    if (left > windowWidth) {
      return false;
    } else if (right < 0) {
      return false;
    } else if (top > windowHeight) {
      return false;
    } else if (bottom < 0) {
      return false;
    }
  }

  return true;
}

// export interface UseInfiniteScrollArgs {
//   // Some sort of "fetching" info of the request.
//   loading: boolean;
//   // If the list has more items to load.
//   hasNextPage: boolean;
//   // The callback function to execute when the threshold is exceeded.
//   onLoadMore: Function;
//   // Maximum distance to bottom of the window/parent to trigger the callback. Default is 150.
//   threshold?: number;
//   // Frequency to check the dom. Default is 200.
//   checkInterval?: number;
//   // May be `"window"` or `"parent"`. Default is `"window"`. If you want to use a scrollable parent for the infinite list, use `"parent"`.
//   scrollContainer?: InfiniteScrollContainer;
// }

function useInfiniteScroll({
  loading,
  hasNextPage,
  onLoadMore,
  threshold = 150,
  checkInterval = 200,
}) {
  const ref = useRef(null);
  const { height: windowHeight, width: windowWidth } = useWindowSize();
  // Normally we could use the "loading" prop, but when you set "checkInterval" to a very small
  // number (like 10 etc.), some request components can't set its loading state
  // immediately (I had this problem with react-apollo's Query component. In some cases, it runs
  // "updateQuery" twice). Thus we set our own "listen" state which immeadiately turns to "false" on
  // calling "onLoadMore".
  const [listen, setListen] = useState(true);

  useEffect(() => {
    if (!loading) {
      setListen(true);
    }
  }, [loading]);

  function getBottomOffset() {
    const element = ref.current;
    if (!element || isNullOrUndefined(windowHeight)) {
      return null;
    }

    const rect = element.getBoundingClientRect();
    const bottom = rect.bottom;
    let bottomOffset = bottom - windowHeight;

    return bottomOffset;
  }

  function isListInView() {
    const element = ref.current;
    if (
      !element ||
      isNullOrUndefined(windowHeight) ||
      isNullOrUndefined(windowWidth)
    ) {
      return false;
    }
    return isElementInView(element, windowHeight, windowWidth);
  }

  function listenBottomOffset() {
    if (listen && !loading && hasNextPage) {
      if (ref.current) {
        if (!isListInView()) {
          return;
        }

        // Check if the distance between bottom of the container and bottom of the window or parent
        // is less than "threshold"
        const bottomOffset = getBottomOffset();

        if (isNullOrUndefined(bottomOffset)) {
          return;
        }

        const validOffset = bottomOffset < threshold;

        if (validOffset) {
          setListen(false);
          onLoadMore();
        }
      }
    }
  }

  useInterval(
    () => {
      listenBottomOffset();
    },
    // Stop interval when there is no next page.
    hasNextPage ? checkInterval : 0,
  );

  return ref;
}

export default useInfiniteScroll;
