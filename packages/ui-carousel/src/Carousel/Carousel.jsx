import React, { useRef, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSprings, animated } from 'react-spring'
import { useGesture } from 'react-use-gesture'

import { CarouselContext } from "./CarouselContextProvider"
import styles from './Carousel.module.css'

// https://tsh.io/blog/react-state-management-react-hooks-vs-redux/
const Carousel = ({ children, containerWidth }) => {
  const refContainer = useRef(0)
  const refItem = useRef(0)

  const [state, dispatch] = useContext(CarouselContext)

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
    x: i * containerWidth,
    display: 'block',
    pointerEvents: 'none',
  }))

  const bind = useGesture({
    onDrag: ({
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

      if (down && distance > containerWidth / 2) {
        dispatch({
          type: "SET_CURRENT_INDEX",
          payload: xDir > 0 ? -1 : 1,
        })
        cancel()
      }

      setSwipe(down, mx, distance)
    },
    onDragStart: () => {
      set((i) => {
        return { pointerEvents: 'none' }
      })
    },
    onMouseUp: (prop) => {
      set((i) => {
        return { pointerEvents: 'auto' }
      })
    },
    onTouchEnd: (prop) => {
      set((i) => {
        return { pointerEvents: 'auto' }
      })
    },
  })


  const setSwipe = (down, mx, distance) => {
    set((i) => {
      if (i < state.cursorIndex - 1 || i > state.cursorIndex + 1) return { display: 'none' }
      const x = (i - state.cursorIndex) * containerWidth + (down ? mx : 0)
      return {
        x,
        display: 'block',
        pointerEvents: distance > 0.5 ? 'none' : 'auto',
      }
    })
  }

  return (
    <div className={styles.carousel} ref={refContainer}>
      {
        springs.map(({ x, display, pointerEvents, userSelect }, i) => (
          <animated.div
            ref={refItem}
            {...bind()}
            key={i}
            style={{ display, transform: x.interpolate((g) => `translate3d(${g}px, 0, 0)`) }}
            className={styles.wrapper}
          >
            <animated.div
              className={styles.item}
              style={{pointerEvents, userSelect}}
            >
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
