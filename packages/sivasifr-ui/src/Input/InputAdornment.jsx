import PropTypes from 'prop-types'
import React from 'react'
import clsx from 'clsx'
import styles from './inputAdornment.module.css'

function InputAdornment(props) {
  const {
    children,
    component: Component,
    className,
    disableTypography,
    position,
    ...other
  } = props;

  return (
    <Component
      className={clsx(
        styles['inputAdornment'],
        {
          [styles['inputAdornment--positionStart']]: position === 'start',
          [styles['inputAdornment--positionEnd']]: position === 'end',
        },
        className,
      )}
      {...other}
    >
      {typeof children === 'string' && !disableTypography
        ? (
          <div color="secondary">
            {children}
          </div>
        )
        : children}
    </Component>
  );
}

InputAdornment.propTypes = {

  /**
     * The content of the component, normally an `IconButton` or string.
     */
  children: PropTypes.node.isRequired,

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
     * If children is a string then disable wrapping in a Typography component.
     */
  disableTypography: PropTypes.bool,

  /**
     * The position this adornment should appear relative to the `Input`.
     */
  position: PropTypes.oneOf([
    'start',
    'end',
  ]),
};

InputAdornment.defaultProps = {
  component: 'div',
  disableTypography: false,
};

export default InputAdornment;
