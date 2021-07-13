import React from 'react'
import getDeities from './getDeities'

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SUCCEEDED':
      return {
        ...state,
        status: 'succeeded',
        data: {
          entries: action.payload.limit
            ? [...state.data.entries, ...action.payload.entries]
            : action.payload.entries,
          totalCount: action.payload.totalCount,
          limit: action.payload.limit,
          cursor: state.data.cursor + state.data.limit,
        },
      }
    case 'SET_LOADING':
      return {
        ...state,
        status: 'loading',
      }
    case 'SET_ERROR':
      return {
        ...state,
        status: 'failed',
        error: action.payload,
      }
    default:
      return state
  }
}

const initialState = {
  status: 'idle',
  error: null,
  data: {
    entries: [],
    totalCount: 0,
    limit: 10,
    cursor: 0,
  },
}

const useFetchMock = () => {
  const [state, setState] = React.useReducer(reducer, initialState)

  const handleSucceeded = ({
    delay = 1000, limit, cursor = 0, input,
  }) => {
    setState({ type: 'SET_LOADING' })
    getDeities({
      delay,
      limit,
      cursor: state.status === 'idle' ? cursor : state.data.cursor,
      input,
    }).then((res) => setState({ type: 'SET_SUCCEEDED', payload: res }))
  }
  const handleFailed = ({ delay = 1000 }) => {
    setTimeout(() => setState({ type: 'SET_ERROR', payload: new Error('kjkjjk') }), delay)
  }
  return {
    state,
    getSucceeded: handleSucceeded,
    getFailed: handleFailed,
  }
}

export default useFetchMock
