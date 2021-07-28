import * as React from 'react'
import { MDXProvider } from '@mdx-js/react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom'
import PropsControlContext from '../docs/layout/PropsControlContext'
import CodeBlock from '../docs/layout/CodeBlock'
import IconSvgStory from '../docs/components/iconSvg.mdx'
import ComboboxFieldStory from '../docs/components/comboboxField.mdx'
import CheckboxStory from '../docs/components/checkbox.mdx'
import ButtonStory from '../docs/components/button.mdx'
import ListStory from '../docs/components/list.mdx'
import InfiniteScrollStory from '../docs/patterns/infiniteScroll.mdx'
import MainPage from '../docs/mainPage.mdx'
import DrawerStory from '../docs/components/drawer.mdx'
import ChipStory from '../docs/components/chip.mdx'
import LinkStory from '../docs/components/link.mdx'

const initialState = {
  fields: {},
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_VALUE':
      return {
        ...state,
        fields: {
          ...state.fields,
          ...action.payload,
        },
      }
    default:
      return state
  }
}

const date = new Date(Date.now()).toLocaleString('ru', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
})

const routes = [
  {
    path: '/',
    component: MainPage,
    label: 'Главная',
    exact: true,
  },
  {
    path: '/icon',
    component: IconSvgStory,
    label: 'IconSvg',
  },
  {
    path: '/combobox',
    component: ComboboxFieldStory,
    label: 'Combobox',
  },
  {
    path: '/checkbox',
    component: CheckboxStory,
    label: 'Checkbox',
  },
  {
    path: '/drawer',
    component: DrawerStory,
    label: 'Drawer',
  },
  {
    path: '/button',
    component: ButtonStory,
    label: 'Button',
  },
  {
    path: '/chip',
    component: ChipStory,
    label: 'Chip',
  },
  {
    path: '/list',
    component: ListStory,
    label: 'List',
  },
  {
    path: '/link',
    component: LinkStory,
    label: 'Link',
  },

  {
    path: '/infinite-scroll',
    component: InfiniteScrollStory,
    label: 'InfiniteScroll',
  },
]

// A special wrapper for <Route> that knows how to
// handle "sub"-routes by passing them in a `routes`
// prop to the component it renders.
function RouteWithSubRoutes(route) {
  return (
    <Route
      exact={route.exact}
      path={route.path}
      render={(props) => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}

const components = {
  h1: (props) => <h1 className="text-2xl font-bold mt-4" {...props}>{ props.children }</h1>,
  h2: (props) => <h2 className="text-xl mt-4" {...props}>{ props.children }</h2>,
  pre: (props) => <div {...props} />,
  code: (props) => <CodeBlock {...props} />,
}

const getValue = (e) => {
  switch (e.target.type) {
    case 'text':
      return e.target.value
    case 'checkbox':
      return e.target.checked
    case 'select-one':
      return e.target.options[e.target?.selectedIndex].value
    default:
      return e.target.value
  }
}

export default (props) => {
  const [fields, setFields] = React.useReducer(reducer, initialState)
  const onChange = React.useCallback((e) => {
    setFields({
      type: 'CHANGE_VALUE',
      payload: { [e.target.name]: getValue(e) },
    })
  }, [])
  const setBatch = React.useCallback((batch) => {
    setFields({
      type: 'CHANGE_VALUE',
      payload: batch,
    })
  }, [])
  return (
    <MDXProvider components={components}>
      <Router>
        <div className="wrapper bg-gray-100">
          <header className="main-head">Documentation</header>
          <nav className="main-nav ml-4">
            <ul>
              {
            routes.map((route) => (
              <li>
                <Link to={route.path}>{route.label}</Link>
              </li>
            ))
          }
            </ul>
          </nav>
          <main className="content bg-white p-3">
            <Switch>
              <div className="container mx-auto">
                <PropsControlContext.Provider value={[fields, onChange, setBatch]}>
                  {routes.map((route, i) => (
                    <RouteWithSubRoutes key={i} {...route} {...props} />
                  ))}
                </PropsControlContext.Provider>
              </div>
            </Switch>
          </main>
          <aside className="side" />
          <footer className="main-footer">{date}</footer>
        </div>
      </Router>
    </MDXProvider>
  )
}
