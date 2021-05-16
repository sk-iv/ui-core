import PropTypes from 'prop-types'
import React from 'react'
import clsx from 'clsx'
import debounce from '../utils/debounce'
import { useForkRef } from '../utils/reactHelpers'
import styles from './Textarea.mdl.css'
import ownerWindow from '../utils/ownerWindow'

function getStyleValue(computedStyle, property) {
  return parseInt(computedStyle[property], 10) || 0
}

const useEnhancedEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect

const TextareaAutosize = React.forwardRef((props, ref) => {
  const {
    onChange, maxRows, minRows = 1, style, value, ...other
  } = props;

  const { current: isControlled } = React.useRef(value != null);
  const inputRef = React.useRef(null);
  const handleRef = useForkRef(ref, inputRef);
  const shadowRef = React.useRef(null);
  const renders = React.useRef(0);
  const [state, setState] = React.useState({});

  const syncHeight = React.useCallback(() => {
    const input = inputRef.current;
    const containerWindow = ownerWindow(input);
    const computedStyle = containerWindow.getComputedStyle(input);

    const inputShallow = shadowRef.current;
    inputShallow.style.width = computedStyle.width;
    inputShallow.value = input.value || props.placeholder || 'x';
    if (inputShallow.value.slice(-1) === '\n') {
      // Certain fonts which overflow the line height will cause the textarea
      // to report a different scrollHeight depending on whether the last line
      // is empty. Make it non-empty to avoid this issue.
      inputShallow.value += ' ';
    }

    const boxSizing = computedStyle['box-sizing'];
    const padding = getStyleValue(computedStyle, 'padding-bottom') + getStyleValue(computedStyle, 'padding-top');
    const border = getStyleValue(computedStyle, 'border-bottom-width')
      + getStyleValue(computedStyle, 'border-top-width');

    // The height of the inner content
    const innerHeight = inputShallow.scrollHeight - padding;

    // Measure height of a textarea with a single row
    inputShallow.value = 'x';
    const singleRowHeight = inputShallow.scrollHeight - padding;

    // The height of the outer content
    let outerHeight = innerHeight;

    if (minRows) {
      outerHeight = Math.max(Number(minRows) * singleRowHeight, outerHeight);
    }
    if (maxRows) {
      outerHeight = Math.min(Number(maxRows) * singleRowHeight, outerHeight);
    }
    outerHeight = Math.max(outerHeight, singleRowHeight);

    // Take the box sizing into account for applying this value as a style.
    const outerHeightStyle = outerHeight + (boxSizing === 'border-box' ? padding + border : 0);
    const overflow = Math.abs(outerHeight - innerHeight) <= 1;

    setState((prevState) => {
      // Need a large enough difference to update the height.
      // This prevents infinite rendering loop.
      if (
        renders.current < 20
        && ((outerHeightStyle > 0
          && Math.abs((prevState.outerHeightStyle || 0) - outerHeightStyle) > 1)
          || prevState.overflow !== overflow)
      ) {
        renders.current += 1;
        return {
          overflow,
          outerHeightStyle,
        };
      }

      if (process.env.NODE_ENV !== 'production') {
        if (renders.current === 20) {
          console.error(
            [
              'Material-UI: Too many re-renders. The layout is unstable.',
              'TextareaAutosize limits the number of renders to prevent an infinite loop.',
            ].join('\n'),
          );
        }
      }

      return prevState;
    });
  }, [maxRows, minRows, props.placeholder]);

  React.useEffect(() => {
    const handleResize = debounce(() => {
      renders.current = 0;
      syncHeight();
    });

    const containerWindow = ownerWindow(inputRef.current);
    containerWindow.addEventListener('resize', handleResize);
    return () => {
      handleResize.clear();
      containerWindow.removeEventListener('resize', handleResize);
    };
  }, [syncHeight]);

  useEnhancedEffect(() => {
    syncHeight();
  });

  React.useEffect(() => {
    renders.current = 0;
  }, [value]);

  const handleChange = (event) => {
    renders.current = 0;

    if (!isControlled) {
      syncHeight();
    }

    if (onChange) {
      onChange(event);
    }
  };

  return (
    <>
      <textarea
        value={value}
        className={styles.textarea}
        onChange={handleChange}
        ref={handleRef}
        // Apply the rows prop to get a "correct" first SSR paint
        rows={minRows}
        style={{
          height: state.outerHeightStyle,
          // Need a large enough difference to allow scrolling.
          // This prevents infinite rendering loop.
          overflow: state.overflow ? 'hidden' : null,
          ...style,
        }}
        {...other}
      />
      <textarea
        aria-hidden
        className={clsx(props.className, styles['textarea--shadow'])}
        readOnly
        ref={shadowRef}
        tabIndex={-1}
        style={{ ...style }}
      />
    </>
  )
})

TextareaAutosize.propTypes = {
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * @ignore
   */
  onChange: PropTypes.func,
  /**
   * @ignore
   */
  placeholder: PropTypes.string,
  /**
   * Minimum number of rows to display.
   */
  minRows: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * Maximum number of rows to display.
   */
  maxRows: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * @ignore
   */
  style: PropTypes.object,
  /**
   * @ignore
   */
  value: PropTypes.any,
};

export default TextareaAutosize;
