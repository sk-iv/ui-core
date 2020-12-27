import * as React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import capitalize from '../utils/capitalize'
import styles from './Typography.module.css'


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
    weight = 'normal',
    vignette,
    size = 'base',
    font = 'body',
    maxWidth,
    ...other
  } = props

  const Component = component || 'span'

  return (
    <Component
      className={clsx(
        styles.text,
        {
          [styles[`color${capitalize(color)}`]]: color !== 'initial',
          [styles.noWrap]: noWrap,
          [styles.gutterBottom]: gutterBottom,
          [styles[`align${capitalize(align)}`]]: align !== 'inherit',
          [styles[`display${capitalize(display)}`]]: display !== 'initial',
          [styles[`text${capitalize(weight)}`]]: weight !== 'normal',
          [styles.outline]: outline,
          [styles[`size${capitalize(size)}`]]: size !== 'base',
          [styles[`font${capitalize(font)}`]]: font !== 'body',
        },
        className,
      )}
      style={{maxWidth}}
      ref={ref}
      {...other}
    />
  )
})

Typography.displayName = 'Typography'

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
}

export default Typography
