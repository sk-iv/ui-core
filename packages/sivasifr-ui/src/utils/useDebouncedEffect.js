import { useEffect, useRef } from 'react';

function useDebouncedEffect(callback, delay, deps = []) {
  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    const handler = setTimeout(() => {
      callback();
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  },
  [delay, ...deps]);
}

export default useDebouncedEffect;
