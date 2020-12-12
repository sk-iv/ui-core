import PropTypes from 'prop-types'
import React from 'react'
import clsx from 'clsx'
import styles from './List.module.css'

/**
 * A simple wrapper to apply `List` styles to an `Icon` or `SvgIcon`.
 */
function ListItemIcon(props) {
  const {
    children, classes, className: classNameProp, ...other
  } = props;

  return React.cloneElement(children, {
    className: clsx(styles['list-item--icon'], classNameProp, children.props.className),
    ...other,
  })
}
ListItemIcon.propTypes = {

  /**
     * The content of the component, normally `Icon`, `SvgIcon`,
     * or a `material-ui-icons` SVG icon component.
     */
  children: PropTypes.element,

  /**
     * Useful to extend the style applied to components.
     */
  className: PropTypes.string,
}
export default ListItemIcon
