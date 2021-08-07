import PropTypes from 'prop-types'
import React from 'react'
import clsx from 'clsx'
import ReactDOM from 'react-dom'
import ButtonBase from '../Clickable'
import { isMuiElement } from '../utils/reactHelpers'
import useForkRef from '../utils/useForkRef'
import ListContext from './ListContext'
import chainPropTypes from '../utils/chainPropTypes'
import styles from './ListItem.mdl.css'

const useEnhancedEffect = typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect

/**
 * Uses an additional container component if `ListItemSecondaryAction` is the last child.
 */
const ListItem = React.forwardRef((props, ref) => {
  const {
    alignItems = 'center',
    autoFocus = false,
    button = false,
    children: childrenProp,
    className,
    component: componentProp,
    ContainerComponent = 'li',
    ContainerProps: { className: ContainerClassName, ...ContainerProps } = {},
    dense = false,
    disabled = false,
    disableGutters = false,
    divider = false,
    focusVisibleClassName,
    selected = false,
    ...other
  } = props

  const context = React.useContext(ListContext)
  const childContext = {
    dense: dense || context.dense || false,
    alignItems,
  }
  const listItemRef = React.useRef(null)
  useEnhancedEffect(() => {
    if (autoFocus) {
      if (listItemRef.current) {
        listItemRef.current.focus()
      } else if (process.env.NODE_ENV !== 'production') {
        console.error(
          'SivaSifr-UI: unable to set focus to a ListItem whose component has not been rendered.',
        )
      }
    }
  }, [autoFocus])

  const children = React.Children.toArray(childrenProp)
  const hasSecondaryAction = children.length && isMuiElement(children[children.length - 1], ['ListItemSecondaryAction'])

  const handleOwnRef = React.useCallback((instance) => {
    // #StrictMode ready
    listItemRef.current = ReactDOM.findDOMNode(instance)
  }, [])
  const handleRef = useForkRef(handleOwnRef, ref)

  const componentProps = {
    className: clsx(
      styles.root,
      {
        [styles.dense]: childContext.dense,
        [styles.gutters]: !disableGutters,
        [styles.divider]: divider,
        [styles.disabled]: disabled,
        [styles.button]: button,
        [styles.alignItemsFlexStart]: alignItems === 'flex-start',
        [styles.hasSecondaryAction]: hasSecondaryAction,
        [styles.selected]: selected,
      },
      className,
    ),
    disabled,
    ...other,
  }
  let Component = componentProp || 'li'

  if (button) {
    componentProps.component = componentProp || 'li'
    componentProps.focusVisibleClassName = clsx(styles.focusVisible, focusVisibleClassName)
    Component = ButtonBase
  }

  if (hasSecondaryAction) {
    // Use div by default.
    Component = !componentProps.component && !componentProp ? 'div' : Component

    // Avoid nesting of li > li.
    if (ContainerComponent === 'li') {
      if (Component === 'li') {
        Component = 'div'
      } else if (componentProps.component === 'li') {
        componentProps.component = 'div'
      }
    }

    return (
      <ListContext.Provider value={childContext}>
        <ContainerComponent
          className={clsx(styles.container, ContainerClassName)}
          ref={handleRef}
          {...ContainerProps}
        >
          <Component {...componentProps}>{children}</Component>
          {children.pop()}
        </ContainerComponent>
      </ListContext.Provider>
    )
  }

  return (
    <ListContext.Provider value={childContext}>
      <Component ref={handleRef} {...componentProps}>
        {children}
      </Component>
    </ListContext.Provider>
  )
})

ListItem.displayName = 'ListItem'

ListItem.propTypes = {
  /**
   * Defines the `align-items` style property.
   */
  alignItems: PropTypes.oneOf(['flex-start', 'center']),
  /**
   * If `true`, the list item will be focused during the first mount.
   * Focus will also be triggered if the value changes from false to true.
   */
  autoFocus: PropTypes.bool,
  /**
   * If `true`, the list item will be a button (using `ButtonBase`). Props intended
   * for `ButtonBase` can then be applied to `ListItem`.
   */
  button: PropTypes.bool,
  /**
   * The content of the component. If a `ListItemSecondaryAction` is used it must
   * be the last child.
   */
  children: chainPropTypes(PropTypes.node, (props) => {
    const children = React.Children.toArray(props.children)

    // React.Children.toArray(props.children).findLastIndex(isListItemSecondaryAction)
    let secondaryActionIndex = -1
    for (let i = children.length - 1; i >= 0; i -= 1) {
      const child = children[i]
      if (isMuiElement(child, ['ListItemSecondaryAction'])) {
        secondaryActionIndex = i
        break
      }
    }

    //  is ListItemSecondaryAction the last child of ListItem
    if (secondaryActionIndex !== -1 && secondaryActionIndex !== children.length - 1) {
      return new Error(
        'SivaSifr-UI: you used an element after ListItemSecondaryAction. '
          + 'For ListItem to detect that it has a secondary action '
          + 'you must pass it as the last child to ListItem.',
      )
    }

    return null
  }),
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
   * By default, it's a `li` when `button` is `false` and a `div` when `button` is `true`.
   */
  component: PropTypes.elementType,
  /**
   * The container component used when a `ListItemSecondaryAction` is the last child.
   */
  ContainerComponent: PropTypes.elementType,
  /**
   * Props applied to the container component if used.
   */
  ContainerProps: PropTypes.object,
  /**
   * If `true`, compact vertical padding designed for keyboard and mouse input will be used.
   */
  dense: PropTypes.bool,
  /**
   * If `true`, the list item will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the left and right padding is removed.
   */
  disableGutters: PropTypes.bool,
  /**
   * If `true`, a 1px light border is added to the bottom of the list item.
   */
  divider: PropTypes.bool,
  /**
   * @ignore
   */
  focusVisibleClassName: PropTypes.string,
  /**
   * Use to apply selected styling.
   */
  selected: PropTypes.bool,
}

export default ListItem
