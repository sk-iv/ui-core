import PropTypes from 'prop-types'
import React from 'react'
import clsx from 'clsx'
import styles from './Buttress.module.css'
// https://css-tricks.com/aspect-ratio-boxes/
const Buttress = (props) => {
  const {
    children,
    className,
    aspectRatio = 1.6,
    background,
    overflowHidden = false,
  } = props

  const style = {
    '--aspect-ratio': aspectRatio,
    '--background': background,
    overflow: overflowHidden ? 'hidden' : '',
  }

  return (
    <div
      className={clsx(
        styles,
        className,
      )}
      style={style}
    >
      {children}
    </div>
  )
}

Buttress.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  aspectRatio: PropTypes.number,
  background: PropTypes.string,
  overflowHidden: PropTypes.bool,
}
export default Buttress
