import * as React from 'react'
import ReactDom from 'react-dom'
import {
  BrowserRouter as Router,
} from 'react-router-dom'
import App from './_app'

const root = document.querySelector('#root')

const render = () => {
  if (root) {
    ReactDom.render(
      <Router><App /></Router>,
      root,
    )
  }
}

if (module.hot) {
  module.hot.accept()
}

render()
