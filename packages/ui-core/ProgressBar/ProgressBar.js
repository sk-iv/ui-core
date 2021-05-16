import React from 'react'
import clsx from 'clsx'

import styles from './ProgressBar.mdl.css'

const ProgressBar = ({ icon, amt = 0, style }) => (
  <>
    <div
      className={styles["progress-bar"]}
      style={{
        width: '100%',
        ...style,
      }}
    >
      {icon && icon}
      <span
        className={clsx(styles['progress-bar-indicator'])}
        style={{
          width: `${amt}%`,
          backgroundColor: 'rgba(255,255,255,0.5)',
        }}
      />
    </div>
  </>
)
export default ProgressBar
