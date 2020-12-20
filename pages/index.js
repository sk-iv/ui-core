import * as React from 'react'
import ReactDom from 'react-dom'
import App from './_app'

const root = document.querySelector('#root')

const render = () => {
  if (root) {
    ReactDom.render(
      <App />,
      root,
    )
  }
}

if (module.hot) {
  module.hot.accept()
}

render()
