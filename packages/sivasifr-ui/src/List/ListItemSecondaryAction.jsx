import PropTypes from 'prop-types';
import React from 'react';
import clsx from 'clsx';

const ListItemSecondaryAction = React.forwardRef((props, ref) => {
  const { className, ...other } = props;

  return <div className={clsx('list-item--secondaryAction', className)} ref={ref} {...other} />;
});

ListItemSecondaryAction.propTypes = {
  /**
   * The content of the component, normally an `IconButton` or selection control.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  /**
   * @ignore
   */
  className: PropTypes.string,
};

ListItemSecondaryAction.muiName = 'ListItemSecondaryAction';

export default ListItemSecondaryAction;
