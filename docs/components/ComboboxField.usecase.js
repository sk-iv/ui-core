import React from 'react'
import ComboboxField from '@sivasifr/ui-core/ComboboxField'
import deities from '../mocks/deities.json'

const initialState = {
  value: '',
  options: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_VALUE':
      return {
        ...state,
        value: action.payload,
      }
    case 'CHANGE_OPTIONS':
      return {
        ...state,
        options: action.payload,
      }
    default:
      return state
  }
}

export default () => {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  const handleChangeSelect = (e, newValue, reason) => {
    if (reason === 'selectOption') {
      dispatch({ type: 'CHANGE_OPTIONS', payload: newValue })
      dispatch({ type: 'CHANGE_VALUE', payload: newValue.name })
    }
    if (reason === 'input') {
      dispatch({ type: 'CHANGE_VALUE', payload: newValue })
    }
    if (reason === 'clear') {
      dispatch({ type: 'CHANGE_OPTIONS', payload: [] })
      dispatch({ type: 'CHANGE_VALUE', payload: '' })
    }
    if (reason === 'removeOption') {
      dispatch({ type: 'CHANGE_OPTIONS', payload: newValue })
    }
  }
  return (
    <ComboboxField
      className="mb-3"
      fullWidth
      getOptionLabel={(option) => option.name}
      inputValue={state.value}
      label="Греческое божество"
      multiple
      name="deities"
      onChange={handleChangeSelect}
      options={deities}
      value={state.options}
    />
  )
}
