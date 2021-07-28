import React from 'react'
import clsx from 'clsx'
import IconSvg from '@sivasifr/icons/IconSvg'

import Clickable from '../Clickable'
import capitalize from '../utils/capitalize'
import styles from './Button.mdl.css'

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
    size = 'md',
    startIcon: startIconProp,
    type = 'button',
    loading,
    variant = 'contained',
    ...other
  } = props

  const startIcon = startIconProp && (
    <span className={clsx(styles.startIcon, `iconSize${capitalize(size)}`)}>
      {startIconProp}
    </span>
  )
  const endIcon = endIconProp && (
    <span className={clsx(styles.endIcon, `iconSize${capitalize(size)}`)}>
      {endIconProp}
    </span>
  )

  return (
    <Clickable
      className={clsx(
        styles.root,
        styles[variant],
        {
          [styles[`color${capitalize(color)}`]]: color !== 'default',
          [styles[`size${capitalize(size)}`]]: size !== 'md',
          [styles.disabled]: disabled,
          [styles.fullWidth]: fullWidth,
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
      {loading 
      ? <IconSvg name="circle" className="offset-path" />
      : <span className={styles.label}>{children}</span>}
    </Clickable>
  )
})

Button.displayName = 'Button'

export default Button
