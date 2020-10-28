import { useRef, useEffect, useCallback } from 'react';

/**
 * @param {Function} onIntersect Function to call once intersected
 * @param {Object} optionsData Options object used to initialize IntersectionObserver
 * @param {boolean} onlyOnce Whether to stop observing after onIntersect is fired once
 * 
 * @returns {Object} A ref object created by useRef. Use this to assign to the element you want to observe.
 *
 * Usage:
 * const Component = () => {
 *   const targetRef = useIntersect(() => console.log('impressed!'));
 *
 *   return <div ref={targetRef}>Something here</div>
 * }
 */

const initialOptions = {
  root: null,
  rootMargin: '0px',
  threshold: [0.05, 0.3, 0.6, 0.95],
};

const useIntersect = (onIntersect, optionsData, onlyOnce = false) => {
  console.log("inside useIntersect")
  const intersected = useRef(false);
  const targetRef = useRef();
  const observer = useRef(null);

  const options = optionsData || initialOptions;

  const handleIntersect = useCallback(
    entries => {
      const isIntersecting = entries[0] && entries[0].isIntersecting || false;
      console.log("inside handleIntersect")
      if (isIntersecting) {
        console.log("tuka se presicha")
        onIntersect();

        if (!intersected.current && observer.current && onlyOnce) {
          observer.current.disconnect();
          observer.current = null;
          intersected.current = true;
        }
      }
    },
    [onIntersect, observer, intersected],
  );

  useEffect(() => {
    if (!intersected.current && !observer.current) {
      console.log("pravq observera")
      observer.current = new IntersectionObserver(handleIntersect, options);
      observer.current.observe(targetRef.current);
    }

    return () => {
      if (observer.current) {
        console.log("unmointvam")
        observer.current.disconnect();
        observer.current = null;
      }
    };
  }, [handleIntersect, options, targetRef]);

  return targetRef;
};

export default useIntersect;