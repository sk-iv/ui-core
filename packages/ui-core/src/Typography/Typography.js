import * as React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import capitalize from 'src/ui/utils/capitalize'
import styles from './Typography.module.css'

const defaultVariantMapping = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  subtitle1: 'h6',
  subtitle2: 'h6',
  body1: 'p',
  body2: 'p',
  inherit: 'p',
};

const Typography = React.forwardRef((props, ref) => {
  const {
    align = 'inherit',
    className,
    color = 'initial',
    component,
    display = 'initial',
    gutterBottom = false,
    noWrap = false,
    outline = false,
    paragraph = false,
    variant = 'body1',
    variantMapping = defaultVariantMapping,
    weight = 'normal',
    ...other
  } = props;

  // const themeVariantsClasses = useThemeVariants(
  //     {
  //         ...props,
  //         align,
  //         color,
  //         display,
  //         gutterBottom,
  //         noWrap,
  //         paragraph,
  //         variant,
  //         variantMapping,
  //     },
  //     'MuiTypography',
  // );

  const Component = component
        || (paragraph ? 'p' : variantMapping[variant] || defaultVariantMapping[variant])
        || 'span';

  return (
    <Component
      className={clsx(
        styles.text,
        {
          [styles[`color--${color}`]]: color !== 'initial',
          [styles['no-wrap']]: noWrap,
          [styles['gutter-bottom']]: gutterBottom,
          [styles.paragraph]: paragraph,
          [styles[`align--${align}`]]: align !== 'inherit',
          [styles[`display--${display}`]]: display !== 'initial',
          [styles[`text-${weight}`]]: weight !== 'normal',
          [styles['txt-outline']]: outline,
        },
        // themeVariantsClasses,
        className,
      )}
      ref={ref}
      {...other}
    />
  )
})

Typography.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
     * Set the text-align on the component.
     */
  align: PropTypes.oneOf(['center', 'inherit', 'justify', 'left', 'right']),
  /**
     * The content of the component.
     */
  children: PropTypes.node,
  /**
     * @ignore
     */
  className: PropTypes.string,
  /**
     * The color of the component. It supports those theme colors that make sense for this component.
     */
  color: PropTypes.oneOf([
    'error',
    'inherit',
    'initial',
    'primary',
    'secondary',
    'textPrimary',
    'textSecondary',
  ]),
  /**
     * The component used for the root node.
     * Either a string to use a HTML element or a component.
     */
  component: PropTypes.elementType,
  /**
     * Controls the display type
     */
  display: PropTypes.oneOf(['block', 'initial', 'inline']),
  /**
     * If `true`, the text will have a bottom margin.
     */
  gutterBottom: PropTypes.bool,
  /**
     * If `true`, the text will not wrap, but instead will truncate with a text overflow ellipsis.
     *
     * Note that text overflow can only happen with block or inline-block level elements
     * (the element needs to have a width in order to overflow).
     */
  noWrap: PropTypes.bool,
  /**
     * If `true`, the text will have a bottom margin.
     */
  paragraph: PropTypes.bool,
  /**
     * Applies the theme typography styles.
     */
  variant: PropTypes.oneOfType([
    PropTypes.oneOf([
      'body1',
      'body2',
      'button',
      'caption',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'inherit',
      'overline',
      'subtitle1',
      'subtitle2',
    ]),
    PropTypes.string,
  ]),
  /**
     * The component maps the variant prop to a range of different HTML element types.
     * For instance, subtitle1 to `<h6>`.
     * If you wish to change that mapping, you can provide your own.
     * Alternatively, you can use the `component` prop.
     */
  variantMapping: PropTypes.object,
}

export default Typography
