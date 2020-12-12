import PropTypes from 'prop-types';
import React from 'react';
import clsx from 'clsx';
import TextareaAutosize from './TextareaAutosize';
import { FormControlContext, formControlState, useFormControl } from '../Form';
import debounce from '../utils/debounce';
import { isFilled } from './utils';
import { useForkRef } from '../utils/reactHelpers';
import useDebouncedEffect from '../utils/useDebouncedEffect';
import styles from './Input.module.css'

const useEnhancedEffect = typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect;

// const handleDb = debounce((target) => {
//   onDebounce({target});
// }, 5000);

/**
 * `InputBase` contains as few styles as possible.
 * It aims to be a simple building block for creating an input.
 * It contains a load of style reset and some state logic.
 */
const InputBase = React.forwardRef((props, ref) => {
  const {
    'aria-describedby': ariaDescribedby,
    autoComplete,
    autoFocus,
    classes,
    className: classNameProp,
    defaultValue,
    disabled,
    endAdornment,
    error,
    fullWidth = false,
    id,
    inputComponent = 'input',
    inputProps: { className: inputPropsClassName, ...inputPropsProp } = {},
    inputRef: inputRefProp,
    margin,
    multiline = false,
    name,
    onBlur,
    onChange,
    onDebounce,
    onClick,
    onFocus,
    onKeyDown,
    onKeyUp,
    placeholder,
    readOnly,
    renderSuffix,
    rows,
    rowsMax,
    select = false,
    spellCheck,
    startAdornment,
    type = 'text',
    value,
    ...other
  } = props;

  const { current: isControlled } = React.useRef(value != null);

  const inputRef = React.useRef();
  const handleInputRefWarning = React.useCallback((instance) => {
    if (process.env.NODE_ENV !== 'production') {
      if (instance && instance.nodeName !== 'INPUT' && !instance.focus) {
        console.error(
          [
            'Material-UI: You have provided a `inputComponent` to the input component',
            'that does not correctly handle the `inputRef` prop.',
            'Make sure the `inputRef` prop is called with a HTMLInputElement.',
          ].join('\n'),
        );
      }
    }
  }, []);
  const handleInputPropsRefProp = useForkRef(inputPropsProp.ref, handleInputRefWarning);
  const handleInputRefProp = useForkRef(inputRefProp, handleInputPropsRefProp);
  const handleInputRef = useForkRef(inputRef, handleInputRefProp);

  const [focused, setFocused] = React.useState(false);
  const muiFormControl = useFormControl();

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
      if (muiFormControl) {
        return muiFormControl.registerEffect();
      }

      return undefined;
    }, [muiFormControl]);
  }

  const fcs = formControlState({
    props,
    muiFormControl,
    states: ['disabled', 'error', 'hiddenLabel', 'margin', 'required', 'filled'],
  });
  fcs.focused = muiFormControl ? muiFormControl.focused : focused;

  // The blur won't fire when the disabled state is set on a focused input.
  // We need to book keep the focused state manually.
  React.useEffect(() => {
    if (!muiFormControl && disabled && focused) {
      setFocused(false);
      if (onBlur) {
        onBlur();
      }
    }
  }, [muiFormControl, disabled, focused, onBlur]);

  const checkDirty = React.useCallback(
    (obj) => {
      if (isFilled(obj)) {
        if (muiFormControl && muiFormControl.onFilled) {
          muiFormControl.onFilled();
        }
      } else if (muiFormControl && muiFormControl.onEmpty) {
        muiFormControl.onEmpty();
      }
    },
    [muiFormControl],
  );

  useEnhancedEffect(() => {
    if (isControlled) {
      checkDirty({ value });
    }
  }, [value, checkDirty, isControlled]);

  useDebouncedEffect(() => {
    if (onDebounce && fcs.focused) {
      onDebounce({ target: { name, value } });
    }
  }, 2000, [value]);

  const handleFocus = (event) => {
    // Fix a bug with IE 11 where the focus/blur events are triggered
    // while the input is disabled.
    if (fcs.disabled) {
      event.stopPropagation();
      return;
    }

    if (onFocus) {
      onFocus(event);
    }

    if (muiFormControl && muiFormControl.onFocus) {
      muiFormControl.onFocus(event);
    } else {
      setFocused(true);
    }
  };

  const handleBlur = (event) => {
    if (onBlur) {
      onBlur(event);
    }

    if (muiFormControl && muiFormControl.onBlur) {
      muiFormControl.onBlur(event);
    } else {
      setFocused(false);
    }
  };

  const handleChange = (event, ...args) => {
    if (!isControlled) {
      const element = event.target || inputRef.current;
      if (element == null) {
        throw new TypeError(
          'Material-UI: Expected valid input target. '
            + 'Did you use a custom `inputComponent` and forget to forward refs? '
            + 'See https://material-ui.com/r/input-component-ref-interface for more info.',
        );
      }

      checkDirty({
        value: element.value,
      });
    }

    // Perform in the willUpdate
    if (onChange) {
      onChange(event, ...args);
    }
  };

  const handleClick = (event) => {
    if (inputRef.current && event.currentTarget === event.target) {
      inputRef.current.focus();
    }

    if (onClick) {
      onClick(event);
    }
  };

  let InputComponent = inputComponent;
  let inputProps = {
    ...inputPropsProp,
    ref: handleInputRef,
  };

  if (typeof InputComponent !== 'string') {
    inputProps = {
      // Rename ref to inputRef as we don't know the
      // provided `inputComponent` structure.
      inputRef: handleInputRef,
      type,
      ...inputProps,
      ref: null,
    };
  } else if (multiline) {
    if (rows && !rowsMax) {
      InputComponent = 'textarea';
    } else {
      inputProps = {
        rows,
        rowsMax,
        ...inputProps,
      };
      InputComponent = TextareaAutosize;
    }
  } else {
    inputProps = {
      type,
      ...inputProps,
    };
  }

  return (
    <div
      className={clsx(
        styles['input-base'],
        {
          [styles['input--disabled']]: fcs.disabled,
          [styles['input--error']]: fcs.error,
          [styles['input--fullWidth']]: fullWidth,
          [styles['input--focused']]: fcs.focused,
          [styles['input--formControl']]: muiFormControl,
          [styles['input--marginDense']]: fcs.margin === 'dense',
          [styles['input--multiline']]: multiline,
          [styles['input--adornedStart']]: startAdornment,
          [styles['input--adornedEnd']]: endAdornment,
        },
        classNameProp,
      )}
      onClick={handleClick}
      ref={ref}
      {...other}
    >
      {startAdornment}
      <FormControlContext.Provider value={null}>
        <InputComponent
          aria-invalid={fcs.error}
          aria-describedby={ariaDescribedby}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          className={clsx(
            styles.input,
            {
              [styles['input--disabled']]: fcs.disabled,
              [styles['input--inputTypeSearch']]: type === 'search',
              [styles['input--inputMultiline']]: multiline,
              [styles['input--inputSelect']]: select,
              [styles['input--inputMarginDense']]: fcs.margin === 'dense',
              [styles['input--inputHiddenLabel']]: fcs.hiddenLabel,
              [styles['input-adornedStart']]: startAdornment,
              [styles['input--inputAdornedEnd']]: endAdornment,
            },
            inputPropsClassName,
          )}
          defaultValue={defaultValue}
          disabled={fcs.disabled}
          id={id}
          name={name}
          onBlur={handleBlur}
          onChange={handleChange}
          onFocus={handleFocus}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          placeholder={placeholder}
          readOnly={readOnly}
          required={fcs.required}
          rows={rows}
          spellCheck={spellCheck}
          value={value}
          {...inputProps}
        />
      </FormControlContext.Provider>
      {endAdornment}
      {renderSuffix
        ? renderSuffix({
          ...fcs,
          startAdornment,
        })
        : null}
    </div>
  );
});

InputBase.propTypes = {
  /**
   * @ignore
   */
  'aria-describedby': PropTypes.string,
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
  classes: PropTypes.object.isRequired,
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
   * The component used for the `input` element.
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
   * @ignore
   */
  onBlur: PropTypes.func,
  /**
   * Callback fired when the value is changed.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value`.
   */
  onChange: PropTypes.func,
  /**
   * @ignore
   */
  onClick: PropTypes.func,
  /**
   * @ignore
   */
  onFocus: PropTypes.func,
  /**
   * @ignore
   */
  onKeyDown: PropTypes.func,
  /**
   * @ignore
   */
  onKeyUp: PropTypes.func,
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
   * @ignore
   */
  renderSuffix: PropTypes.func,
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
   * Should be `true` when the component hosts a select.
   */
  select: PropTypes.bool,
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
export default InputBase;
