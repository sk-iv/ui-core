import React from 'react'
import { useIntersecting } from '@sivasifr/ui-core/utils'
import useFetchMock from '../mocks/useFetchMock'

export default () => {
  const { state, getSucceeded } = useFetchMock()
  const refEl = React.useRef()
  const visible = useIntersecting(refEl)

  React.useEffect(() => {
    if (!!visible
      && (state.status === 'succeeded' || state.status === 'idle')
      && state.data.totalCount >= state.data.entries.length
    ) {
      getSucceeded({ limit: 20 })
    }
  }, [visible])
  return (
    <div className="h-72 overflow-y-auto w-40 bg-white">
      <ul>
        {state.data.entries.length > 0 && state.data.entries.map((item) => (
          <li key={item.name}>{item.name}</li>
        ))}
      </ul>

      <div ref={refEl}>
        {state.status === 'loading' && <span className="font-bold">Loading...</span>}
      </div>
    </div>
  )
}
