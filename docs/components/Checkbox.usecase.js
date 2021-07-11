import React from 'react'
import Checkbox from '@sivasifr/ui-core/Checkbox'
import { FormControlLabel } from '@sivasifr/ui-core/Form'

const fields = {
  kikazaru: 'не слышу о зле',
  mizaru: 'не вижу зла',
  iwazaru: 'не говорю о зле',
  shizaru: 'иногда в композицию добавляется четвёртая обезьяна, символизирующая принцип «не совершаю зла»',
}

export default React.memo((props) => {
  const [checkedValues, setCheckedValues] = React.useState([])

  const handleChange = React.useCallback(({ target }) => {
    const arr = checkedValues.some((value) => value === target.value)
      ? checkedValues.filter((value) => value !== target.value)
      : [...checkedValues, target.value]
    setCheckedValues(arr)
  }, [checkedValues])

  return (
    <div className="w-72 flex flex-col">
      {Object.entries(fields).map(([key, field]) => (
        <FormControlLabel
          key={key}
          control={(
            <Checkbox
              checked={checkedValues.some((value) => value === key)}
              onChange={handleChange}
              name="threeMonkeys"
              indeterminate={props?.indeterminate}
              value={key}
            />
        )}
          className={props?.className}
          error={props?.error}
          disabled={props?.disabled}
          required={props?.required}
          label={field}
        />
      ))}
    </div>
  )
})
