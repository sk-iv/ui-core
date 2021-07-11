import PropTypes from 'prop-types'
import React from 'react'
import clsx from 'clsx'
import Clickable from '../Clickable'
import capitalize from '../utils/capitalize'
import styles from './IconButton.mdl.css'

/**
 * Refer to the [Icons](/style/glyphs) section of the documentation
 * regarding the available icon options.
 */
const IconButton = React.forwardRef((props, ref) => {
  const {
    edge = false,
    children,
    className,
    color = 'default',
    disabled = false,
    disableFocusRipple = false,
    size = 'medium',
    ...other
  } = props

  return (
    <Clickable
      className={clsx(
        styles.root,
        {
          [styles[`color${capitalize(color)}`]]: color !== 'default',
          [styles.disabled]: disabled,
          [styles[`icon-btn-size${capitalize(size)}`]]: size !== 'medium',
          [styles['icon-btn-edgeStart']]: edge === 'start',
          [styles['icon-btn-edgeEnd']]: edge === 'end',
        },
        className,
      )}
      centerRipple
      focusRipple={!disableFocusRipple}
      disabled={disabled}
      ref={ref}
      {...other}
    >
      <span className={styles.label}>{children}</span>
    </Clickable>
  )
})

IconButton.propTypes = {
  /**
    * The icon element.
    */
  // children: chainPropTypes(PropTypes.node, props => {
  //   const found = React.Children.toArray(props.children).some(
  //     child => React.isValidElement(child) && child.props.onClick,
  //   );
  //
  //   if (found) {
  //     return new Error(
  //       [
  //         'SivaSifr-UI: you are providing an onClick event listener ' +
  //           'to a child of a button element.',
  //         'Firefox will never trigger the event.',
  //         'You should move the onClick listener to the parent button element.',
  //         'https://github.com/mui-org/material-ui/issues/13957',
  //       ].join('\n'),
  //     );
  //   }
  //
  //   return null;
  // }),
  /**
    * Override or extend the styles applied to the component.
    * See [CSS API](#css) below for more details.
    */
  /**
    * @ignore
    */
  className: PropTypes.string,
  /**
    * The color of the component. It supports those theme colors that make sense for this component.
    */
  color: PropTypes.oneOf(['default', 'inherit', 'primary', 'secondary', 'accent']),
  /**
    * If `true`, the button will be disabled.
    */
  disabled: PropTypes.bool,
  /**
    * If `true`, the  keyboard focus ripple will be disabled.
    * `disableRipple` must also be true.
    */
  disableFocusRipple: PropTypes.bool,
  /**
    * If `true`, the ripple effect will be disabled.
    */
  disableRipple: PropTypes.bool,
  /**
    * If given, uses a negative margin to counteract the padding on one
    * side (this is often helpful for aligning the left or right
    * side of the icon with content above or below, without ruining the border
    * size and shape).
    */
  edge: PropTypes.oneOf(['start', 'end', false]),
  /**
    * The size of the button.
    * `small` is equivalent to the dense button styling.
    */
  size: PropTypes.oneOf(['small', 'medium']),
}

export default IconButton
