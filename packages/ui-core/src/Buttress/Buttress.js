import PropTypes from 'prop-types'
import React from 'react'
import clsx from 'clsx'
import styles from './Buttress.module.css'

const Buttress = (props) => {
  const {
    children,
    className,
    size = 60,
  } = props

  return (
    <div className={clsx(
      styles.buttressSize,
      styles.yMiddleWrapper,
      styles[`buttress${size}`],
      className,
    )}
    >
      {children && (
        <div className={clsx(styles.yMiddle)}>
          {children}
        </div>
      )}
    </div>
  )
}

Buttress.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  size: PropTypes.number,
}
export default Buttress
