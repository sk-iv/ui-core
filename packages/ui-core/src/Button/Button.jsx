import PropTypes from 'prop-types'
import React from 'react'
import clsx from 'clsx'

import ButtonBase from '../Clickable'
import capitalize from '../utils/capitalize'
import styles from './Button.module.css'

const Button = React.forwardRef((props, ref) => {
  const {
    children,
    className,
    color = 'default',
    component = 'button',
    disabled = false,
    disableFocusRipple = false,
    endIcon: endIconProp,
    focusVisibleClassName,
    fullWidth = false,
    size = 'medium',
    startIcon: startIconProp,
    type = 'button',
    variant = 'contained',
    ...other
  } = props;

  const startIcon = startIconProp && (
    <span className={clsx('btn-startIcon', `iconSize-${capitalize(size)}`)}>
      {startIconProp}
    </span>
  );
  const endIcon = endIconProp && (
    <span className={clsx('btn-endIcon', `iconSize-${capitalize(size)}`)}>
      {endIconProp}
    </span>
  );

  return (
    <ButtonBase
      className={clsx(
        styles.btn,
        {
          [styles[`color${capitalize(color)}`]]: color === 'default',
          [styles['btn--sm']]: size === 'small',
          [styles['btn--lg']]: size === 'large',
          [styles.disabled]: disabled,
          [styles.outlined]: variant === 'outlined',
          [styles.contained]: variant === 'contained',
          [styles['w-100']]: fullWidth,
        },
        className,
      )}
      component={component}
      disabled={disabled}
      focusRipple={!disableFocusRipple}
      focusVisibleClassName={clsx(styles.focusVisible, focusVisibleClassName)}
      ref={ref}
      type={type}
      {...other}
    >
      <span className={styles.label}>
        {startIcon}
        {children}
        {endIcon}
      </span>
    </ButtonBase>
  )
})
Button.propTypes = {
  /**
   * The content of the button.
   */
  children: PropTypes.node.isRequired,
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
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: PropTypes.elementType,
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
   *
   * ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
   * to highlight the element by applying separate styles with the `focusVisibleClassName`.
   */
  disableRipple: PropTypes.bool,
  /**
   * Element placed after the children.
   */
  endIcon: PropTypes.node,
  /**
   * @ignore
   */
  focusVisibleClassName: PropTypes.string,
  /**
   * If `true`, the button will take up the full width of its container.
   */
  fullWidth: PropTypes.bool,
  /**
   * The URL to link to when the button is clicked.
   * If defined, an `a` element will be used as the root node.
   */
  href: PropTypes.string,
  /**
   * The size of the button.
   * `small` is equivalent to the dense button styling.
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * Element placed before the children.
   */
  startIcon: PropTypes.node,
  /**
   * @ignore
   */
  type: PropTypes.string,
  /**
   * The variant to use.
   */
  variant: PropTypes.oneOf(['outlined', 'contained']),
};

export default Button;
