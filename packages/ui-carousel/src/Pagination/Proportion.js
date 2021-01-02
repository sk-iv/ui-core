import React, { useContext } from 'react'
import clsx from 'clsx'

import { CarouselContext } from '../Carousel/CarouselContextProvider'
import styles from './Pagination.module.css'

const Proportion = ({
  classNameRoot, classNameNum, classNameDen, separator = '/',
}) => {
  const [state] = useContext(CarouselContext)

  return (
    <span className={clsx(styles.proportion, classNameRoot)}>
      <span className={clsx(styles.numerator, classNameNum)}>{state.cursorIndex + 1}</span>
      {separator}
      <span className={clsx(styles.denominator, classNameDen)}>{state.totalCount}</span>
    </span>
  )
}

export default Proportion
