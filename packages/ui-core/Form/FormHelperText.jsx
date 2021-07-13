import PropTypes from 'prop-types'
import React from 'react'
import clsx from 'clsx'
import useFormControl from './useFormControl'
import styles from './FormHelperText.mdl.css'

const FormHelperText = (props) => {
  const {
    children,
    classes,
    className: classNameProp,
    disabled: disabledProp,
    error: errorProp,
    margin: marginProp,
    ...other
  } = props
  const muiFormControl = useFormControl()

  let disabled = disabledProp
  let error = errorProp
  let margin = marginProp

  if (muiFormControl) {
    if (typeof disabled === 'undefined') {
      disabled = muiFormControl.disabled;
    }

    if (typeof error === 'undefined') {
      error = muiFormControl.error;
    }

    if (typeof margin === 'undefined') {
      margin = muiFormControl.margin;
    }
  }

  const className = clsx(
    styles.root,
    {
      [styles.disabled]: disabled,
      [styles.error]: error,
      [styles.dense]: margin === 'dense',
    },
    classNameProp,
  );

  return (
    <div
      className={className}
      {...other}
    >
      {children}
    </div>
  );
}

FormHelperText.contextTypes = {
  muiFormControl: PropTypes.object,
};

FormHelperText.propTypes = {

  /**
     * The content of the component.
     */
  children: PropTypes.node,

  /**
     * Useful to extend the style applied to components.
     */
  className: PropTypes.string,

  /**
     * @ignore
     */
  classes: PropTypes.object,

  /**
     * If `true`, the helper text should be displayed in a disabled state.
     */
  disabled: PropTypes.bool,

  /**
     * If `true`, helper text should be displayed in an error state.
     */
  error: PropTypes.bool,

  /**
     * If `dense`, will adjust vertical spacing. This is normally obtained via context from
     * FormControl.
     */
  margin: PropTypes.oneOf(['dense']),
};

export default FormHelperText;
