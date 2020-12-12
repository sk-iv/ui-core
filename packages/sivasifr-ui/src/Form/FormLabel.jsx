import PropTypes from 'prop-types'
import React from 'react'
import clsx from 'clsx'
import useFormControl from './useFormControl'
import formControlState from './formControlState'
import styles from './FormLabel.module.css'

const FormLabel = React.forwardRef((props, ref) => {
  const {
    children,
    className,
    color,
    component: Component = 'label',
    disabled,
    error,
    filled,
    focused,
    required,
    ...other
  } = props;

  const muiFormControl = useFormControl();
  const fcs = formControlState({
    props,
    muiFormControl,
    states: ['color', 'required', 'focused', 'disabled', 'error', 'filled'],
  });

  return (
    <Component
      className={clsx(
        styles['form-label'],
        styles[`form-label-color-${fcs.color || 'primary'}`],
        {
          [styles['form-label-disabled']]: fcs.disabled,
          [styles['form-label-error']]: fcs.error,
          [styles['form-label-filled']]: fcs.filled,
          [styles['form-label-focused']]: fcs.focused,
          [styles['form-label-required']]: fcs.required,
        },
        className,
      )}
      ref={ref}
      {...other}
    >
      {children}
      {fcs.required && (
        <span
          className={clsx(styles['form-label-asterisk'], {
            [styles['form-label-error']]: fcs.error,
          })}
        >
          &thinsp;
          *
        </span>
      )}
    </Component>
  );
});

FormLabel.propTypes = {
  /**
   * The content of the component.
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
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color: PropTypes.oneOf(['primary', 'secondary']),
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, the label should be displayed in a disabled state.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the label should be displayed in an error state.
   */
  error: PropTypes.bool,
  /**
   * If `true`, the label should use filled classes key.
   */
  filled: PropTypes.bool,
  /**
   * If `true`, the input of this label is focused (used by `FormGroup` components).
   */
  focused: PropTypes.bool,
  /**
   * If `true`, the label will indicate that the input is required.
   */
  required: PropTypes.bool,
};

export default FormLabel;
