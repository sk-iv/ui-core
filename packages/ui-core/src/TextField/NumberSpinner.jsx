import React, { useState } from 'react'

import { IconSvg } from '@sivasifr/icons/IconSvg'
import { IconButton } from '../IconButton'
import { InputAdornment } from '../Input'
import TextField from './TextField'

// const REGEX = {
//   mail:'^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$',
//   digits:'^[-+]?[0-9]*\.?[0-9]+|$',
//   text:"[^\>]*"
// }

const NumberSpinner = ({ value, onValue }) => {
  const [amount, setAmount] = useState(value);
  // var inputEvent = new Event('input', { bubbles: true});

  return (
    <TextField
      name="numberSpinner"
      label="Кол-во примеров"
      type="text"
      value={amount}
      onChange={(e) => setAmount(e.target.value)}
      margin="normal"
      style={{ width: '130px' }}
      onDebounce={(e) => onValue(e)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <IconButton
              value={amount}
              onClick={(e) => {
                setAmount(parseInt(e.currentTarget.value) - 1);
              }}
            >
              <IconSvg name="minus" />
            </IconButton>
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              value={amount}
              onClick={(e) => {
                setAmount(parseInt(e.currentTarget.value) + 1);
              }}
            >
              <IconSvg name="plus" />
            </IconButton>
          </InputAdornment>
        ),
      }}

    />
  );
};
export default NumberSpinner;
