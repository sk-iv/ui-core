import React from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { Typography } from 'src/ui/Typography'
import Collapse from 'src/ui/Transition/Collapse'
import { ownerDocument, useForkRef } from 'src/ui/utils'
import TreeViewContext from './TreeViewContext'
import { DescendantProvider, useDescendant } from './descendants'
import styles from './TreeItem.module.css'

const TreeItem = React.forwardRef((props, ref) => {
  const {
    children,
    classes,
    className,
    collapseIcon,
    endIcon,
    expandIcon,
    disabled: disabledProp,
    icon: iconProp,
    id: idProp,
    label,
    nodeId,
    onClick,
    onIconClick,
    onLabelClick,
    onMouseDown,
    TransitionComponent = Collapse,
    TransitionProps,
    ...other
  } = props;

  const {
    icons: contextIcons,
    focus,
    selectNode,
    selectRange,
    toggleExpansion,
    isExpanded,
    isFocused,
    isSelected,
    isDisabled,
    multiSelect,
    disabledItemsFocusable,
    mapFirstChar,
    unMapFirstChar,
    registerNode,
    unregisterNode,
    treeId,
  } = React.useContext(TreeViewContext);

  let id = null;

  if (idProp != null) {
    id = idProp;
  } else if (treeId && nodeId) {
    id = `${treeId}-${nodeId}`;
  }

  const [treeitemElement, setTreeitemElement] = React.useState(null);
  const contentRef = React.useRef(null);
  const handleRef = useForkRef(setTreeitemElement, ref);

  const descendant = React.useMemo(
    () => ({
      element: treeitemElement,
      id: nodeId,
    }),
    [nodeId, treeitemElement],
  );

  const { index, parentId } = useDescendant(descendant);

  let icon = iconProp;

  const expandable = Boolean(Array.isArray(children) ? children.length : children);
  const expanded = isExpanded ? isExpanded(nodeId) : false;
  const focused = isFocused ? isFocused(nodeId) : false;
  const selected = isSelected ? isSelected(nodeId) : false;
  const disabled = isDisabled ? isDisabled(nodeId) : false;
  const icons = contextIcons || {};

  if (!icon) {
    if (expandable) {
      if (!expanded) {
        icon = expandIcon || icons.defaultExpandIcon;
      } else {
        icon = collapseIcon || icons.defaultCollapseIcon;
      }

      if (!icon) {
        icon = icons.defaultParentIcon;
      }
    } else {
      icon = endIcon || icons.defaultEndIcon;
    }
  }

  const handleClick = (event) => {
    if (!disabled) {
      if (!focused) {
        focus(event, nodeId);
      }

      const multiple = multiSelect && (event.shiftKey || event.ctrlKey || event.metaKey);

      // If already expanded and trying to toggle selection don't close
      if (expandable && !event.defaultPrevented && !(multiple && isExpanded(nodeId))) {
        toggleExpansion(event, nodeId);
      }

      if (multiple) {
        if (event.shiftKey) {
          selectRange(event, { end: nodeId });
        } else {
          selectNode(event, nodeId, true);
        }
      } else {
        selectNode(event, nodeId);
      }
    }

    if (onClick) {
      onClick(event);
    }
  };

  const handleMouseDown = (event) => {
    if (event.shiftKey || event.ctrlKey || event.metaKey || disabled) {
      // Prevent text selection
      event.preventDefault();
    }

    if (onMouseDown) {
      onMouseDown(event);
    }
  };

  React.useEffect(() => {
    // On the first render a node's index will be -1. We want to wait for the real index.
    if (registerNode && unregisterNode && index !== -1) {
      registerNode({
        id: nodeId,
        idAttribute: id,
        index,
        parentId,
        expandable,
        disabled: disabledProp,
      });

      return () => {
        unregisterNode(nodeId);
      };
    }

    return undefined;
  }, [registerNode, unregisterNode, parentId, index, nodeId, expandable, disabledProp, id]);

  React.useEffect(() => {
    if (mapFirstChar && unMapFirstChar && label) {
      mapFirstChar(nodeId, contentRef.current.textContent.substring(0, 1).toLowerCase());

      return () => {
        unMapFirstChar(nodeId);
      };
    }
    return undefined;
  }, [mapFirstChar, unMapFirstChar, nodeId, label]);

  let ariaSelected;
  if (multiSelect) {
    ariaSelected = selected;
  } else if (selected) {
    /* single-selection trees unset aria-selected on un-selected items.
         *
         * If the tree does not support multiple selection, aria-selected
         * is set to true for the selected node and it is not present on any other node in the tree.
         * Source: https://www.w3.org/TR/wai-aria-practices/#TreeView
         */
    ariaSelected = true;
  }

  function handleFocus(event) {
    // DOM focus stays on the tree which manages focus with aria-activedescendant
    if (event.target === event.currentTarget) {
      ownerDocument(event.target).getElementById(treeId).focus();
    }

    const unfocusable = !disabledItemsFocusable && disabled;
    if (!focused && event.currentTarget === event.target && !unfocusable) {
      focus(event, nodeId);
    }
  }

  return (
    <li
      className={clsx(styles['tree-item'], className)}
      role="treeitem"
      aria-expanded={expandable ? expanded : null}
      aria-selected={ariaSelected}
      aria-disabled={disabled || null}
      ref={handleRef}
      id={id}
      tabIndex={-1}
      {...other}
      onFocus={handleFocus}
    >
      {/* Key event is handled by the TreeView */}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div
        className={clsx(styles['tree-item-content'], {
          [styles['tree-item--expanded']]: expanded,
          [styles['tree-item--selected']]: selected,
          [styles['tree-item--focused']]: focused,
          [styles['tree-item--disabled']]: disabled,
        })}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        ref={contentRef}
      >
        {/* Key event is handled by the TreeView */}
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
        <div onClick={onIconClick} className="tree-item-icon-container">
          {icon}
        </div>
        <Typography onClick={onLabelClick} component="div" className={styles['tree-item-label']}>
          {label}
        </Typography>
      </div>
      {children && (
      <DescendantProvider id={nodeId}>
        <TransitionComponent
          unmountOnExit
          className={styles['tree-item-group']}
          in={expanded}
          component="ul"
          role="group"
          {...TransitionProps}
        >
          {children}
        </TransitionComponent>
      </DescendantProvider>
      )}
    </li>
  );
});

