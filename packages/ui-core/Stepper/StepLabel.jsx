import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx'
import StepperContext from './StepperContext'
import StepContext from './StepContext'
import StepIcon from './StepIcon'
import styles from './StepLabel.mdl.css'

const StepLabel = React.forwardRef((props, ref) => {
  const {
    children,
    className: classNameProp,
    error = false,
    icon: iconProp,
    last,
    optional,
    orientation = 'horizontal',
    StepIconComponent: StepIconComponentProp,
    StepIconProps,
    ...other
  } = props;

  const { alternativeLabel } = React.useContext(StepperContext);
  const { active, disabled, completed, icon: iconContext } = React.useContext(StepContext);
  const icon = iconProp || iconContext;

  let StepIconComponent = StepIconComponentProp;

  if (icon && !StepIconComponent) {
    StepIconComponent = StepIcon
  }

  return (
    <div
      className={clsx(
        styles.root,
        {
          [styles.disabled]: disabled,
          [styles.alternativeLabel]: alternativeLabel,
          [styles.error]: error,
        },
        classNameProp,
      )}
      ref={ref}
      {...other}
    >
      {icon || StepIconComponent ? (
        <span
          className={clsx(styles.iconContainer, {
            'step-label-alternativeLabel': alternativeLabel,
          })}
        >
          <StepIconComponent
            completed={completed}
            active={active}
            error={error}
            icon={icon}
            {...StepIconProps}
          />
        </span>
      ) : null}
      <span className={styles.labelContainer}>
        <span
          className={clsx(styles.label, {
            [styles.alternativeLabel]: alternativeLabel,
            [styles.completed]: completed,
            [styles.active]: active,
            [styles.error]: error,
          })}
        >
          {children}
        </span>
        {optional}
      </span>
    </div>
  );
});

StepLabel.propTypes = {
  /**
   * @ignore
   * Sets the step as active. Is passed to child components.
   */
  active: PropTypes.bool,
  /**
   * @ignore
   * Set internally by Stepper when it's supplied with the alternativeLabel prop.
   */
  alternativeLabel: PropTypes.bool,
  /**
   * In most cases will simply be a string containing a title for the label.
   */
  children: PropTypes.node,
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
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
  /**
   * Mark the step as disabled, will also disable the button if
   * `StepLabelButton` is a child of `StepLabel`. Is passed to child components.
   */
  disabled: PropTypes.bool,
  /**
   * Mark the step as failed.
   */
  error: PropTypes.bool,
  /**
   * Override the default label of the step icon.
   */
  icon: PropTypes.node,
  /**
   * @ignore
   */
  last: PropTypes.bool,
  /**
   * The optional node to display.
   */
  optional: PropTypes.node,
  /**
   * @ignore
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * The component to render in place of the [`StepIcon`](/api/step-icon/).
   */
  StepIconComponent: PropTypes.elementType,
  /**
   * Props applied to the [`StepIcon`](/api/step-icon/) element.
   */
  StepIconProps: PropTypes.object,
};

StepLabel.muiName = 'StepLabel';

export default StepLabel;
