import React, { useRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import clamp from 'lodash/clamp'
import { useSprings, animated, interpolate } from 'react-spring'
import { useGesture } from 'react-use-gesture'
import { useMeasure } from 'react-use'
import styles from './Carousel.module.css'
import styled from 'styled-components'

const CarouselTrack = styled.div.withConfig({
  shouldForwardProp: (prop) => !['size', 'offset'].includes(prop),
})`
  ${({
    buttress = 60,
  }) => `
  position: relative;
  overflow: hidden;
  display: flex;
  flex-wrap:nowrap;
  width: 100%;
  background-color: #cccccc;

  &::after {
   content: '';
   display: block;
   padding-bottom: ${buttress}%;
   height: 0;
  }
`}`

const Carousel = React.forwardRef(({ children }) => {
  const index = useRef(0)
  const currentHeight = useRef(null)
  const [cursor, setCursor] = useState('grab')

  const [ref, { width }] = useMeasure()

  const [props, set] = useSprings(children.length, (i) => ({
    x: i * 2000,
    display: 'flex',
  }))

  useEffect(() => {
    if (width > 0) {
      set((i) => ({ x: i * width, display: 'flex' }))
    }
  }, [width])

  const bind = useGesture({
    onDrag: ({
      down,
      movement: [mx],
      direction: [xDir],
      distance,
      cancel,
    }) => {
      if ((index.current === 0 && xDir > 0) || (index.current === children.length - 1 && xDir < 0)) {
        setCursor('not-allowed')
        cancel()
      }
      if (down && distance > width / 2) {
        cancel()
        index.current = clamp(index.current + (xDir > 0 ? -1 : 1), 0, children.length - 1)
      }

      set((i) => {
        if (i < index.current - 1 || i > index.current + 1) return { display: 'none' }
        const x = (i - index.current) * width + (down ? mx : 0)
        setCursor('grabbing')
        return {
          x,
          display: 'flex',
        }
      })
    },
    onDragEnd: () => setCursor('grab'),
  })

  return (
    <CarouselTrack
      style={{
        cursor,
      }}
      ref={ref}
      {...bind()}
    >
      {
        props.map(({ x, display }, i) => (
          <animated.div
            key={i}
            style={{
              display,
              transform: interpolate([x], (x) => `translate3d(${x}px, 0, 0)`)
            }}
            className={styles.wrapper}
          >
            {
              React.cloneElement(
                children[i],
                { ref: (el) => currentHeight.current = el && el.getBoundingClientRect()}
              )
            }
          </animated.div>
        ))
      }
    </CarouselTrack>
  )
})

export default Carousel

Carousel.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
}