TreeItem.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
     * The content of the component.
     */
  children: PropTypes.node,
  /**
     * @ignore
     */
  className: PropTypes.string,
  /**
     * The icon used to collapse the node.
     */
  collapseIcon: PropTypes.node,
  /**
     * If `true`, the node will be disabled.
     */
  disabled: PropTypes.bool,
  /**
     * The icon displayed next to a end node.
     */
  endIcon: PropTypes.node,
  /**
     * The icon used to expand the node.
     */
  expandIcon: PropTypes.node,
  /**
     * The icon to display next to the tree node's label.
     */
  icon: PropTypes.node,
  /**
     * @ignore
     */
  id: PropTypes.string,
  /**
     * The tree node label.
     */
  label: PropTypes.node,
  /**
     * The id of the node.
     */
  nodeId: PropTypes.string.isRequired,
  /**
     * @ignore
     */
  onClick: PropTypes.func,
  /**
     * This prop isn't supported.
     * Use the `onNodeFocus` callback on the tree if you need to monitor a node's focus.
     */
  onFocus: PropTypes.func,
  /**
     * `onClick` handler for the icon container. Call `event.preventDefault()` to prevent `onNodeToggle` from being called.
     */
  onIconClick: PropTypes.func,
  /**
     * `onClick` handler for the label container. Call `event.preventDefault()` to prevent `onNodeToggle` from being called.
     */
  onLabelClick: PropTypes.func,
  /**
     * @ignore
     */
  onMouseDown: PropTypes.func,
  /**
     * The component used for the transition.
     * [Follow this guide](/components/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
     */
  TransitionComponent: PropTypes.elementType,
  /**
     * Props applied to the transition element.
     * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition) component.
     */
  TransitionProps: PropTypes.object,
}

export default TreeItem
