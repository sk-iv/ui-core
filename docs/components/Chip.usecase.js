import React from 'react'
import Chip from '@sivasifr/ui-core/Chip'
import IconSvg from '@sivasifr/icons/IconSvg'

export default (props) => {
  const handleClick = () => {
    console.info('You clicked the Chip.');
  }
  return (
    <>
      <Chip
        color="default"
        label="default"
        onClick={handleClick}
        clickable={props.clickable}
        component="a"
        href="/hghg"
      />
      <Chip color="primary" label="primary" />
      <Chip color="secondary" label="secondary" />
      <Chip color="accent" label="accent" />
      <Chip
        icon={(
          <IconSvg name="cart" className="text-white" />
        )}
        label="avatar"
        onDelete={() => {}}
      />
    </>
  )
}
