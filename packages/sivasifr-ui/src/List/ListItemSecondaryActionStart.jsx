import PropTypes from 'prop-types';
import React from 'react';
import clsx from 'clsx';

function ListItemSecondaryActionStart(props) {
  const { children, className } = props;
  return (
    <div className={clsx('list-item--secondaryActionStart', className)}>
      {children}
    </div>
  );
}

ListItemSecondaryActionStart.muiName = 'ListItemSecondaryActionStart';
ListItemSecondaryActionStart.propTypes = {

  /**
     * The content of the component, normally an `IconButton` or selection control.
     */
  children: PropTypes.node,

  /**
     * Useful to extend the style applied to components.
     */
  className: PropTypes.string,

  /**
     * @ignore
     */
  classes: PropTypes.object,
};
export default ListItemSecondaryActionStart;
