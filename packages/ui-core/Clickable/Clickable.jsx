import PropTypes from 'prop-types'
import React from 'react'
import ReactDOM from 'react-dom'
import clsx from 'clsx'
import TouchRipple from './TouchRipple'
import { useForkRef, useEventCallback, useIsFocusVisible } from '../utils'
import styles from './Clickable.mdl.css'

const Clickable = React.forwardRef((props, ref) => {
  const {
    action,
    buttonRef: buttonRefProp,
    centerRipple = false,
    children,
    className,
    component = 'button',
    disabled = false,
    disableRipple = false,
    disableTouchRipple = false,
    focusRipple = false,
    focusVisibleClassName,
    onBlur,
    onClick,
    onFocus,
    onFocusVisible,
    onKeyDown,
    onKeyUp,
    onMouseDown,
    onMouseLeave,
    onMouseUp,
    onTouchEnd,
    onTouchMove,
    onTouchStart,
    onDragLeave,
    selected,
    tabIndex = 0,
    TouchRippleProps,
    type = 'button',
    ...other
  } = props

  const buttonRef = React.useRef(null)
  function getButtonNode() {
    // #StrictMode ready
    return ReactDOM.findDOMNode(buttonRef.current)
  }

  const rippleRef = React.useRef(null)
  const [diameter, setDiameter] = React.useState(10)
  const [ripple, setRipple] = React.useState(false)
  const [pulsated, setPulsated] = React.useState(false)

  const [focusVisible, setFocusVisible] = React.useState(false)
  if (disabled && focusVisible) {
    setFocusVisible(false)
  }
  const {
    isFocusVisibleRef,
    onBlur: handleBlurVisible,
    onFocus: handleFocusVisible,
    ref: focusVisibleRef
  } = useIsFocusVisible()

  React.useEffect(() => {
    isFocusVisibleRef.current = focusVisible;
  }, [focusVisible, isFocusVisibleRef])

  React.useImperativeHandle(
    action,
    () => ({
      focusVisible: () => {
        setFocusVisible(true);
        buttonRef.current.focus();
      },
    }),
    [],
  )

  React.useEffect(() => {
    if (focusVisible && focusRipple && !disableRipple) {
      setPulsated(true)
    }
  }, [disableRipple, focusRipple, focusVisible])

  function useRippleHandler(rippleAction, eventCallback, skipRippleAction = disableTouchRipple) {
    return useEventCallback((event) => {
      if (eventCallback) {
        eventCallback(event)
      }

      return true
    })
  }

  React.useEffect(() => {

    if (buttonRef.current) {
      setDiameter(Math.max(buttonRef.current.offsetWidth, buttonRef.current.offsetHeight))
    }

  }, [buttonRef])

  const handleMouseDown = useRippleHandler('start', onMouseDown)
  const handleDragLeave = useRippleHandler('stop', onDragLeave)
  const handleMouseUp = useRippleHandler('stop', onMouseUp)
  const handleMouseLeave = useRippleHandler('stop', (event) => {
    if (focusVisible) {
      event.preventDefault()
    }
    if (onMouseLeave) {
      onMouseLeave(event)
    }
  })
  const handleTouchStart = useRippleHandler('start', onTouchStart)
  const handleTouchEnd = useRippleHandler('stop', onTouchEnd)
  const handleTouchMove = useRippleHandler('stop', onTouchMove)
  const handleBlur = useRippleHandler(
    'stop',
    (event) => {
      if (focusVisible) {
        handleBlurVisible(event)
        setFocusVisible(false)
        setPulsated(false)
      }
      if (onBlur) {
        onBlur(event)
      }
    },
    false,
  )

  const handleFocus = useEventCallback((event) => {
    // Fix for https://github.com/facebook/react/issues/7769
    if (!buttonRef.current) {
      buttonRef.current = event.currentTarget
    }
    handleFocusVisible(event)
    if (isFocusVisibleRef.current === true) {
      setFocusVisible(true)

      if (onFocusVisible) {
        onFocusVisible(event)
      }
    }

    if (onFocus) {
      onFocus(event)
    }
  })

  const isNonNativeButton = () => {
    const button = getButtonNode()
    return component && component !== 'button' && !(button.tagName === 'A' && button.href)
  }

  /**
   * IE 11 shim for https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/repeat
   */
  const keydownRef = React.useRef(false)
  const handleKeyDown = useEventCallback((event) => {
    // Check if key is already down to avoid repeats being counted as multiple activations
    if (
      focusRipple
      && !keydownRef.current
      && focusVisible
      && event.key === ' '
    ) {
      keydownRef.current = true
      event.persist()
    }

    if (event.target === event.currentTarget && isNonNativeButton() && event.key === ' ') {
      event.preventDefault()
    }

    if (onKeyDown) {
      onKeyDown(event)
    }

    // Keyboard accessibility for non interactive elements
    if (
      event.target === event.currentTarget
      && isNonNativeButton()
      && event.key === 'Enter'
      && !disabled
    ) {
      event.preventDefault()
      if (onClick) {
        onClick(event)
      }
    }
  })

  const handleKeyUp = useEventCallback((event) => {
    // calling preventDefault in keyUp on a <button> will not dispatch a click event if Space is pressed
    // https://codesandbox.io/s/button-keyup-preventdefault-dn7f0
    if (
      focusRipple
      && event.key === ' '
      && focusVisible
      && !event.defaultPrevented
    ) {
      keydownRef.current = false
      event.persist()
    }
    if (onKeyUp) {
      onKeyUp(event)
    }

    // Keyboard accessibility for non interactive elements
    if (
      onClick
      && event.target === event.currentTarget
      && isNonNativeButton()
      && event.key === ' '
      && !event.defaultPrevented
    ) {
      onClick(event)
    }
  })

  const handleClick = useEventCallback((event) => {
    setRipple(true)
    if (onClick) {
      onClick(event)
    }
  })

  const handleAnimationEnd = () => {
    setRipple(false)
  }

  const handleOwnRef = useForkRef(focusVisibleRef, buttonRef);
  const handleRef = useForkRef(ref, handleOwnRef);

  let ComponentProp = component

  if (ComponentProp === 'button' && other.href) {
    ComponentProp = 'a'
  }

  const buttonProps = {}
  if (ComponentProp === 'button') {
    buttonProps.type = type
    buttonProps.disabled = disabled
  } else {
    if (ComponentProp !== 'a' || !other.href) {
      buttonProps.role = 'button'
    }
    buttonProps['aria-disabled'] = disabled
  }

  const [mountedState, setMountedState] = React.useState(false)

  React.useEffect(() => {
    setMountedState(true)
  }, [])

  const enableTouchRipple = mountedState && !disableRipple && !disabled

  return (
    <ComponentProp
      aria-selected={selected}
      className={clsx(
        styles.root,
        {
          [styles.active]: enableTouchRipple,
          [styles.focusVisible]: focusVisible,
          [focusVisibleClassName]: focusVisible,
          [styles.ripple]: ripple,
          [styles.pulsate]: pulsated,
        },
        className,
      )}
      style={{ "--height": `${diameter}px`, "--width": `${diameter}px`, "--duration": `${diameter / 0.2}ms` }}
      onBlur={handleBlur}
      onClick={handleClick}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onDragLeave={handleDragLeave}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchStart}
      onAnimationEnd={handleAnimationEnd}
      ref={handleRef}
      tabIndex={disabled ? -1 : tabIndex}
      {...buttonProps}
      {...other}
    >
      {children}
    </ComponentProp>
  )
})

