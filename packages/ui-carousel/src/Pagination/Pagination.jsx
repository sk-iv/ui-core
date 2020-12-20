import React, { useContext } from 'react'
import { CarouselContext } from '../Carousel/CarouselContextProvider'
import styles from './Pagination.module.css'

const Pagination = (props) => {
  const { arrowNext, arrowPrev } = props
  const [state, dispatch] = useContext(CarouselContext)

  const next = React.cloneElement(arrowNext, {
    onClick: () => dispatch({
      type: 'SET_CURRENT_INDEX',
      payload: 1,
    }),
    disabled: state.cursorIndex + 1 === state.totalCount,
    className: styles.arrowNext,
  })
  const prev = React.cloneElement(arrowPrev, {
    onClick: () => dispatch({
      type: 'SET_CURRENT_INDEX',
      payload: -1,
    }),
    disabled: state.cursorIndex === 0,
    className: styles.arrowPrev,
  })
  return (
    <div className={styles.pagination}>
      {prev}
      {next}
      <span className={styles.proportion}>
        <span className={styles.numerator}>{state.cursorIndex + 1}</span>
        /
        <span className={styles.denominator}>{state.totalCount}</span>
      </span>
    </div>
  )
}

export default Pagination
