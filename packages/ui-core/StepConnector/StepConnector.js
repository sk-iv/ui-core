import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

if (process.env.WEBPACK) {
  require('./step-connector.css');
}

const StepConnector = React.forwardRef((props, ref) => {
  const {
    active,
    alternativeLabel = false,
    className: classNameProp,
    completed,
    disabled,
    index,
    orientation = 'horizontal',
    ...other
  } = props;

  return (
    <div
      className={clsx(
        'step-connector-root',
        `step-connector-${orientation}`,
        {
          'step-connector-alternativeLabel': alternativeLabel,
          'step-connector-active': active,
          'step-connector-completed': completed,
          'step-connector-disabled': disabled,
        },
        classNameProp,
      )}
      ref={ref}
      {...other}
    >
      <span
        className={clsx('step-connector-line', {
          'step-connector-lineHorizontal': orientation === 'horizontal',
          'step-connector-lineVertical': orientation === 'vertical',
        })}
      />
    </div>
  );
});

StepConnector.propTypes = {
  /**
   * @ignore
   */
  active: PropTypes.bool,
  /**
   * @ignore
   * Set internally by Step when it's supplied with the alternativeLabel property.
   */
  alternativeLabel: PropTypes.bool,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  // classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * @ignore
   */
  completed: PropTypes.bool,
  /**
   * @ignore
   */
  disabled: PropTypes.bool,
  /**
   * @ignore
   */
  index: PropTypes.number,
  /**
   * @ignore
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
};

export default StepConnector;
