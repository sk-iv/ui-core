import PropTypes from 'prop-types'
import React from 'react'
import clsx from 'clsx'
import { FormLabel, formControlState, useFormControl } from '../Form'
import styles from './InputLabel.module.css'
import stylesForm from '../Form/FormLabel.module.css'

const InputLabel = React.forwardRef((props, ref) => {
  const {
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
        styles.labelInput,
        {
          [styles.formControl]: muiFormControl,
          [styles.animated]: !disableAnimation,
          [styles.shrink]: shrink,
          [styles.marginDense]: fcs.margin === 'dense',
          [stylesForm.focused]: fcs.focused,
          [styles.disabled]: fcs.disabled,
          [stylesForm.error]: fcs.error,
          [stylesForm.required]: fcs.required,
        },
        className,
      )}
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
