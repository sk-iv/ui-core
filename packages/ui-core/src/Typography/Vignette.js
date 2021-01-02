import React from 'react'
import clsx from 'clsx'

import styles from './Vignette.module.css'

const Vignette = ({
  className, strokeWidth = 2, segments = 2, curvature = 1, height = 0, width = 12, strokeDasharray = '1',
}) => (
  <svg
    className={clsx(
      styles.vignette,
      className,
    )}
    height="100%"
    width="100%"
    style={{ maxWidth: segments * 2 * width }}
  >
    <pattern
      id="pattern-vignette"
      x="0"
      y="0"
      width={width * 2}
      height={height * 2 + strokeWidth}
      patternUnits="userSpaceOnUse"
      viewBox={`0 0 ${width * 2} ${height * 2 + strokeWidth}`}
    >
      <path
        className={className}
        d={`M0,${height + strokeWidth * 0.5} c${width - (width * curvature)},0,${width * curvature},-${height},${width},-${height} s${width * curvature},${height},${width},${height}`}
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDasharray}
      />
    </pattern>
    <rect stroke="none" x="0" y="0" width="100%" height={height * 2 + strokeWidth} fill="url(#pattern-vignette)" />
  </svg>
)
Vignette.defaultProps = {
  name: 'none',
}
Vignette.displayName = 'Vignette'
export default Vignette
