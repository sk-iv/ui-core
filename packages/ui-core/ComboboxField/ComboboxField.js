import React from 'react'
import Select from 'react-select'

import { IconSvg } from '@sivasifr/icons/IconSvg'
import { FormControl } from '../Form'
import { InputBase, InputLabel, InputAdornment } from '../Input'

const ArrowCaretIcon = () => null

const IndicatorsContainer = (props) => <div className="select-input-caret-icon">{props.children}</div>

const ValueContainer = (props) => {
  const {
    children,
    ...other
  } = props

  return (
    <InputBase
      fullWidth={props.selectProps.textFieldProps.fullWidth}
      endAdornment={(
        <InputAdornment position="end">
          <IconSvg
            name={props.selectProps.menuIsOpen ? 'chevron-top' : 'chevron-down'}
          />
        </InputAdornment>
      )}
    >
      {children}
    </InputBase>
  )
}

const Control = ({ children, ...other }) => (
  <FormControl
    disabled={other.isDisabled}
    fullWidth={other.selectProps.textFieldProps.fullWidth}
    {...other.innerProps}
  >
    {other.selectProps.textFieldProps.label && (
    <InputLabel {...other.selectProps.textFieldProps.InputLabelProps}>
      {other.selectProps.textFieldProps.label}
    </InputLabel>
    )}
    {children}
  </FormControl>
)

const SingleValue = (props) => (
  <div
    className="select-input-value"
    dangerouslySetInnerHTML={{ __html: props.children }}
  />
)

const IndicatorSeparator = () => null

const Placeholder = () => null

const ComboboxField = (props) => {
  const {
    className,
    disabled,
    fullWidth,
    label,
    loading,
    name,
    onChange,
    options,
    value,
    rules,
    isSearchable,
  } = props

  return (
    <Select
      value={value}
      name={name}
      isDisabled={disabled}
      options={options}
      onChange={onChange}
      isSearchable={isSearchable}
      components={{
        DropdownIndicator: ArrowCaretIcon,
        IndicatorSeparator,
        Placeholder,
        IndicatorsContainer,
        Control,
        ValueContainer,
        SingleValue,
      }}
      textFieldProps={{
        label,
        fullWidth,
        disabled,
        rules,
        InputLabelProps: {
          shrink: !!value,
        },
      }}
    />
  )
}

export default ComboboxField
