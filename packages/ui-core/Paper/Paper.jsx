import PropTypes from 'prop-types'
import React from 'react'
import clsx from 'clsx'
import styles from './Paper.mdl.css'

// Класс для корректной работы с Autosuggest
const Paper = React.forwardRef((props, ref) => {
  const {
    className: classNameProp,
    component: ComponentProp,
    elevation,
    ...other
  } = props

  const className = clsx(
    styles.shadow,
    styles[`shadow${elevation >= 0 ? elevation : 0}`],
    classNameProp,
  )

  return (
    <ComponentProp
      className={className}
      ref={ref}
      {...other}
    />
  )
})

Paper.propTypes = {

  /**
     * @ignore
     */
  children: PropTypes.node,

  /**
     * Useful to extend the style applied to components.
     */
  // Classes: PropTypes.object.isRequired,
  /**
     * @ignore
     */
  className: PropTypes.string,

  /**
     * The component used for the root node.
     * Either a string to use a DOM element or a component.
     */
  component: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),

  /**
     * Shadow depth, corresponds to `dp` in the spec.
     * It's accepting values between 0 and 24 inclusive.
     */
  elevation: PropTypes.number,

  /**
     * If `true`, rounded corners are disabled.
     */
  square: PropTypes.bool,
}

Paper.defaultProps = {
  component: 'div',
  elevation: 2,
  square: true,
}

export default Paper
