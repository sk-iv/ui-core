import React from 'react'
import TextField from '@sivasifr/ui-core/TextField'
import { InputAdornment } from '@sivasifr/ui-core/Input'
import Tooltip from '@sivasifr/ui-core/Tooltip'
import IconButton from '@sivasifr/ui-core/IconButton'
import IconSvg from '@sivasifr/icons/IconSvg'

export default () => {
  const [answer, setAnser] = React.useState('')
  const handleChange = (e) => {
    setAnser(e.target.value)
  }
  return (

    <>
      <TextField
        name="answer"
        label="Ответ"
        type="text"
        value={answer}
        fullWidth
        spellCheck={false}
        autoFocus
        multiline
        maxRows="8"
        onChange={handleChange}
        margin="normal"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Tooltip title="Ответить (Page Down)">
                <span>
                  <IconButton
                    color="primary"
                    onClick={() => { }}
                  >
                    <IconSvg name="arrowLeft" />
                  </IconButton>
                </span>
              </Tooltip>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        label="Лейбл"
      />
    </>
  )
}
