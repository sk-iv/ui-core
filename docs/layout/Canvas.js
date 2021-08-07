import React, { useMemo } from 'react'
import CodeBlock from './CodeBlock'
import usePropsControl from './usePropsControl'

export default ({
  code,
  usecase,
}) => {
  const [props] = usePropsControl()
  const element = useMemo(() => React.cloneElement(usecase, props.fields), [usecase, props])
  return (
    <>
      <div className="bg-gray-50 p-3 border mt-3">
        {element}
      </div>
      {code && (
      <details>
        <summary>View code</summary>
        <code>
          <CodeBlock>
            {code}
          </CodeBlock>
        </code>
      </details>
      )}
    </>
  )
}
