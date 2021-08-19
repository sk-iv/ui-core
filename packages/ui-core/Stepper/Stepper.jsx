import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import styles from './Stepper.mdl.css'
import StepperContext from './StepperContext'

const Stepper = React.forwardRef((props, ref) => {
  const {
    activeStep = 0,
    alternativeLabel = false,
    children,
    className: classNameProp,
    connector,
    nonLinear = false,
    ...other
  } = props;

  const className = clsx(
    styles.root,
    {
      [styles.alternativeLabel]: alternativeLabel,
    },
    classNameProp,
  );

  const childrenArray = React.Children.toArray(children).filter(Boolean);
  const steps = childrenArray.map((step, index) => {
    return React.cloneElement(step, {
      index,
      last: index + 1 === childrenArray.length,
      ...step.props,
    });
  });
  const contextValue = React.useMemo(
    () => ({ activeStep, alternativeLabel, connector, nonLinear }),
    [activeStep, alternativeLabel, connector, nonLinear],
  )

  return (
    <StepperContext.Provider value={contextValue}>
      <div ref={ref} className={className}>
        {steps}
      </div>
    </StepperContext.Provider>
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
};

export default Stepper;
