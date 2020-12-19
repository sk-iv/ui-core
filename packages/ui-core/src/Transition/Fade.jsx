import PropTypes from 'prop-types';
import React from 'react';
import Transition from 'react-transition-group/Transition';

const reflow = (node) => node.scrollTop;

/**
 * The Fade transition is used by the Modal component.
 * It's using [react-transition-group](https://github.com/reactjs/react-transition-group) internally.
 */
const Fade = React.forwardRef((props, ref) => {
  const {
    children,
    in: inProp,
    onEnter,
    onExit,
    style,
    timeout = defaultTimeout,
    ...other
  } = props;
  const theme = useTheme();
  const handleRef = useForkRef(children.ref, ref);

  const handleEnter = (node, isAppearing) => {
    reflow(node); // So the animation always start from the start.

    const transitionProps = getTransitionProps(
      { style, timeout },
      {
        mode: 'enter',
      },
    );

    node.style.webkitTransition = theme.transitions.create('opacity', transitionProps);
    node.style.transition = theme.transitions.create('opacity', transitionProps);

    if (onEnter) {
      onEnter(node, isAppearing);
    }
  };

  const handleExit = (node) => {
    const transitionProps = getTransitionProps(
      { style, timeout },
      {
        mode: 'exit',
      },
    );

    node.style.webkitTransition = theme.transitions.create('opacity', transitionProps);
    node.style.transition = theme.transitions.create('opacity', transitionProps);

    if (onExit) {
      onExit(node);
    }
  };

  return (
    <Transition
      appear
      in={inProp}
      onEnter={handleEnter}
      onExit={handleExit}
      timeout={timeout}
      {...other}
    >
      {(state, childProps) => React.cloneElement(children, {
        style: {
          opacity: 0,
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

Fade.propTypes = {

  /**
     * @ignore
     */
  appear: PropTypes.bool,

  /**
     * A single child content element.
     */
  children: PropTypes.element,

  /**
     * If `true`, the component will transition in.
     */
  in: PropTypes.bool,

  /**
     * @ignore
     */
  onEnter: PropTypes.func,

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
  style: PropTypes.object,

  /**
     * The duration for the transition, in milliseconds.
     * You may specify a single timeout for all transitions, or individually with an object.
     */
  timeout: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      enter: PropTypes.number,
      exit: PropTypes.number,
    }),
  ]),
};

Fade.defaultProps = {
  appear: true,
  timeout: {
    enter: 300,
    exit: 300,
  },
};

export default Fade;
