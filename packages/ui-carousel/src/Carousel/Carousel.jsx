import React, { useRef, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSprings, animated } from 'react-spring'
import { useDrag } from 'react-use-gesture'

import { CarouselContext } from "./CarouselContextProvider"
import styles from './Carousel.module.css'

// https://tsh.io/blog/react-state-management-react-hooks-vs-redux/
const Carousel = ({ children }) => {
  const refContainer = useRef(0)

  const [state, dispatch] = useContext(CarouselContext)
  //const dragOffset = useRef(state.cursorIndex)

  useEffect(() => {
    dispatch({
      type: "SET_TOTAL_COUNT",
      payload: children.length,
    })
  }, [children])

  useEffect(() => {
    setSwipe()
  }, [state.cursorIndex])

  const [springs, set] = useSprings(children.length, (i) => ({
    x: i * 800,
    display: 'block',
  }))

  const bind = useDrag(({
    down,
    movement: [mx],
    direction: [xDir],
    distance,
    cancel,
  }) => {
    //в крайних положениях не дает свайпить дальше
    if ((children.length - 1 === state.cursorIndex && xDir < 0) || (state.cursorIndex === 0 && xDir > 0)) {
      cancel()
    }

    if (down && distance > refContainer.current.offsetWidth / 2) {
      dispatch({
        type: "SET_CURRENT_INDEX",
        payload: xDir > 0 ? -1 : 1,
      })
      cancel()
    }

    setSwipe(down, mx)
  })

  const setSwipe = (down, mx) => {
    set((i) => {
      if (i < state.cursorIndex - 1 || i > state.cursorIndex + 1) return { display: 'none' }
      const x = (i - state.cursorIndex) * refContainer.current.offsetWidth + (down ? mx : 0)
      return { x, display: 'block' }
    })
  }

  return (
    <div className={styles.carousel} ref={refContainer}>
      {
        springs.map(({ x, display, scale }, i) => (
          <animated.div
            {...bind()}
            key={Math.random().toString(36).substr(2, 9)}
            style={{ display, transform: x.interpolate((g) => `translate3d(${g}px, 0, 0)`) }}
            className={styles.wrapper}
          >
            <animated.div className={styles.item}>
              {children[i]}
            </animated.div>
          </animated.div>
        ))
      }
    </div>
  )
}

export default Carousel

Carousel.displayName = 'Carousel'

Carousel.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
}
