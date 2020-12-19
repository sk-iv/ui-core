import React, { useReducer, createContext } from "react"
import clamp from '../utils/clamp'

// Create Context Object
export const CarouselContext = createContext(null)

const initialState = {
  cursorIndex: 0,
  totalCount: 0,
}

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_CURRENT_INDEX":
      return {
        ...state,
        cursorIndex: clamp(state.cursorIndex + action.payload, 0, state.totalCount),
      }
    case "SET_TOTAL_COUNT":
      return {
        ...state,
        totalCount: action.payload,
      }
    default:
      throw new Error()
  }
}
// Create a provider for components to consume and subscribe to changes
export const CarouselContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return <CarouselContext.Provider value={[state, dispatch]}>{props.children}</CarouselContext.Provider>
}