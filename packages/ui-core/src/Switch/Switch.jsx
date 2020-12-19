import PropTypes from 'prop-types';
import React from 'react';
import clsx from 'clsx';
import SwitchBase from '../SwitchBase';
import refType from '../utils/refType';
import capitalize from '../utils/capitalize';

if (process.env.WEBPACK) {
  require('./switch.css');
}

const Switch = React.forwardRef((props, ref) => {
  const {
    className,
    color = 'secondary',
    disabled = false,
    edge = false,
    size = 'medium',
    ...other
  } = props;

  const icon = <span className="switch-thumb" />;

  return (
    <span
      className={clsx(
        'switch',
        `switch-color-${color}`,
        {
          'switch-edgeStart': edge === 'start',
          'switch-edgeEnd': edge === 'end',
          [`switch-size-${size}`]: size !== 'medium',

        },
        className,
      )}
    >
      <SwitchBase
        type="checkbox"
        icon={icon}
        checkedIcon={icon}
        ref={ref}
        disabled={disabled}
        {...other}
      />
      <span className="switch-track" />
    </span>
  );
});

Switch.propTypes = {
  /**
   * If `true`, the component is checked.
   */
  checked: PropTypes.bool,
  /**
   * The icon to display when the component is checked.
   */
  checkedIcon: PropTypes.node,
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
  color: PropTypes.oneOf(['primary', 'secondary', 'default']),
  /**
   * @ignore
   */
  defaultChecked: PropTypes.bool,
  /**
   * If `true`, the switch will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the ripple effect will be disabled.
   */
  disableRipple: PropTypes.bool,
  /**
   * If given, uses a negative margin to counteract the padding on one
   * side (this is often helpful for aligning the left or right
   * side of the icon with content above or below, without ruining the border
   * size and shape).
   */
  edge: PropTypes.oneOf(['start', 'end', false]),
  /**
   * The icon to display when the component is unchecked.
   */
  icon: PropTypes.node,
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
  /**
   * Callback fired when the state is changed.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange: PropTypes.func,
  /**
   * If `true`, the `input` element will be required.
   */
  required: PropTypes.bool,
  /**
   * The size of the switch.
   * `small` is equivalent to the dense switch styling.
   */
  size: PropTypes.oneOf(['small', 'medium']),
  /**
   * The input component prop `type`.
   */
  type: PropTypes.string,
  /**
   * The value of the component. The DOM API casts this to a string.
   */
  value: PropTypes.any,
};

export default Switch;
