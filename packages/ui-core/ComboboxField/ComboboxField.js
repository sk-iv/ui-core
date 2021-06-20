import React from 'react'
import Select from 'react-select'

import IconSvg from '@sivasifr/icons/IconSvg'
import { FormControl } from '../Form'
import { InputBase, InputLabel, InputAdornment } from '../Input'
import Autocomplete from './Autocomplete'
import TextField from '../TextField'

const ComboboxField = (props) => {
  const {
    className,
    disabled,
    fullWidth,
    label,
    loading,
    multiple,
    name,
    onChange = () => {},
    onInputChange,
    options,
    inputValue,
    value,
    rules,
    isSearchable,
  } = props

  const handleChange = React.useCallback((e, newValue, reason, details) => {
    onChange({ target: { name } }, newValue, reason, details)
  }, [])

  return (
    <Autocomplete
      name={name}
      multiple
      inputValue={inputValue}
      value={value}
      options={options}
      //getOptionLabel={(option) => option.label}
      onInputChange={handleChange}
      onChange={handleChange}
      renderInput={(params) => {
        return (<TextField {...params} label="Combo box" />)
      }}
    />
  )
}

export default ComboboxField
