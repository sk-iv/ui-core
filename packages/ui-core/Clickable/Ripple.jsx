import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import useEventCallback from '../utils/useEventCallback';
import styles from './TouchRipple.mdl.css'

const useEnhancedEffect = typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect;

/**
 * @ignore - internal component.
 */
function Ripple(props) {
  const {
    pulsate = false,
    rippleX,
    rippleY,
    rippleSize,
    in: inProp,
    onExited = () => {},
    timeout,
  } = props;
  const [leaving, setLeaving] = React.useState(false)

  const rippleClassName = clsx(styles.ripple, styles.rippleVisible, {
    [styles.ripplePulsate]: pulsate,
    //[styles.leaving]: leaving,
  })

  const rippleStyles = {
    width: rippleSize,
    height: rippleSize,
    top: -(rippleSize / 2) + rippleY,
    left: -(rippleSize / 2) + rippleX,
  }

  // const childClassName = clsx(styles.child, {
  //   [styles.childLeaving]: leaving,
  //   [styles.childPulsate]: pulsate,
  // })

  const handleExited = useEventCallback(onExited)
  // Ripple is used for user feedback (e.g. click or press)
  // so we want to apply styles with the highest priority
  useEnhancedEffect(() => {
    if (!inProp) {
      // react-transition-group#onExit
      setLeaving(true)

      // react-transition-group#onExited
      const timeoutId = setTimeout(handleExited, timeout)
      return () => {
        clearTimeout(timeoutId)
      }
    }
    return undefined
  }, [handleExited, inProp, timeout])

  return (
    <span
      className={rippleClassName}
      style={rippleStyles}
    />
  )
}

Ripple.propTypes = {
  /**
   * @ignore - injected from TransitionGroup
   */
  in: PropTypes.bool,
  /**
   * @ignore - injected from TransitionGroup
   */
  onExited: PropTypes.func,
  /**
   * If `true`, the ripple pulsates, typically indicating the keyboard focus state of an element.
   */
  pulsate: PropTypes.bool,
  /**
   * Diameter of the ripple.
   */
  rippleSize: PropTypes.number,
  /**
   * Horizontal position of the ripple center.
   */
  rippleX: PropTypes.number,
  /**
   * Vertical position of the ripple center.
   */
  rippleY: PropTypes.number,
  /**
   * exit delay
   */
  timeout: PropTypes.number.isRequired,
}

export default Ripple
