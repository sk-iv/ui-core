import PropTypes from 'prop-types';
import React from 'react';
import clsx from 'clsx';
import ListContext from './ListContext';

/**
 * It's a simple wrapper to apply the `dense` mode styles to `Avatar`.
 */
const ListItemAvatar = React.forwardRef((props, ref) => {
  const { classes, className, ...other } = props;
  const context = React.useContext(ListContext);

  return (
    <div
      className={clsx(
        className,
      )}
      ref={ref}
      {...other}
    />
  );
});

ListItemAvatar.propTypes = {
  /**
    * The content of the component – normally `Avatar`.
    */
  children: PropTypes.element.isRequired,
  /**
    * Override or extend the styles applied to the component.
    * See [CSS API](#css) below for more details.
    */
  classes: PropTypes.object.isRequired,
  /**
    * @ignore
    */
  className: PropTypes.string,
};

export default ListItemAvatar;
