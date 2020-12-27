import React from 'react'
import clsx from 'clsx'

import vignettes from './vignettes.svg'
import styles from './Vignette.module.css'

const Vignette = ({
  name, className, strokeWidth = 2,
}) => (

  <svg
    className={clsx(
      styles.vignette,
      className,
    )}
    viewBox="0 0 80 10"
    height={10}
    width={80}
  >
    <use
      stroke="inherit"
      xlinkHref={`${vignettes}#${name}`}
      style={{ strokeWidth }}
    />
  </svg>
)
Vignette.defaultProps = {
  name: 'none',
}
Vignette.displayName = 'Vignette'
export default Vignette
