import React from 'react'
import ComboboxField from '@sivasifr/ui-core/ComboboxField'
import throttle from 'lodash.throttle'
import deities from '../mocks/deities.json'

const getDeities = (request) => new Promise((resolve) => {
  setTimeout(() => {
    if (!request.input) {
      resolve([])
    }
    const retult = deities.filter((item) => item.name.includes(request.input))
    resolve(retult)
  }, 1000)
})

const initialState = {
  value: '',
  options: [],
  selectedOptions: '',
  isLoading: false,
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
    case 'IS_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      }
    case 'ERROR':
      return {
        ...state,
        error: action.payload,
      }
    default:
      return state
  }
}

export default () => {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  const fetch = React.useMemo(
    () => throttle((request) => getDeities(request), 200),
    [],
  )

  React.useEffect(() => {
    let active = true
    const fetchData = async () => {
      dispatch({ type: 'IS_LOADING', payload: true })

      try {
        const results = await fetch({ input: state.value })
        if (active) {
          let newOptions = [];

          if (results.length > 0) {
            newOptions = [...newOptions, ...results];
          }
          dispatch({ type: 'CHANGE_OPTIONS', payload: newOptions })
        }
      } catch (e) {
        dispatch({ type: 'ERROR', payload: false })
      } finally {
        dispatch({ type: 'IS_LOADING', payload: false })
      }
    }

    fetchData()

    return () => {
      active = false
    }
  }, [state.value, fetch])

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
      fullWidth
      getOptionLabel={(option) => (typeof option === 'string' ? option : option.name)}
      inputValue={state.value}
      label="Греческое божество"
      loading={state.isLoading}
      name="deitiesAsync"
      onChange={handleChange}
      options={state.options}
      value={state.selectedOptions ? state.selectedOptions : null}
      isOptionEqualToValue={(option, value) => option.name === value.name}
    />
  )
}
