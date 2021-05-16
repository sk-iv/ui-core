import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { SvgUse } from '../SvgIcon';

if (process.env.WEBPACK) {
  require('./step-icon.css');
}

const StepIcon = React.forwardRef((props, ref) => {
  const {
    completed = false, icon, active = false, error = false,
  } = props;

  if (typeof icon === 'number' || typeof icon === 'string') {
    // if (error) {
    //   return <Warning className={clsx(classes.root, classes.error)} ref={ref} />;
    // }
    if (completed) {
      return <SvgUse name="clock" ref={ref} />;
    }
    return (
      <SvgUse
        name="clock"
        className={clsx('step-icon-root', {
          'step-icon-active': active,
        })}
        ref={ref}
      >
        <circle cx="12" cy="12" r="12" />
        <text className="step-icon-text" x="12" y="16" textAnchor="middle">
          {icon}
        </text>
      </SvgUse>
    );
  }

  return icon;
});

StepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object.isRequired,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
  /**
   * Mark the step as failed.
   */
  error: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node.isRequired,
};

export default StepIcon;
