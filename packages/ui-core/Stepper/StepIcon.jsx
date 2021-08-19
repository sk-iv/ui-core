import React from 'react';
import PropTypes from 'prop-types'
import clsx from 'clsx'
import IconSvg, { icons24 } from '@sivasifr/icons/IconSvg'
import styles from './StepIcon.mdl.css'

const StepIcon = React.forwardRef((props, ref) => {
  const {
    completed = false, icon, active = false, error = false,
  } = props

  if (typeof icon === 'number' || typeof icon === 'string') {
    if (error) {
      return <IconSvg name="circleNon" ref={ref} />
    }
    if (completed) {
      return <IconSvg name="circleCheck" ref={ref} />
    }
    return (
      <svg className={clsx(styles.root, {
        [styles.active]: active
      })}
        focusable="false"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <text className={styles.text} x="12" y="17" textAnchor="middle">
          {icon}
        </text>
      </svg>
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
