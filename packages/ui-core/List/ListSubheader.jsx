import PropTypes from 'prop-types';
import React from 'react';
import clsx from 'clsx';
import { capitalize } from '../utils';

export const styles = (theme) => ({
  root: {
    boxSizing: 'border-box',
    lineHeight: '48px',
    listStyle: 'none',
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    color: theme.palette.text.secondary,
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeightMedium,
    fontSize: theme.typography.pxToRem(theme.typography.fontSize),
  },
  colorPrimary: {
    color: theme.palette.primary[500],
  },
  colorInherit: {
    color: 'inherit',
  },
  inset: {
    paddingLeft: theme.spacing.unit * 9,
  },
  sticky: {
    position: 'sticky',
    top: 0,
    zIndex: 1,
    backgroundColor: 'inherit',
  },
});


function ListSubheader(props) {
  const {
    children,
    classes,
    className: classNameProp,
    component: ComponentProp,
    color,
    disableSticky,
    inset,
    ...other
  } = props;
  const className = clsx(
    classes.root,
    {
      [classes[`color${capitalize(color)}`]]: color !== 'default',
      [classes.inset]: inset,
      [classes.sticky]: !disableSticky,
    },
    classNameProp,
  );

  return (
    <ComponentProp
      className={className}
      {...other}
    >
      {children}
    </ComponentProp>
  );
}

ListSubheader.defaultProps = {
  component: 'li',
  color: 'default',
  disableSticky: false,
  inset: false,
};

ListSubheader.muiName = 'ListSubheader';
ListSubheader.propTypes = {

  /**
     * The content of the component.
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

  /**
     * The component used for the root node.
     * Either a string to use a DOM element or a component.
     * The default value is a `button`.
     */
  color: PropTypes.oneOf([
    'default',
    'primary',
    'inherit',
  ]),

  /**
     * The color of the component. It's using the theme palette when that makes sense.
     */
  component: PropTypes.element,

  /**
     * If `true`, the List Subheader will not stick to the top during scroll.
     */
  disableSticky: PropTypes.bool,

  /**
     * If `true`, the List Subheader will be indented.
     */
  inset: PropTypes.bool,
};
export default ListSubheader;
