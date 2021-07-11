import React from 'react'

/**
 * @ignore - internal component.
 */
const PropsControlContext = React.createContext()

if (process.env.NODE_ENV !== 'production') {
  PropsControlContext.displayName = 'PropsControlContext'
}

export default PropsControlContext
