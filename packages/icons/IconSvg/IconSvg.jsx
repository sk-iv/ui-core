import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import icons24 from '../glyphs/24/icons24.json'
import icons96 from '../glyphs/96/icons96.json'
import styles from './IconSvg.mdl.css'

const IconSvg = ({
  ariaHidden = true,
  ariaLabelledby,
  className,
  focusable = false,
  isFilled = false,
  name,
  size = 'md',
}) => {
  const refStroke = React.useRef()
  const [length, setLength] = React.useState(0)
  React.useEffect(() => {
    if (refStroke.current) {
      setLength(refStroke.current.getTotalLength())
    }
  }, [])
  const type = {
    sm: {
      size: 16,
      set: icons24,
      viewBox: 24,
    },
    md: {
      size: 24,
      set: icons24,
      viewBox: 24,
    },
    lg: {
      size: 96,
      set: icons96,
      viewBox: 96,
    },
  }

  if (!name || !type[size].set[name]) {
    console.error([
      '❌ `IconSvg`: идентификатор иконки отсутствует или содержит неправильный идентификатор'
    ].join('\n'))
    return (
      <svg
        className={clsx(
          styles.icon,
          styles[`${size}Size`],
        )}
        viewBox={`0 0 ${type[size].viewBox} ${type[size].viewBox}`}
      />
    )
  }

  return (
    <svg
      className={clsx(
        styles.icon,
        className,
        styles[`${size}Size`]
      )}
      style={{"--total-length": length}}
      viewBox={`0 0 ${type[size].viewBox} ${type[size].viewBox}`}
      aria-hidden={ariaHidden}
      aria-labelledby={ariaLabelledby}
      focusable={focusable}
    >
      {Object.entries(type[size].set[name]).reduce((acc, [key, value]) => {
        if (isFilled && key.includes('fill')) {
          return ([
            ...acc,
            <path
              key={key}
              d={value}
              className={clsx(styles.fill, styles[key])}
            />
          ])
        }
        if (key.includes('stroke') || key.includes('edge')) {
          return ([
            ...acc,
            <path
              ref={refStroke}
              key={key}
              d={value}
              vectorEffect="non-scaling-stroke"
            />
          ])
        }
        return acc
      }, [])}
    </svg>
  )
}

IconSvg.displayName = 'SvgIcon'
IconSvg.propTypes = {
  /**
  * Идентификатор
  */
  name: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
  /**
  * a11y: скрыть от скринридера в ситуации если рядом есть лейбл
  */
  ariaHidden: PropTypes.bool,
  /**
  * a11y: ссылка на id элемента-лейбла
  */
  ariaLabelledby: PropTypes.string,
  focusable: PropTypes.bool,
  isFilled: PropTypes.bool,
}
export default React.memo(IconSvg)
