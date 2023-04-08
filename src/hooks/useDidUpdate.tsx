import * as React from 'react';

export const useDidUpdate = (callback: () => void, dep: React.DependencyList) => {
  const isMounted = React.useRef<boolean>(false);

  React.useEffect(() => {
    if (isMounted.current) {
      callback();
    } else {
      isMounted.current = true;
    }
  }, [callback, dep]);
};
