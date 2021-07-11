import React from 'react'
import { Collapse } from '@sivasifr/ui-core/Collapse'
import { Button } from '@sivasifr/ui-core/Button'
import IconSvg from '@sivasifr/icons/IconSvg'

export default () => {
  const [checked, setChecked] = React.useState(false)
  const handleChange = () => {
    setChecked(!checked)
  }
  return (
    <>
      <Button onClick={handleChange}><IconSvg name="arrowLeft" /></Button>
      <Collapse in={checked}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et harum illum modi nam
        numquam porro quam tempora temporibus unde veritatis.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et harum illum modi nam
      </Collapse>
    </>
  )
}
