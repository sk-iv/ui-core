// import type, {TransitionCallback} from "./Transition";
import { Transition } from 'react-transition-group';
import PropTypes from 'prop-types';
import React from 'react';
import { reflow, getTransitionProps } from './utils';
import useForkRef from '../utils/useForkRef';

// Only exported for tests.
export function getScale(value) {
  return `scale(${value}, ${value ** 2})`;
}

const styles = {
  entering: {
    opacity: 1,
    transform: getScale(1),
  },
  entered: {
    opacity: 1,
    transform: 'none',
  },
};


/**
 * Grow transition used by popovers such as Menu.
 */
const Grow = React.forwardRef((props, ref) => {
  const {
    children, in: inProp, onEnter, onExit, style, timeout = 'auto', ...other
  } = props;
  const timer = React.useRef();
  const autoTimeout = React.useRef();
  const handleRef = useForkRef(children.ref, ref);
  // const theme = useTheme();

  const handleEnter = (node, isAppearing) => {
    reflow(node); // So the animation always start from the start.

    const { duration: transitionDuration, delay } = getTransitionProps(
      { style, timeout },
      {
        mode: 'enter',
      },
    );

    let duration;
    if (timeout === 'auto') {
      duration = 300;
      autoTimeout.current = duration;
    } else {
      duration = transitionDuration;
    }

    node.style.transition = [
      'opacity',
      {
        duration,
      },
      'transform',
      {
        duration: duration * 0.666,
        delay: duration * 0.333,
      },
    ].join(',');

    if (onEnter) {
      onEnter(node, isAppearing);
    }
  };

  const handleExit = (node) => {
    const { duration: transitionDuration, delay } = getTransitionProps(
      { style, timeout },
      {
        mode: 'exit',
      },
    );

    let duration;
    if (timeout === 'auto') {
      duration = 300;
      autoTimeout.current = duration;
    } else {
      duration = transitionDuration;
    }

    node.style.transition = [
      'opacity',
      {
        duration,
      },
      'transform',
      {
        duration: duration * 0.666,
      },
    ].join(',');

    node.style.opacity = '0';
    node.style.transform = getScale(0.75);

    if (onExit) {
      onExit(node);
    }
  };

  const addEndListener = (_, next) => {
    if (timeout === 'auto') {
      timer.current = setTimeout(next, autoTimeout.current || 0);
    }
  };

  React.useEffect(() => () => {
    clearTimeout(timer.current);
  }, []);

  return (
    <Transition
      appear
      in={inProp}
      onEnter={handleEnter}
      onExit={handleExit}
      addEndListener={addEndListener}
      timeout={timeout === 'auto' ? null : timeout}
      {...other}
    >
      {(state, childProps) => React.cloneElement(children, {
        style: {
          opacity: 0,
          transform: getScale(0.75),
          visibility: state === 'exited' && !inProp ? 'hidden' : undefined,
          ...styles[state],
          ...style,
          ...children.props.style,
        },
        ref: handleRef,
        ...childProps,
      })}
    </Transition>
  );
});

Grow.propTypes = {

  /**
     * @ignore
     */
  appear: PropTypes.bool,

  /**
     * A single child content element.
     */
  children: PropTypes.element,

  /**
     * If `true`, show the component; triggers the enter or exit animation.
     */
  in: PropTypes.bool,

  /**
     * @ignore
     */
  onEnter: PropTypes.func,

  /**
     * @ignore
     */
  onEntered: PropTypes.func,

  /**
     * @ignore
     */
  onEntering: PropTypes.func,

  /**
     * @ignore
     */
  onExit: PropTypes.func,

  /**
     * @ignore
     */
  onExited: PropTypes.func,

  /**
     * @ignore
     */
  onExiting: PropTypes.func,

  /**
     * Use that property to pass a ref callback to the root component.
     */
  rootRef: PropTypes.func,

  /**
     * @ignore
     */
  style: PropTypes.object,

  /**
     * @ignore
     * /**
     * The duration for the transition, in milliseconds.
     * You may specify a single timeout for all transitions, or individually with an object.
     *
     * Set to 'auto' to automatically calculate transition time based on height.
     */
  timeout: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      enter: PropTypes.number,
      exit: PropTypes.number,
    }),
    PropTypes.oneOf(['auto']),
  ]),

  /**
     * The animation classNames applied to the component as it enters or exits.
     * This property is a direct binding to [`CSSTransition.classNames`](https://reactcommunity.org/react-transition-group/#CSSTransition-prop-classNames).
     */
  transitionClasses: PropTypes.shape({
    appear: PropTypes.string,
    appearActive: PropTypes.string,
    enter: PropTypes.string,
    enterActive: PropTypes.string,
    exit: PropTypes.string,
    exitActive: PropTypes.string,
  }),
};

Grow.defaultProps = {
  appear: true,
  timeout: 'auto',
};

export default Grow;
