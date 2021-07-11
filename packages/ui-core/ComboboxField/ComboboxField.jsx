import React from 'react'
import PropTypes from 'prop-types'
import Autocomplete from './Autocomplete'
import TextField from '../TextField'

const ComboboxField = (props) => {
  const {
    className,
    disabled,
    fullWidth,
    getOptionLabel,
    inputValue,
    label,
    loading,
    multiple,
    name,
    onChange = () => {},
    options,
    value,
  } = props

  const handleChange = React.useCallback((e, newValue, reason, details) => {
    onChange({ target: { name } }, newValue, reason, details)
  }, [])

  return (
    <Autocomplete
      className={className}
      disabled={disabled}
      fullWidth={fullWidth}
      getOptionLabel={getOptionLabel}
      inputValue={inputValue}
      loading={loading}
      multiple={multiple}
      name={name}
      onChange={handleChange}
      onInputChange={handleChange}
      options={options}
      renderInput={(params) => <TextField {...params} label={label} />}
      value={value}
    />
  )
}

export default ComboboxField

ComboboxField.propTypes = {
  label: PropTypes.string,
}
