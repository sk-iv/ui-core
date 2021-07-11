import PropTypes from 'prop-types'
import React from 'react'
import clsx from 'clsx'
import IconButton from '../IconButton'
import { refType } from '../utils'
import useFormControl from '../Form/useFormControl'
import styles from './SwitchBase.mdl.css'

/**
 * @ignore - internal component.
 */
const SwitchBase = React.forwardRef((props, ref) => {
  const {
    autoFocus,
    checked: checkedProp,
    checkedIcon,
    className,
    defaultChecked,
    disabled: disabledProp,
    icon,
    id,
    inputProps,
    inputRef,
    name,
    onBlur,
    onChange,
    onFocus,
    readOnly,
    required,
    tabIndex,
    type,
    value,
    ...other
  } = props;
  const { current: isControlled } = React.useRef(checkedProp != null);
  const [checkedState, setCheckedState] = React.useState(Boolean(defaultChecked));
  const checked = isControlled ? checkedProp : checkedState;

  const muiFormControl = useFormControl();

  const handleFocus = (event) => {
    if (onFocus) {
      onFocus(event);
    }

    if (muiFormControl && muiFormControl.onFocus) {
      muiFormControl.onFocus(event);
    }
  };

  const handleBlur = (event) => {
    if (onBlur) {
      onBlur(event);
    }

    if (muiFormControl && muiFormControl.onBlur) {
      muiFormControl.onBlur(event);
    }
  };

  const handleInputChange = (event) => {
    const newChecked = event.target.checked;

    if (!isControlled) {
      setCheckedState(newChecked);
    }

    if (onChange) {
      onChange(event, newChecked);
    }
  };

  let disabled = disabledProp;

  if (muiFormControl) {
    if (typeof disabled === 'undefined') {
      disabled = muiFormControl.disabled;
    }
  }

  const hasLabelFor = type === 'checkbox' || type === 'radio';

  return (
    <IconButton
      component="span"
      className={clsx(
        styles.root,
        {
          [styles.checked]: checked,
          [styles.disabled]: disabled,
        },
        className,
      )}
      disabled={disabled}
      tabIndex={null}
      role={undefined}
      onFocus={handleFocus}
      onBlur={handleBlur}
      ref={ref}
      {...other}
    >
      <input
        autoFocus={autoFocus}
        checked={checkedProp}
        defaultChecked={defaultChecked}
        className={styles.input}
        disabled={disabled}
        id={hasLabelFor && id}
        name={name}
        onChange={handleInputChange}
        readOnly={readOnly}
        ref={inputRef}
        required={required}
        tabIndex={tabIndex}
        type={type}
        value={value}
        {...inputProps}
      />
      {checked ? checkedIcon : icon}
    </IconButton>
  )
})

// NB: If changed, please update Checkbox, Switch and Radio
// so that the API documentation is updated.
SwitchBase.propTypes = {
  /**
    * If `true`, the `input` element will be focused during the first mount.
    */
  autoFocus: PropTypes.bool,
  /**
    * If `true`, the component is checked.
    */
  checked: PropTypes.bool,
  /**
    * The icon to display when the component is checked.
    */
  checkedIcon: PropTypes.node.isRequired,
  /**
    * Override or extend the styles applied to the component.
    * See [CSS API](#css) below for more details.
    */
  /**
    * @ignore
    */
  className: PropTypes.string,
  /**
    * @ignore
    */
  defaultChecked: PropTypes.bool,
  /**
    * If `true`, the switch will be disabled.
    */
  disabled: PropTypes.bool,
  /**
    * The icon to display when the component is unchecked.
    */
  icon: PropTypes.node.isRequired,
  /**
    * The id of the `input` element.
    */
  id: PropTypes.string,
  /**
    * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
    */
  inputProps: PropTypes.object,
  /**
    * Pass a ref to the `input` element.
    */
  inputRef: refType,
  /*
    * @ignore
    */
  name: PropTypes.string,
  /**
    * @ignore
    */
  onBlur: PropTypes.func,
  /**
    * Callback fired when the state is changed.
    *
    * @param {object} event The event source of the callback.
    * You can pull out the new checked state by accessing `event.target.checked` (boolean).
    */
  onChange: PropTypes.func,
  /**
    * @ignore
    */
  onFocus: PropTypes.func,
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
    * @ignore
    */
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
    * The input component prop `type`.
    */
  type: PropTypes.string.isRequired,
  /**
    * The value of the component.
    */
  value: PropTypes.any,
}

export default SwitchBase
