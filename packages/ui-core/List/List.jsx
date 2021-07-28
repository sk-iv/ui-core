import PropTypes from 'prop-types'
import React from 'react'
import clsx from 'clsx'

import ListContext from './ListContext'
import styles from './List.mdl.css'

const List = React.forwardRef((props, ref) => {
  const {
    children,
    className,
    component: Component = 'ul',
    dense = false,
    disablePadding = false,
    subheader,
    ...other
  } = props

  const context = React.useMemo(() => ({ dense }), [dense])

  return (
    <ListContext.Provider value={context}>
      <Component
        className={clsx(
          styles.list,
          {
            [styles.dense]: dense,
            [styles.subheader]: !!subheader,
          },
          className,
        )}
        ref={ref}
        {...other}
      >
        {subheader}
        {children}
      </Component>
    </ListContext.Provider>
  )
})

List.propTypes = {
  /**
   * The content of the component.
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
   * If `true`, compact vertical padding designed for keyboard and mouse input will be used for
   * the list and list items.
   * The prop is available to descendant components as the `dense` context.
   */
  dense: PropTypes.bool,
  /**
   * If `true`, vertical padding will be removed from the list.
   */
  disablePadding: PropTypes.bool,
  /**
   * The content of the subheader, normally `ListSubheader`.
   */
  subheader: PropTypes.node,
  direction: PropTypes.oneOf(['x', 'y']),
}

export default List
