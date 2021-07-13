import React from 'react'
import ComboboxField from '@sivasifr/ui-core/ComboboxField'
import throttle from 'lodash.throttle'
import useFetchMock from '../mocks/useFetchMock'

const initialState = {
  value: '',
  options: [],
  selectedOptions: '',
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_VALUE':
      return {
        ...state,
        value: action.payload,
      }
    case 'SELECT_OPTIONS':
      return {
        ...state,
        selectedOptions: action.payload,
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

export default (props) => {
  const { state, getSucceeded } = useFetchMock()
  const [st, dispatch] = React.useReducer(reducer, initialState)

  const fetch = React.useMemo(
    () => throttle((request) => getSucceeded(request), 200),
    [],
  )

  React.useEffect(() => {
    fetch({ input: st.value })
  }, [st.value, fetch])

  React.useEffect(() => {
    let newOptions = [];

    if (state.data.entries.length > 0) {
      newOptions = [...newOptions, ...state.data.entries];
    }
    dispatch({ type: 'CHANGE_OPTIONS', payload: newOptions })
  }, [state.data.entries])

  const handleChange = (e, newValue, reason) => {
    if (reason === 'selectOption') {
      dispatch({ type: 'SELECT_OPTIONS', payload: newValue })
      dispatch({ type: 'CHANGE_VALUE', payload: newValue.name })
    }
    if (reason === 'input') {
      dispatch({ type: 'CHANGE_VALUE', payload: newValue })
    }
    if (reason === 'clear') {
      dispatch({ type: 'SELECT_OPTIONS', payload: [] })
      dispatch({ type: 'CHANGE_VALUE', payload: '' })
    }
    if (reason === 'removeOption') {
      dispatch({ type: 'SELECT_OPTIONS', payload: newValue })
    }
    if (reason === 'reset') {
      dispatch({ type: 'CHANGE_VALUE', payload: '' })
    }
  }

  return (
    <ComboboxField
      fullWidth={props?.fullWidth}
      getOptionLabel={(option) => (typeof option === 'string' ? option : option.name)}
      inputValue={st.value}
      label="Греческое божество"
      loading={state.status === 'loading'}
      name="deitiesAsync"
      onChange={handleChange}
      options={st.options}
      value={st.selectedOptions ? st.selectedOptions : null}
      isOptionEqualToValue={(option, value) => option.name === value.name}
      required={props?.required}
      error={props?.error}
      helperText={props?.helperText}
      disabled={props?.disabled}
    />
  )
}
