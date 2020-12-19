import * as React from 'react'
import ReactDom from 'react-dom'
import App from './_app'

const devMode = process.env.NODE_ENV !== 'production'

const root = document.querySelector('#root')

const render = () => {
  if (root) {
    ReactDom.render(
      <App />,
      root,
    )
  }
}

// $FlowIssue
if (module.hot) {
  module.hot.accept()
}

render()