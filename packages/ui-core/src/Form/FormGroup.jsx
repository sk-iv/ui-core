import PropTypes from 'prop-types';
import React from 'react';
import clsx from 'clsx';

if (process.env.WEBPACK) {
  require('./FormGroup.module.css');
}

/**
 * `FormGroup` wraps controls such as `Checkbox` and `Switch`.
 * It provides compact row layout.
 * For the `Radio`, you should be using the `RadioGroup` component instead of this one.
 */
function FormGroup(props) {
  const {
    className, children, row, ...other
  } = props;
  const rootClassName = clsx(
    'form-group',
    {
      'form-group--row': row,
    },
    className,
  );

  return (
    <div
      className={rootClassName}
      {...other}
    >
      {children}
    </div>
  );
}

FormGroup.propTypes = {

  /**
     * The content of the component.
     */
  children: PropTypes.node,

  /**
     * @ignore
     */
  className: PropTypes.string,

  /**
     * Display group of elements in a compact row.
     */
  row: PropTypes.bool,
};

FormGroup.defaultProps = {
  row: false,
};

export default FormGroup;
