import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import StepIcon from '../StepIcon';

if (process.env.WEBPACK) {
  require('./step-label.css');
}

const StepLabel = React.forwardRef((props, ref) => {
  const {
    active = false,
    alternativeLabel = false,
    children,
    className: classNameProp,
    completed = false,
    disabled = false,
    error = false,
    icon,
    last,
    optional,
    orientation = 'horizontal',
    StepIconComponent: StepIconComponentProp,
    StepIconProps,
    ...other
  } = props;

  let StepIconComponent = StepIconComponentProp;

  if (icon && !StepIconComponent) {
    StepIconComponent = StepIcon;
  }

  return (
    <span
      className={clsx(
        'step-label-root',
        `step-label-${orientation}`,
        {
          'step-label-disabled': disabled,
          'step-label-alternativeLabel': alternativeLabel,
          'step-label-error': error,
        },
        classNameProp,
      )}
      ref={ref}
      {...other}
    >
      {icon || StepIconComponent ? (
        <span
          className={clsx('step-label-iconContainer', {
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
      <span className="step-label-labelContainer">
        <span
          variant="body2"
          className={clsx('step-label-label', {
            'step-label-alternativeLabel': alternativeLabel,
            'step-label-completed': completed,
            'step-label-active': active,
            'step-label-error': error,
          })}
          display="block"
        >
          {children}
        </span>
        {optional}
      </span>
    </span>
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
