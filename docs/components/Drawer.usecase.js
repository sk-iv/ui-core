import React from 'react'
import Drawer from '@sivasifr/ui-core/Drawer'
import Button from '@sivasifr/ui-core/Button'

export default (props) => {
  const [state, setState] = React.useState(false);
  const toggleDrawer = () => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState(!state);
  };
  return (
    <div>
      <Button onClick={toggleDrawer()}>Переключить</Button>
      <Drawer
        anchor={props.anchor}
        open={state}
        onClose={toggleDrawer()}
        variant={props.variant}
      >
        hghghgh
      </Drawer>
    </div>
  )
}
