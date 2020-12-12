import React from 'react'
import clsx from 'clsx'
import icons24 from './icons/24/icons-24.svg'
// import icons96 from './icons/96/icons-96.svg'
import styles from './SvgIcon.module.css'

function SvgUse({
  name, size, bgImg, color, style, className, outline,
}) {
  const type = {
    xs: {
      size: 18,
      path: `${icons24}#${name}`,
    },
    sm: {
      size: 24,
      path: `${icons24}#${name}`,
    },
    lg: {
      size: 96,
      path: `/assets/icons/96/${name}.svg#ill`,
    },
  }

  return (

    name === 'none'
      ? (
        <svg
          className={clsx(
            styles.icon,
            styles[`icon-${type[size].size}`],
          )}
          viewBox={`0 0 ${type[size].size} ${type[size].size}`}
        />
      )
      : (
        <svg
          className={clsx(
            styles.icon,
            styles[`icon-${type[size].size}`],
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
SvgUse.defaultProps = {
  name: 'none',
  size: 'sm',
  bgImg: false,
  color: 'hsla(0, 0%, 0%, 0.4)',
}
SvgUse.muiName = 'SvgIcon'
export default SvgUse
