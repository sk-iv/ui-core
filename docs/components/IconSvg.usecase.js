import React from 'react'
import IconSvg from '@sivasifr/icons/IconSvg'

export default (props) => (
  <>
    <IconSvg
      ariaHidden={props?.ariaHidden}
      className={props?.className}
      focusable={props?.focusable}
      isFilled={props?.isFilled}
      name="cart"
      size={props?.size}
    />
    <IconSvg
      ariaHidden={props?.ariaHidden}
      className={props?.className}
      focusable={props?.focusable}
      isFilled={props?.isFilled}
      name="times"
      size={props?.size}
    />
    <IconSvg
      ariaHidden={props?.ariaHidden}
      className={props?.className}
      focusable={props?.focusable}
      isFilled={props?.isFilled}
      name="vegetablesFruits"
      size="lg"
    />
  </>
)
