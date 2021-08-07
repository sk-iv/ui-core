import React from 'react'
import clsx from 'clsx'
import usePropsControl from './usePropsControl'

export default ({
  of,
}) => {
  const [fields, onChange, setBatch] = usePropsControl()

  React.useEffect(() => {
    const props = Object.entries(of.properties).reduce((acc, [key, value]) => (
      { ...acc, [key]: value.default }
    ), {})
    setBatch(props)
  }, [])

  return (
    <div className="mt-4">
      <table className="table-fixed border-collapse border border-gray-200">
        <thead>
          <tr>
            <th>Свойство</th>
            <th>Контрол</th>
            <th>Тип</th>
            <th>Описание</th>
            <th>Дефолтное</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(of.properties).map(([key, value]) => (
            <tr key={key}>
              <td className="border border-gray-200">
                <span
                  className={clsx({
                    asterisk: of.required && of.required.some((item) => item === key),
                  })}
                  title="Обязательное свойство"
                >
                  {key}
                </span>
              </td>
              <td className="border border-gray-200">
                {value.type === 'string' && !value.enum && (
                  <input type="text" name={key} value={fields[key]?.value} onChange={onChange} />
                )}
                {value.type === 'string' && value.enum && (
                  <select name={key} onChange={onChange}>
                    {value.enum.map((option) => (
                      <option key={option} value={option} defaultValue={value.default === option}>
                        {option}
                      </option>
                    ))}
                  </select>
                )}
                {value.type === 'boolean' && (
                  <input type="checkbox" name={key} checked={fields[key]?.checked} onChange={onChange} />
                )}
              </td>
              <td className="border border-gray-200">
                {value.type}
                {
              value.enum
                ? <span className="text-gray-400">{` ${value.enum.join(' | ')}`}</span>
                : null
              }
              </td>
              <td className="border border-gray-200">
                {value.description || <span className="text-gray-300">-</span>}
              </td>
              <td className="border border-gray-200">
                {
              value.default != null
                ? value.default.toString()
                : <span className="text-gray-300">-</span>
              }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
