import React from 'react'
import PropsControlContext from './PropsControlContext'

export default function useFormControl() {
  return React.useContext(PropsControlContext)
}
