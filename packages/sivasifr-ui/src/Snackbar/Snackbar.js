import * as React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { ClickAwayListener } from '../ClickAwayListener'
import useEventCallback from '../utils/useEventCallback'
import capitalize from '../utils/capitalize'
import Grow from '../Transition/Grow'
import SnackbarContent from './SnackbarContent'
import styles from './Snackbar.module.css'

const Snackbar = React.forwardRef((props, ref) => {
  const {
    action,
    anchorOrigin: { vertical, horizontal } = { vertical: 'bottom', horizontal: 'left' },
    autoHideDuration = null,
    children,
    className,
    ClickAwayListenerProps,
    ContentProps,
    disableWindowBlurListener = false,
    message,
    onClose,
    onMouseEnter,
    onMouseLeave,
    open,
    resumeHideDuration,
    TransitionComponent = Grow,
    transitionDuration = {
      enter: 200,
      exit: 100,
    },
    TransitionProps: { onEnter, onExited, ...TransitionProps } = {},
    ...other
  } = props;

  const timerAutoHide = React.useRef();
  const [exited, setExited] = React.useState(true);

  const handleClose = useEventCallback((...args) => {
    if (onClose) {
      onClose(...args);
    }
  });

  const setAutoHideTimer = useEventCallback((autoHideDurationParam) => {
    if (!onClose || autoHideDurationParam == null) {
      return;
    }

    clearTimeout(timerAutoHide.current);
    timerAutoHide.current = setTimeout(() => {
      handleClose(null, 'timeout');
    }, autoHideDurationParam);
  });

  React.useEffect(() => {
    if (open) {
      setAutoHideTimer(autoHideDuration);
    }

    return () => {
      clearTimeout(timerAutoHide.current);
    };
  }, [open, autoHideDuration, setAutoHideTimer]);

  // Pause the timer when the user is interacting with the Snackbar
  // or when the user hide the window.
  const handlePause = () => {
    clearTimeout(timerAutoHide.current);
  };

  // Restart the timer when the user is no longer interacting with the Snackbar
  // or when the window is shown back.
  const handleResume = React.useCallback(() => {
    if (autoHideDuration != null) {
      setAutoHideTimer(resumeHideDuration != null ? resumeHideDuration : autoHideDuration * 0.5);
    }
  }, [autoHideDuration, resumeHideDuration, setAutoHideTimer]);

  const handleMouseEnter = (event) => {
    if (onMouseEnter) {
      onMouseEnter(event);
    }
    handlePause();
  };

  const handleMouseLeave = (event) => {
    if (onMouseLeave) {
      onMouseLeave(event);
    }
    handleResume();
  };

  const handleClickAway = (event) => {
    if (onClose) {
      onClose(event, 'clickaway');
    }
  };

  const handleExited = (node) => {
    setExited(true);

    if (onExited) {
      onExited(node);
    }
  };

  const handleEnter = (node, isAppearing) => {
    setExited(false);

    if (onEnter) {
      onEnter(node, isAppearing);
    }
  };

  React.useEffect(() => {
    // TODO: window global should be refactored here
    if (!disableWindowBlurListener && open) {
      window.addEventListener('focus', handleResume);
      window.addEventListener('blur', handlePause);

      return () => {
        window.removeEventListener('focus', handleResume);
        window.removeEventListener('blur', handlePause);
      };
    }

    return undefined;
  }, [disableWindowBlurListener, handleResume, open]);

  // So we only render active snackbars.
  if (!open && exited) {
    return null;
  }

  return (
    <ClickAwayListener onClickAway={handleClickAway} {...ClickAwayListenerProps}>
      <div
        className={clsx(
          styles.snackbar,
          styles[`anchorOrigin${capitalize(vertical)}${capitalize(horizontal)}`],
          className,
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={ref}
        {...other}
      >
        <TransitionComponent
          appear
          in={open}
          timeout={transitionDuration}
          direction={vertical === 'top' ? 'down' : 'up'}
          onEnter={handleEnter}
          onExited={handleExited}
          {...TransitionProps}
        >
          {children || <SnackbarContent message={message} action={action} {...ContentProps} />}
        </TransitionComponent>
      </div>
    </ClickAwayListener>
  );
});

Snackbar.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
     * The action to display. It renders after the message, at the end of the snackbar.
     */
  action: PropTypes.node,
  /**
     * The anchor of the `Snackbar`.
     * On smaller screens, the component grows to occupy all the available width,
     * the horizontal alignment is ignored.
     */
  anchorOrigin: PropTypes.shape({
    horizontal: PropTypes.oneOf(['center', 'left', 'right']).isRequired,
    vertical: PropTypes.oneOf(['bottom', 'top']).isRequired,
  }),
  /**
     * The number of milliseconds to wait before automatically calling the
     * `onClose` function. `onClose` should then set the state of the `open`
     * prop to hide the Snackbar. This behavior is disabled by default with
     * the `null` value.
     */
  autoHideDuration: PropTypes.number,
  /**
     * Replace the `SnackbarContent` component.
     */
  children: PropTypes.element,
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
     * Props applied to the `ClickAwayListener` element.
     */
  ClickAwayListenerProps: PropTypes.object,
  /**
     * Props applied to the [`SnackbarContent`](/api/snackbar-content/) element.
     */
  ContentProps: PropTypes.object,
  /**
     * If `true`, the `autoHideDuration` timer will expire even if the window is not focused.
     */
  disableWindowBlurListener: PropTypes.bool,
  /**
     * When displaying multiple consecutive Snackbars from a parent rendering a single
     * <Snackbar/>, add the key prop to ensure independent treatment of each message.
     * e.g. <Snackbar key={message} />, otherwise, the message may update-in-place and
     * features such as autoHideDuration may be canceled.
     */
  key: PropTypes.any,
  /**
     * The message to display.
     */
  message: PropTypes.node,
  /**
     * Callback fired when the component requests to be closed.
     * Typically `onClose` is used to set state in the parent component,
     * which is used to control the `Snackbar` `open` prop.
     * The `reason` parameter can optionally be used to control the response to `onClose`,
     * for example ignoring `clickaway`.
     *
     * @param {object} event The event source of the callback.
     * @param {string} reason Can be: `"timeout"` (`autoHideDuration` expired), `"clickaway"`.
     */
  onClose: PropTypes.func,
  /**
     * @ignore
     */
  onMouseEnter: PropTypes.func,
  /**
     * @ignore
     */
  onMouseLeave: PropTypes.func,
  /**
     * If `true`, `Snackbar` is open.
     */
  open: PropTypes.bool,
  /**
     * The number of milliseconds to wait before dismissing after user interaction.
     * If `autoHideDuration` prop isn't specified, it does nothing.
     * If `autoHideDuration` prop is specified but `resumeHideDuration` isn't,
     * we default to `autoHideDuration / 2` ms.
     */
  resumeHideDuration: PropTypes.number,
  /**
     * The component used for the transition.
     * [Follow this guide](/components/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
     */
  TransitionComponent: PropTypes.elementType,
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
  /**
     * Props applied to the transition element.
     * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition) component.
     */
  TransitionProps: PropTypes.object,
};

export default Snackbar
