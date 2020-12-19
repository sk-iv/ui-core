import PropTypes from 'prop-types'
import React from 'react'
import clsx from 'clsx'
import InputBase from './InputBase'
import styles from './Input.module.css'

const Input = React.forwardRef((props, ref) => {
  const {
    disableUnderline,
    fullWidth = false,
    inputComponent = 'input',
    multiline = false,
    type = 'text',
    ...other
  } = props

  return (
    <InputBase
      classes={{
        root: clsx('input-base', {
          'field-control--underline': !disableUnderline,
        }),
        underline: null,
      }}
      className={clsx(styles['input-base'],
        {
          [styles['field-control--underline']]: !disableUnderline,
        })}
      fullWidth={fullWidth}
      inputComponent={inputComponent}
      multiline={multiline}
      ref={ref}
      type={type}
      {...other}
    />
  )
})

Input.propTypes = {
  /**
   * This prop helps users to fill forms faster, especially on mobile devices.
   * The name can be confusing, as it's more like an autofill.
   * You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
   */
  autoComplete: PropTypes.string,
  /**
   * If `true`, the `input` element will be focused during the first mount.
   */
  autoFocus: PropTypes.bool,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  // classes: PropTypes.object.isRequired,
  /**
   * The CSS class name of the wrapper element.
   */
  className: PropTypes.string,
  /**
   * The default `input` element value. Use when the component is not controlled.
   */
  defaultValue: PropTypes.any,
  /**
   * If `true`, the `input` element will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the input will not have an underline.
   */
  disableUnderline: PropTypes.bool,
  /**
   * End `InputAdornment` for this component.
   */
  endAdornment: PropTypes.node,
  /**
   * If `true`, the input will indicate an error. This is normally obtained via context from
   * FormControl.
   */
  error: PropTypes.bool,
  /**
   * If `true`, the input will take up the full width of its container.
   */
  fullWidth: PropTypes.bool,
  /**
   * The id of the `input` element.
   */
  id: PropTypes.string,
  /**
   * The component used for the native input.
   * Either a string to use a DOM element or a component.
   */
  inputComponent: PropTypes.elementType,
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   */
  inputProps: PropTypes.object,
  /**
   * This prop can be used to pass a ref callback to the `input` element.
   */
  inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   */
  margin: PropTypes.oneOf(['dense', 'none']),
  /**
   * If `true`, a textarea element will be rendered.
   */
  multiline: PropTypes.bool,
  /**
   * Name attribute of the `input` element.
   */
  name: PropTypes.string,
  /**
   * Callback fired when the value is changed.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value`.
   */
  onChange: PropTypes.func,
  /**
   * The short hint displayed in the input before the user enters a value.
   */
  placeholder: PropTypes.string,
  /**
   * It prevents the user from changing the value of the field
   * (not from interacting with the field).
   */
  readOnly: PropTypes.bool,
  /**
   * If `true`, the `input` element will be required.
   */
  required: PropTypes.bool,
  /**
   * Number of rows to display when multiline option is set to true.
   */
  rows: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * Maximum number of rows to display when multiline option is set to true.
   */
  rowsMax: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * Start `InputAdornment` for this component.
   */
  startAdornment: PropTypes.node,
  /**
   * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types).
   */
  type: PropTypes.string,
  /**
   * The value of the `input` element, required for a controlled component.
   */
  value: PropTypes.any,
};

Input.muiName = 'Input';

export default Input;
