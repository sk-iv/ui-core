import PropTypes from 'prop-types';
import React from 'react';
import clsx from 'clsx';
import { isAdornedStart, isFilled } from '../Input/utils';

import FormControlContext from './FormControlContext';
import capitalize from '../utils/capitalize';
import { isMuiElement } from '../utils/reactHelpers';
import styles from './FormControl.module.css'

/**
 * Provides context such as dirty/focused/error/required for form inputs.
 * Relying on the context provides high flexibilty and ensures that the state always stay
 * consitent across the children of the `FormControl`.
 * This context is used by the following components:
 *  - FormLabel
 *  - FormHelperText
 *  - Input
 *  - InputLabel
 */
const FormControl = React.forwardRef((props, ref) => {
  const {
    children,
    classes,
    className,
    component: Component = 'div',
    disabled = false,
    error = false,
    fullWidth = false,
    hiddenLabel = false,
    margin = 'none',
    required = false,
    variant = 'standard',
    ...other
  } = props;
  const [adornedStart] = React.useState(() => {
    // We need to iterate through the children and find the Input in order
    // to fully support server-side rendering.
    let initialAdornedStart = false;

    if (children) {
      React.Children.forEach(children, (child) => {
        if (!isMuiElement(child, ['Input', 'Select'])) {
          return;
        }

        const input = isMuiElement(child, ['Select']) ? child.props.input : child;

        if (input && isAdornedStart(input.props)) {
          initialAdornedStart = true;
        }
      });
    }
    return initialAdornedStart;
  });

  const [filled, setFilled] = React.useState(() => {
    // We need to iterate through the children and find the Input in order
    // to fully support server-side rendering.
    let initialFilled = false;

    if (children) {
      React.Children.forEach(children, (child) => {
        if (!isMuiElement(child, ['Input', 'Select'])) {
          return;
        }

        if (isFilled(child.props, true)) {
          initialFilled = true;
        }
      });
    }

    return initialFilled;
  });

  const [focused, setFocused] = React.useState(false);

  if (disabled && focused) {
    setFocused(false);
  }

  let registerEffect;
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const registeredInput = React.useRef(false);
    registerEffect = () => {
      if (registeredInput.current) {
        console.error(
          [
            'Material-UI: there are multiple InputBase components inside a FormControl.',
            'This is not supported. It might cause infinite rendering loops.',
            'Only use one InputBase.',
          ].join('\n'),
        );
      }

      registeredInput.current = true;
      return () => {
        registeredInput.current = false;
      };
    };
  }

  const childContext = {
    adornedStart,
    disabled,
    error,
    filled,
    focused,
    hiddenLabel,
    margin,
    onBlur: () => {
      setFocused(false);
    },
    onEmpty: () => {
      if (filled) {
        setFilled(false);
      }
    },
    onFilled: () => {
      if (!filled) {
        setFilled(true);
      }
    },
    onFocus: () => {
      setFocused(true);
    },
    registerEffect,
    required,
    variant,
  };

  return (
    <FormControlContext.Provider value={childContext}>
      <Component
        className={clsx(
          styles['form-control'],
          {
            [styles[`margin${capitalize(margin)}`]]: margin !== 'none',
            [styles.fullWidth]: fullWidth,
            [styles['form-control-error']]: error,
          },
          className,
        )}
        ref={ref}
        {...other}
      >
        {children}
      </Component>
    </FormControlContext.Provider>
  );
});

FormControl.propTypes = {
  /**
    * The contents of the form control.
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
    * The component used for the root node.
    * Either a string to use a DOM element or a component.
    */
  component: PropTypes.elementType,
  /**
    * If `true`, the label, input and helper text should be displayed in a disabled state.
    */
  disabled: PropTypes.bool,
  /**
    * If `true`, the label should be displayed in an error state.
    */
  error: PropTypes.bool,
  /**
    * If `true`, the component will take up the full width of its container.
    */
  fullWidth: PropTypes.bool,
  /**
    * If `true`, the label will be hidden.
    * This is used to increase density for a `FilledInput`.
    * Be sure to add `aria-label` to the `input` element.
    */
  hiddenLabel: PropTypes.bool,
  /**
    * If `dense` or `normal`, will adjust vertical spacing of this and contained components.
    */
  margin: PropTypes.oneOf(['none', 'dense', 'normal']),
  /**
    * If `true`, the label will indicate that the input is required.
    */
  required: PropTypes.bool,
  /**
    * The variant to use.
    */
  variant: PropTypes.oneOf(['standard', 'outlined', 'filled']),
};

export default FormControl;
