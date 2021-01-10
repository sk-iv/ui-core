import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { Collapse } from '../Collapse'
import styles from './StepContent.module.css'

const StepContent = React.forwardRef((props, ref) => {
  const {
    active,
    alternativeLabel,
    children,
    className,
    completed,
    last,
    optional,
    orientation,
    TransitionComponent = Collapse,
    transitionDuration: transitionDurationProp = 'auto',
    TransitionProps,
    ...other
  } = props;

  if (process.env.NODE_ENV !== 'production') {
    if (orientation !== 'vertical') {
      console.error(
        'Material-UI: <StepContent /> is only designed for use with the vertical stepper.',
      )
    }
  }

  let transitionDuration = transitionDurationProp;

  if (transitionDurationProp === 'auto' && !TransitionComponent.muiSupportAuto) {
    transitionDuration = undefined;
  }

  return (
    <div className={clsx(styles.stepContentRoot, { [styles.stepContentLast]: last }, className)} ref={ref} {...other}>
      <TransitionComponent
        in={active}
        className={styles.stepContentTransition}
        timeout={transitionDuration}
        unmountOnExit
        {...TransitionProps}
      >
        {children}
      </TransitionComponent>
    </div>
  )
})

StepContent.propTypes = {
  /**
   * @ignore
   * Expands the content.
   */
  active: PropTypes.bool,
  /**
   * @ignore
   * Set internally by Step when it's supplied with the alternativeLabel prop.
   */
  alternativeLabel: PropTypes.bool,
  /**
   * Step content.
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
   */
  completed: PropTypes.bool,
  /**
   * @ignore
   */
  last: PropTypes.bool,
  /**
   * @ignore
   * Set internally by Step when it's supplied with the optional prop.
   */
  optional: PropTypes.bool,
  /**
   * @ignore
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * The component used for the transition.
   */
  TransitionComponent: PropTypes.elementType,
  /**
   * Adjust the duration of the content expand transition.
   * Passed as a prop to the transition component.
   *
   * Set to 'auto' to automatically calculate transition time based on height.
   */
  transitionDuration: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({ enter: PropTypes.number, exit: PropTypes.number }),
    PropTypes.oneOf(['auto']),
  ]),
  /**
   * Props applied to the `Transition` element.
   */
  TransitionProps: PropTypes.shape(),
}

export default StepContent
