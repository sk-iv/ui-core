import React, { Children, cloneElement, isValidElement } from 'react';


// TODO: Make it private only in v5
export function setRef(ref, value) {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
}

export function cloneChildrenWithClassName(children, className) {
  return Children.map(children, (child) => isValidElement(child)
      && cloneElement(child, {
        className: child.props.hasOwnProperty('className')
          ? `${child.props.className} ${className}`
          : className,
      }));
}

export function isMuiElement(element, muiNames) {
  return isValidElement(element) && muiNames.indexOf(element.type.muiName) !== -1;
}

export function isMuiComponent(element, muiNames) {
  return muiNames.indexOf(element.muiName) !== -1;
}

export function useForkRef(refA, refB) {
  /**
   * This will create a new function if the ref props change and are defined.
   * This means react will call the old forkRef with `null` and the new forkRef
   * with the ref. Cleanup naturally emerges from this behavior
   */
  return React.useMemo(() => {
    if (refA == null && refB == null) {
      return null;
    }
    return (refValue) => {
      setRef(refA, refValue);
      setRef(refB, refValue);
    };
  }, [refA, refB]);
}
