import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import { IconButton } from '../IconButton'
import { IconSvg } from '@sivasifr/icons/IconSvg'
import useForkRef from '../utils/useForkRef'
import unsupportedProp from '../utils/unsupportedProp'
import capitalize from '../utils/capitalize'
import '../Avatar'
import styles from './Chip.module.css'

/**
 * Chips represent complex entities in small blocks, such as a contact.
 */
const Chip = React.forwardRef((props, ref) => {
  const {
    avatar: avatarProp,
    className,
    clickable: clickableProp,
    color = 'default',
    component: Component = 'div',
    deleteIcon: deleteIconProp,
    disabled = false,
    icon: iconProp,
    label,
    onClick,
    onDelete,
    onKeyDown,
    onKeyUp,
    size = 'medium',
    variant = 'default',
    ...other
  } = props;

  const chipRef = React.useRef(null);
  const handleRef = useForkRef(chipRef, ref);

  const handleDeleteIconClick = (event) => {
    // Stop the event from bubbling up to the `Chip`
    event.stopPropagation();
    if (onDelete) {
      onDelete(event);
    }
  };

  const handleKeyDown = (event) => {
    if (onKeyDown) {
      onKeyDown(event);
    }

    // Ignore events from children of `Chip`.
    if (event.currentTarget !== event.target) {
      return;
    }

    if ([' ', 'Enter', 'Backspace', 'Delete', 'Escape'].indexOf(event.key) !== -1) {
      event.preventDefault();
    }
  };

  const handleKeyUp = (event) => {
    if (onKeyUp) {
      onKeyUp(event);
    }

    // Ignore events from children of `Chip`.
    if (event.currentTarget !== event.target) {
      return;
    }

    const { key } = event;
    if (onClick && (key === ' ' || key === 'Enter')) {
      onClick(event);
    } else if (onDelete && (key === 'Backspace' || key === 'Delete')) {
      onDelete(event);
    } else if (key === 'Escape' && chipRef.current) {
      chipRef.current.blur();
    }
  };

  const clickable = clickableProp !== false && onClick ? true : clickableProp;
  const small = size === 'small';

  let deleteIcon = null;
  if (onDelete) {
    const customClasses = clsx({
      [styles.deleteIconSmall]: small,
      [styles[`deleteIconColor${capitalize(color)}`]]:
         color !== 'default' && variant !== 'outlined',
      [styles[`deleteIconOutlinedColor${capitalize(color)}`]]:
         color !== 'default' && variant === 'outlined',
    })

    deleteIcon = deleteIconProp && React.isValidElement(deleteIconProp) ? (
      React.cloneElement(deleteIconProp, {
        className: clsx(deleteIconProp.props.className, styles.deleteIcon, customClasses),
        onClick: handleDeleteIconClick,
      })
    ) : (
      <IconButton
        className={clsx('chip--deleteIcon', customClasses)}
        onClick={handleDeleteIconClick}
      >
        <IconSvg name="times" />
      </IconButton>
    );
  }

  let avatar = null;
  if (avatarProp && React.isValidElement(avatarProp)) {
    avatar = React.cloneElement(avatarProp, {
      className: clsx('chip--avatar', avatarProp.props.className, {
        'chip--avatarSmall': small,
        [`chip--avatarColor${capitalize(color)}`]: color !== 'default',
      }),
    });
  }

  let icon = null;
  if (iconProp && React.isValidElement(iconProp)) {
    icon = React.cloneElement(iconProp, {
      className: clsx('chip--icon', iconProp.props.className, {
        'chip--iconSmall': small,
        [`chip--iconColor${capitalize(color)}`]: color !== 'default',
      }),
    });
  }

  if (process.env.NODE_ENV !== 'production') {
    if (avatar && icon) {
      console.error(
        'Siva-UI: the Chip component can not handle the avatar '
           + 'and the icon prop at the same time. Pick one.',
      )
    }
  }

  return (
    <Component
      role={clickable || onDelete ? 'button' : undefined}
      className={clsx(
        styles.chip,
        {
          [styles.disabled]: disabled,
          [styles.sizeSmall]: small,
          [styles[`color${capitalize(color)}`]]: color !== 'default',
          [styles.clickable]: clickable,
          [styles[`clickableColor${capitalize(color)}`]]: clickable && color !== 'default',
          [styles.deletable]: onDelete,
          [styles[`deletableColor${capitalize(color)}`]]: onDelete && color !== 'default',
          [styles.outlined]: variant === 'outlined',
          [styles.outlinedPrimary]: variant === 'outlined' && color === 'primary',
          [styles.outlinedSecondary]: variant === 'outlined' && color === 'secondary',
        },
        className,
      )}
      tabIndex={clickable || onDelete ? 0 : undefined}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      ref={handleRef}
      {...other}
    >
      {avatar || icon}
      <span
        className={clsx(styles.label, {
          [styles.labelSmall]: small,
        })}
      >
        {label}
      </span>
      {deleteIcon}
    </Component>
  );
});

Chip.propTypes = {
  /**
    * Avatar element.
    */
  avatar: PropTypes.element,
  /**
    * This prop isn't supported.
    * Use the `component` prop if you need to change the children structure.
    */
  children: unsupportedProp,
  /**
    * Override or extend the styles applied to the component.
    */
  className: PropTypes.string,
  /**
    * If true, the chip will appear clickable, and will raise when pressed,
    * even if the onClick prop is not defined.
    * If false, the chip will not be clickable, even if onClick prop is defined.
    * This can be used, for example,
    * along with the component prop to indicate an anchor Chip is clickable.
    */
  clickable: PropTypes.bool,
  /**
    * The color of the component. It supports those theme colors that make sense for this component.
    */
  color: PropTypes.oneOf(['default', 'primary', 'secondary', 'accent']),
  /**
    * The component used for the root node.
    * Either a string to use a DOM element or a component.
    */
  component: PropTypes.elementType,
  /**
    * Override the default delete icon element. Shown only if `onDelete` is set.
    */
  deleteIcon: PropTypes.element,
  /**
    * If `true`, the chip should be displayed in a disabled state.
    */
  disabled: PropTypes.bool,
  /**
    * Icon element.
    */
  icon: PropTypes.element,
  /**
    * The content of the label.
    */
  label: PropTypes.node,
  /**
    * @ignore
    */
  onClick: PropTypes.func,
  /**
    * Callback function fired when the delete icon is clicked.
    * If set, the delete icon will be shown.
    */
  onDelete: PropTypes.func,
  /**
    * @ignore
    */
  onKeyDown: PropTypes.func,
  /**
    * @ignore
    */
  onKeyUp: PropTypes.func,
  /**
    * The size of the chip.
    */
  size: PropTypes.oneOf(['small', 'medium']),
  /**
    * The variant to use.
    */
  variant: PropTypes.oneOf(['default', 'outlined']),
}

export default Chip
