import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Paper from '../Paper';
import StepConnector from '../StepConnector';

if (process.env.WEBPACK) {
  require('./stepper.css');
}

const defaultConnector = <StepConnector />;

const Stepper = React.forwardRef((props, ref) => {
  const {
    activeStep = 0,
    alternativeLabel = false,
    children,
    className: classNameProp,
    connector: connectorProp = defaultConnector,
    nonLinear = false,
    orientation = 'horizontal',
    ...other
  } = props;

  const className = clsx(
    'stepper-root',
    `stepper-${orientation}`,
    {
      'stepper-alternativeLabel': alternativeLabel,
    },
    classNameProp,
  );

  const connector = React.isValidElement(connectorProp)
    ? React.cloneElement(connectorProp, { orientation })
    : null;
  const childrenArray = React.Children.toArray(children);
  const steps = childrenArray.map((step, index) => {
    const controlProps = {
      alternativeLabel,
      connector: connectorProp,
      last: index + 1 === childrenArray.length,
      orientation,
    };

    const state = {
      index,
      active: false,
      completed: false,
      disabled: false,
    };

    if (activeStep === index) {
      state.active = true;
    } else if (!nonLinear && activeStep > index) {
      state.completed = true;
    } else if (!nonLinear && activeStep < index) {
      state.disabled = true;
    }

    return [
      !alternativeLabel
        && connector
        && index !== 0
        && React.cloneElement(connector, {
          key: index,
          ...state,
        }),
      React.cloneElement(step, { ...controlProps, ...state, ...step.props }),
    ];
  });

  return (
    <Paper square elevation={0} className={className} ref={ref} {...other}>
      {steps}
    </Paper>
  );
});

Stepper.propTypes = {
  /**
   * Set the active step (zero based index).
   */
  activeStep: PropTypes.number,
  /**
   * If set to 'true' and orientation is horizontal,
   * then the step label will be positioned under the icon.
   */
  alternativeLabel: PropTypes.bool,
  /**
   * Two or more `<Step />` components.
   */
  children: PropTypes.node.isRequired,
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
   * An element to be placed between each step.
   */
  connector: PropTypes.element,
  /**
   * If set the `Stepper` will not assist in controlling steps for linear flow.
   */
  nonLinear: PropTypes.bool,
  /**
   * The stepper orientation (layout flow direction).
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
};

export default Stepper;
