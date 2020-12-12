import PropTypes from 'prop-types';
import React from 'react';
import clsx from 'clsx';
import ListItem from '../List/ListItem';

const MenuItem = React.forwardRef((props, ref) => {
  const {
    className,
    component = 'li',
    disableGutters = false,
    role = 'menuitem',
    selected,
    tabIndex: tabIndexProp,
    ...other
  } = props;

  let tabIndex;
  if (!props.disabled) {
    tabIndex = tabIndexProp !== undefined ? tabIndexProp : -1;
  }
  return (
    <ListItem
      button
      role={role}
      tabIndex={tabIndex}
      component={component}
      selected={selected}
      disableGutters={disableGutters}
      className={clsx(
        'menu-item',
        {
          'menu-item-selected': selected,
          'menu-item-gutters': !disableGutters,
        },
        className,
        { dense: 'menu-item-dense' },
      )}
      ref={ref}
      {...other}
    />
  );
});

MenuItem.propTypes = {
  /**
   * Menu item contents.
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
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, compact vertical padding designed for keyboard and mouse input will be used.
   */
  dense: PropTypes.bool,
  /**
   * @ignore
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the left and right padding is removed.
   */
  disableGutters: PropTypes.bool,
  /**
   * @ignore
   */
  role: PropTypes.string,
  /**
   * @ignore
   */
  selected: PropTypes.bool,
  /**
   * @ignore
   */
  tabIndex: PropTypes.number,
};

export default MenuItem;