Clickable.displayName = 'Clickable'

Clickable.propTypes = {
  /**
   * Infinite animation shine to attract attention.
   */
  attention: PropTypes.bool,
  /**
   * A ref for imperative actions.
   * It currently only supports `focusVisible()` action.
   */
  // action: refType,
  /**
   * Use that prop to pass a ref to the native button component.
   * @deprecated Use `ref` instead.
   */
  // buttonRef: refType,
  /**
   * If `true`, the ripples will be centered.
   * They won't start at the cursor interaction position.
   */
  centerRipple: PropTypes.bool,
  /**
   * The content of the component.
   */
  children: PropTypes.node,

  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  // component: elementTypeAcceptingRef,
  /**
   * If `true`, the base button will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the ripple effect will be disabled.
   *
   * ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
   * to highlight the element by applying separate styles with the `focusVisibleClassName`.
   */
  disableRipple: PropTypes.bool,
  /**
   * If `true`, the touch ripple effect will be disabled.
   */
  disableTouchRipple: PropTypes.bool,
  /**
   * If `true`, the base button will have a keyboard focus ripple.
   * `disableRipple` must also be `false`.
   */
  focusRipple: PropTypes.bool,
  /**
   * This prop can help a person know which element has the keyboard focus.
   * The class name will be applied when the element gain the focus through a keyboard interaction.
   * It's a polyfill for the [CSS :focus-visible selector](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo).
   * The rationale for using this feature [is explained here](https://github.com/WICG/focus-visible/blob/master/explainer.md).
   * A [polyfill can be used](https://github.com/WICG/focus-visible) to apply a `focus-visible` class to other components
   * if needed.
   */
  focusVisibleClassName: PropTypes.string,
  /**
   * @ignore
   */
  onBlur: PropTypes.func,
  /**
   * @ignore
   */
  onClick: PropTypes.func,
  /**
   * @ignore
   */
  onDragLeave: PropTypes.func,
  /**
   * @ignore
   */
  onFocus: PropTypes.func,
  /**
   * Callback fired when the component is focused with a keyboard.
   * We trigger a `onFocus` callback too.
   */
  onFocusVisible: PropTypes.func,
  /**
   * @ignore
   */
  onKeyDown: PropTypes.func,
  /**
   * @ignore
   */
  onKeyUp: PropTypes.func,
  /**
   * @ignore
   */
  onMouseDown: PropTypes.func,
  /**
   * @ignore
   */
  onMouseLeave: PropTypes.func,
  /**
   * @ignore
   */
  onMouseUp: PropTypes.func,
  /**
   * @ignore
   */
  onTouchEnd: PropTypes.func,
  /**
   * @ignore
   */
  onTouchMove: PropTypes.func,
  /**
   * @ignore
   */
  onTouchStart: PropTypes.func,
  /**
   * @ignore
   */
  role: PropTypes.string,
  /**
   * @ignore
   */
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * Props applied to the `TouchRipple` element.
   */
  TouchRippleProps: PropTypes.object,
  /**
   * Used to control the button's purpose.
   * This prop passes the value to the `type` attribute of the native button component.
   */
  type: PropTypes.oneOf(['submit', 'reset', 'button']),
}

export default Clickable
