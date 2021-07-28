import PropTypes from 'prop-types'
import React from 'react'
import clsx from 'clsx'
import ListContext from './ListContext'
import styles from './ListItem.mdl.css'

const ListItemText = React.forwardRef((props, ref) => {
  const {
    children,
    className,
    disableTypography = false,
    inset = false,
    primary: primaryProp,
    primaryTypographyProps,
    secondary: secondaryProp,
    secondaryTypographyProps,
    ...other
  } = props;
  const { dense } = React.useContext(ListContext)

  let primary = primaryProp != null ? primaryProp : children
  if (primary != null) {
    primary = (
      <span
        className={dense ? 'body2' : 'body1'}
        {...primaryTypographyProps}
      >
        {primary}
      </span>
    );
  }

  let secondary = secondaryProp;
  if (secondary != null) {
    secondary = (
      <div
        className={styles.textSecondary}
      >
        {secondary}
      </div>
    );
  }

  return (
    <div
      className={clsx(
        styles.text,
        {
          [styles.textDense]: dense,
          [styles.textInset]: inset,
          [styles.textMultiline]: primary && secondary,
        },
        className,
      )}
      ref={ref}
      {...other}
    >
      {primary}
      {secondary}
    </div>
  );
});

ListItemText.propTypes = {
  /**
   * Alias for the `primary` property.
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
   * If `true`, the children won't be wrapped by a Typography component.
   * This can be useful to render an alternative Typography variant by wrapping
   * the `children` (or `primary`) text, and optional `secondary` text
   * with the Typography component.
   */
  disableTypography: PropTypes.bool,
  /**
   * If `true`, the children will be indented.
   * This should be used if there is no left avatar or left icon.
   */
  inset: PropTypes.bool,
  /**
   * The main content element.
   */
  primary: PropTypes.node,
  /**
   * These props will be forwarded to the primary typography component
   * (as long as disableTypography is not `true`).
   */
  primaryTypographyProps: PropTypes.object,
  /**
   * The secondary content element.
   */
  secondary: PropTypes.node,
  /**
   * These props will be forwarded to the secondary typography component
   * (as long as disableTypography is not `true`).
   */
  secondaryTypographyProps: PropTypes.object,
};
export default ListItemText;
