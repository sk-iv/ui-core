import * as React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import capitalize from '../utils/capitalize'
import useIsFocusVisible from '../utils/useIsFocusVisible'
import useForkRef from '../utils/useForkRef'
import styles from './Link.module.css'

const Link = React.forwardRef((props, ref) => {
  const {
    className,
    color = 'primary',
    component = 'a',
    onBlur,
    onFocus,
    href = '#',
    underline = 'hover',
    variant = 'solid',
    ...other
  } = props;

  const { isFocusVisible, onBlurVisible, ref: focusVisibleRef } = useIsFocusVisible();
  const [focusVisible, setFocusVisible] = React.useState(false);
  const handlerRef = useForkRef(ref, focusVisibleRef);
  const handleBlur = (event) => {
    if (focusVisible) {
      onBlurVisible();
      setFocusVisible(false);
    }
    if (onBlur) {
      onBlur(event);
    }
  };
  const handleFocus = (event) => {
    if (isFocusVisible(event)) {
      setFocusVisible(true);
    }
    if (onFocus) {
      onFocus(event);
    }
  };

  const LinkProp = component;
  const linkProps = {};

  if (LinkProp === 'a') {
    linkProps.href = href;
  }

  return (
    <LinkProp
      className={clsx(
        styles.link,
        styles[`link-${color}`],
        {
          [styles['link-solid']]: variant === 'solid',
          [styles['link-dashed']]: variant === 'dashed',
          [styles['link-dashed']]: variant === 'dashed',
        },
        className,
      )}

      onBlur={handleBlur}
      onFocus={handleFocus}
      {...linkProps}
      {...other}
    />
  );
});

Link.propTypes = {
  /**
   * The content of the link.
   */
  children: PropTypes.node.isRequired,

  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the link.
   */
  color: PropTypes.oneOf([
    'initial',
    'inherit',
    'primary',
    'secondary',
    'textPrimary',
    'textSecondary',
    'error',
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  // component: elementTypeAcceptingRef,
  /**
   * @ignore
   */
  onBlur: PropTypes.func,
  /**
   * @ignore
   */
  onFocus: PropTypes.func,
  /**
   * `classes` prop applied to the [`Typography`](/api/typography/) element.
   */
  TypographyClasses: PropTypes.object,
  /**
   * Controls when the link should have an underline.
   */
  underline: PropTypes.oneOf(['none', 'hover', 'always']),
  /**
   * Applies the theme typography styles.
   */
  variant: PropTypes.string,
};

export default Link;
