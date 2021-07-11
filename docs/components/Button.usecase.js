import React from 'react'
import Button from '@sivasifr/ui-core/Button'

export default (props) => (
  <Button
    color={props?.color}
    disabled={props?.disabled}
    size={props?.size}
    variant={props?.variant}
    fullWidth={props?.fullWidth}
    href={props?.href}
    className={props?.className}
  >
    Кнопка
  </Button>
)
