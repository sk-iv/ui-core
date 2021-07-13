import PropTypes from 'prop-types'
import React from 'react'
import clsx from 'clsx'
import refType from '../utils/refType'
import useFormControl from './useFormControl'
import styles from './FormControlLabel.mdl.css'

/**
 * Drop in replacement of the `Radio`, `Switch` and `Checkbox` component.
 * Use this component if you want to display an extra label.
 */
const FormControlLabel = React.forwardRef((props, ref) => {
  const {
    checked,
    className,
    control,
    disabled: disabledProp,
    error,
    inputRef,
    label,
    labelPlacement = 'end',
    name,
    onChange,
    required,
    value,
    ...other
  } = props
  const muiFormControl = useFormControl()

  let disabled = disabledProp;
  if (typeof disabled === 'undefined' && typeof control.props.disabled !== 'undefined') {
    disabled = control.props.disabled
  }
  if (typeof disabled === 'undefined' && muiFormControl) {
    disabled = muiFormControl.disabled
  }

  const controlProps = {
    disabled,
    className: styles.control,
  }
  ;['checked', 'name', 'onChange', 'value', 'inputRef'].forEach((key) => {
    if (typeof control.props[key] === 'undefined' && typeof props[key] !== 'undefined') {
      controlProps[key] = props[key]
    }
  })

  return (
    <label
      className={clsx(
        styles.root,
        {
          [styles.disabled]: disabled,
          [styles.required]: required,
          [styles.error]: error,
        },
        className,
      )}
      ref={ref}
      {...other}
    >
      {React.cloneElement(control, controlProps)}
      <span
        className={clsx(styles.label, { 'FormControlLabel-disabled': disabled })}
      >
        {label}
      </span>
    </label>
  )
})

FormControlLabel.propTypes = {
  /**
    * If `true`, the component appears selected.
    */
  checked: PropTypes.bool,
  /**
    * Override or extend the styles applied to the component.
    * See [CSS API](#css) below for more details.
    */
  /**
    * @ignore
    */
  className: PropTypes.string,
  /**
    * A control element. For instance, it can be be a `Radio`, a `Switch` or a `Checkbox`.
    */
  control: PropTypes.element,
  /**
    * If `true`, the control will be disabled.
    */
  disabled: PropTypes.bool,
  /**
    * Pass a ref to the `input` element.
    */
  inputRef: refType,
  /**
    * The text to be used in an enclosing label element.
    */
  label: PropTypes.node,
  /**
    * The position of the label.
    */
  labelPlacement: PropTypes.oneOf(['end', 'start', 'top', 'bottom']),
  /*
    * @ignore
    */
  name: PropTypes.string,
  /**
    * Callback fired when the state is changed.
    *
    * @param {object} event The event source of the callback.
    * You can pull out the new checked state by accessing `event.target.checked` (boolean).
    */
  onChange: PropTypes.func,
  /**
    * The value of the component.
    */
  value: PropTypes.any,
};

export default FormControlLabel;
