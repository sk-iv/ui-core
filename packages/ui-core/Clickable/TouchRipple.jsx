import * as React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import styles from './TouchRipple.mdl.css'

const DURATION = 550
export const DELAY_RIPPLE = 80

const TouchRipple = React.forwardRef((props, ref) => {
  const { center: centerProp = false, className, diameter, keyRipple, ...other } = props
  const [ripples, setRipples] = React.useState([])
  const nextKey = React.useRef(0)
  const rippleCallback = React.useRef(null)
  const [ripple, setRipple] = React.useState(false)
  const [pulsated, setPulsated] = React.useState(false)

  React.useEffect(() => {
    if (rippleCallback.current) {
      rippleCallback.current()
      rippleCallback.current = null
    }
  }, [ripples])

  // Used to filter out mouse emulated events on mobile.
  const ignoringMouseDown = React.useRef(false)
  // We use a timer in order to only show the ripples for touch "click" like events.
  // We don't want to display the ripple for touch scroll events.
  const startTimer = React.useRef(null)

  // This is the hook called once the previous timeout is ready.
  const startTimerCommit = React.useRef(null)
  const container = React.useRef(null)

  React.useEffect(() => () => {
    clearTimeout(startTimer.current)
  }, [])

  const pulsate = React.useCallback(() => {
    setPulsated(true)
  }, [setPulsated])
  const start = React.useCallback(() => {
    setRipple(true)
  }, [setRipple])
  const stop = React.useCallback(() => {
    setRipple(false)
  }, [setRipple])

  React.useImperativeHandle(
    ref,
    () => ({
      pulsate,
      start,
      stop,
    }),
    [pulsate, start, stop],
  )

  const handleAnimationEnd = () => {
    setRipple(false)
  }

  return (
    <span 
      className={clsx(
        styles.root,
        {
          [styles.ripple]: ripple,
          [styles.pulsate]: pulsated,
        },
        className
      )}
      style={{"--height": `${diameter}px`, "--width": `${diameter}px`, "--duration": `${diameter/0.2}ms`}}
      onAnimationEnd={handleAnimationEnd}
      ref={container} 
      {...other} 
    />
  )
})

TouchRipple.propTypes = {
  /**
   * @ignore
   */
  className: PropTypes.string,
}

export default TouchRipple
