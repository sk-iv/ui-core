import PropTypes from 'prop-types'
import React from 'react'
import clsx from 'clsx'
import { FormLabel, formControlState, useFormControl } from '../Form'
import styles from './InputLabel.module.css'

const InputLabel = React.forwardRef((props, ref) => {
  const {
    classes,
    className,
    disableAnimation = false,
    margin,
    shrink: shrinkProp,
    variant,
    ...other
  } = props

  const muiFormControl = useFormControl()

  let shrink = shrinkProp
  if (typeof shrink === 'undefined' && muiFormControl) {
    shrink = muiFormControl.filled || muiFormControl.focused || muiFormControl.adornedStart
  }

  const fcs = formControlState({
    props,
    muiFormControl,
    states: ['margin', 'variant'],
  });

  return (
    <FormLabel
      data-shrink={shrink}
      className={clsx(
        styles['label-input'],
        {
          [styles['label-formControl']]: muiFormControl,
          [styles['label-animated']]: !disableAnimation,
          [styles['label-shrink']]: shrink,
          [styles['label-marginDense']]: fcs.margin === 'dense',
        },
        className,
      )}
      classes={{
        focused: 'form-label--focused',
        disabled: 'form-label--disabled',
        error: 'form-label--error',
        required: 'form-label--required',
        asterisk: 'form-label--asterisk',
      }}
      ref={ref}
      {...other}
    />
  );
});

InputLabel.propTypes = {
  /**
   * The contents of the `InputLabel`.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If `true`, the transition animation is disabled.
   */
  disableAnimation: PropTypes.bool,
  /**
   * If `true`, apply disabled class.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the label will be displayed in an error state.
   */
  error: PropTypes.bool,
  /**
   * If `true`, the input of this label is focused.
   */
  focused: PropTypes.bool,
  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   */
  margin: PropTypes.oneOf(['dense']),
  /**
   * if `true`, the label will indicate that the input is required.
   */
  required: PropTypes.bool,
  /**
   * If `true`, the label is shrunk.
   */
  shrink: PropTypes.bool,
  /**
   * The variant to use.
   */
  variant: PropTypes.oneOf(['standard', 'outlined', 'filled']),
};

export default InputLabel;
