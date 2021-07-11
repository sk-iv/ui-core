import PropTypes from 'prop-types'
import React from 'react'
import clsx from 'clsx'
import IconSvg, { icons24 } from '@sivasifr/icons/IconSvg'
import SwitchBase from '../SwitchBase'
import styles from './Checkbox.mdl.css'

const Checkbox = (props) => {
  const {
    checkedIcon,
    className,
    color,
    icon,
    indeterminate,
    indeterminateIcon,
    inputProps,
    ...other
  } = props

  return (
    <SwitchBase
      type="checkbox"
      checkedIcon={indeterminate ? indeterminateIcon : checkedIcon}
      className={clsx(
        {
          indeterminate,
        },
        className,
      )}
      inputProps={{
        'data-indeterminate': indeterminate,
        ...inputProps,
      }}
      icon={indeterminate ? indeterminateIcon : icon}
      {...other}
    />
  )
}

Checkbox.defaultProps = {
  checked: false,
  checkedIcon: <IconSvg name="checkBox" />,
  color: 'secondary',
  icon: <IconSvg name="square" />,
  indeterminate: false,
  indeterminateIcon: <IconSvg name="checkBoxIndeterminate" />,
}

export default Checkbox
