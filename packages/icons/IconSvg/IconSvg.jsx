import React from 'react'
import clsx from 'clsx'

import icons24 from '../glyphs/24/icons-24.svg'
import styles from './IconSvg.mdl.css'

const IconSvg = ({
  name = 'bars', size = 'sm', bgImg, color = 'inherit', style, className, outline,
}) => {
  const iconsMd = icons24 || ''
  const type = {
    xs: {
      size: 18,
      path: `${iconsMd}#${name}`,
    },
    sm: {
      size: 24,
      path: `${iconsMd}#${name}`,
    },
    lg: {
      size: 96,
      path: `/assets/icons/96/${name}.svg`,
    },
  }

  return (

    name === 'none'
      ? (
        <svg
          className={clsx(
            styles.icon,
            styles[`icon${type[size].size}`],
          )}
          viewBox={`0 0 ${type[size].size} ${type[size].size}`}
        />
      )
      : (
        <svg
          className={clsx(
            styles.icon,
            styles[`icon${type[size].size}`],
            className,
            { [styles['text-white icon-outline']]: outline },
          )}
          style={{ ...style }}
          viewBox="0 0 24 24"
        >
          {bgImg && <use xlinkHref="/assets/icons/96/effects.svg#shape" />}
          <use
            stroke="inherit"
            xlinkHref={type[size].path}
          />
        </svg>
      )

  )
}
IconSvg.defaultProps = {
  name: 'none',
  bgImg: false,
}
IconSvg.muiName = 'SvgIcon'
export default IconSvg
