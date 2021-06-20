import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import capitalize from '../utils/capitalize'
import Paper from '../Paper'
import styles from './AppBar.mdl.css'

const AppBar = React.forwardRef((props, ref) => {
  const {
    className, color = 'primary', position = 'fixed', ...other
  } = props;

  return (
    <Paper
      square
      component="header"
      elevation={4}
      className={clsx(
        styles.appBar,
        styles[`position${capitalize(position)}`],
        styles[`color${capitalize(color)}`],
        {
          'mui-fixed': position === 'fixed', // Useful for the Dialog
        },
        className,
      )}
      ref={ref}
      {...other}
    />
  )
})

AppBar.propTypes = {
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
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'primary'
   */
  color: PropTypes.oneOf(['default', 'inherit', 'primary', 'secondary', 'transparent']),
  /**
   * The positioning type. The behavior of the different options is described
   * [in the MDN web docs](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Positioning).
   * Note: `sticky` is not universally supported and will fall back to `static` when unavailable.
   * @default 'fixed'
   */
  position: PropTypes.oneOf(['absolute', 'fixed', 'relative', 'static', 'sticky']),
}

export default AppBar
