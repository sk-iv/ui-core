import PropTypes from 'prop-types'
import React from 'react'
import clsx from 'clsx'
import styles from './Avatar.module.css'

const Avatar = (props) => {
  const {
    alt,
    classes,
    className: classNameProp,
    children: childrenProp,
    childrenClassName: childrenClassNameProp,
    component: ComponentProp,
    imgProps,
    sizes,
    src,
    srcSet,
    ...other
  } = props;

  const className = clsx(
    'avatar',
    {
      'avatar--colorDefault': childrenProp && !src && !srcSet,
    },
    classNameProp,
  );
  let children = null;

  if (childrenProp) {
    if (
      childrenClassNameProp
      && typeof childrenProp !== 'string'
      && React.isValidElement(childrenProp)
    ) {
      const childrenClassName = clsx(childrenClassNameProp, childrenProp.props.className);
      children = React.cloneElement(childrenProp, { className: childrenClassName });
    } else {
      children = childrenProp;
    }
  } else if (src || srcSet) {
    children = (
      <img
        alt={alt}
        className="avatar--img"
        sizes={sizes}
        src={src}
        srcSet={srcSet}
        {...imgProps}
      />
    );
  }

  return (
    <ComponentProp
      className={className}
      {...other}
    >
      {children}
    </ComponentProp>
  );
};

Avatar.defaultProps = {
  component: 'div',
};
Avatar.propTypes = {

  /**
     * Used in combination with `src` or `srcSet` to
     * provide an alt attribute for the rendered `img` element.
     */
  alt: PropTypes.string,

  /**
     * Used to render icon or text elements inside the Avatar.
     * `src` and `alt` props will not be used and no `img` will
     * be rendered by default.
     *
     * This can be an element, or just a string.
     */
  children: PropTypes.node,

  /**
     * @ignore
     * The className of the child element.
     * Used by Chip and ListItemIcon to style the Avatar icon.
     */
  childrenClassName: PropTypes.string,

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
     */
  component: PropTypes.node,

  /**
     * Properties applied to the `img` element when the component
     * is used to display an image.
     */
  imgProps: PropTypes.object,

  /**
     * The `sizes` attribute for the `img` element.
     */
  sizes: PropTypes.string,

  /**
     * The `src` attribute for the `img` element.
     */
  src: PropTypes.string,

  /**
     * The `srcSet` attribute for the `img` element.
     */
  srcSet: PropTypes.string,
};
export default Avatar;
