import PropTypes from 'prop-types'
import React from 'react'
import clsx from 'clsx'
import Fade from '../Transition/Fade'
import styles from './Backdrop.module.css'

const Backdrop = React.forwardRef((props, ref) => {
  const {
    children,
    classes,
    className,
    invisible = false,
    open,
    transitionDuration,
    ...other
  } = props;

  return (
    <Fade in={open} timeout={transitionDuration} {...other}>
      <div
        data-mui-test="Backdrop"
        className={clsx(
          styles.backdrop,
          {
            [styles.invisible]: invisible,
          },
          className,
        )}
        aria-hidden
        ref={ref}
      >
        {children}
      </div>
    </Fade>
  );
});

Backdrop.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If `true`, the backdrop is invisible.
   * It can be used when rendering a popover or a custom select component.
   */
  invisible: PropTypes.bool,
  /**
   * If `true`, the backdrop is open.
   */
  open: PropTypes.bool.isRequired,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  transitionDuration: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      appear: PropTypes.number,
      enter: PropTypes.number,
      exit: PropTypes.number,
    }),
  ]),
};

export default Backdrop;
