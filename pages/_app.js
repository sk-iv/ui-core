import React, { useEffect } from 'react'
import { MDXProvider } from '@mdx-js/react'
import {
  Route,
  Link,
  useLocation,
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
import TabsStory from '../docs/components/tabs.mdx'
import TextFieldStory from '../docs/components/TextField/textField.mdx'
import MenuStory from '../docs/components/Menu/menu.mdx'
import StepperStory from '../docs/components/Stepper/stepper.mdx'

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

const routes = {
  main: {
    path: '/',
    component: MainPage,
    label: 'Главная',
    exact: true,
  },
  icon: {
    path: '/icon',
    component: IconSvgStory,
    label: 'IconSvg',
  },
  combobox: {
    path: '/combobox',
    component: ComboboxFieldStory,
    label: 'Combobox',
  },
  checkbox: {
    path: '/checkbox',
    component: CheckboxStory,
    label: 'Checkbox',
  },
  drawer: {
    path: '/drawer',
    component: DrawerStory,
    label: 'Drawer',
  },
  button: {
    path: '/button',
    component: ButtonStory,
    label: 'Button',
  },
  chip: {
    path: '/chip',
    component: ChipStory,
    label: 'Chip',
  },
  list: {
    path: '/list',
    component: ListStory,
    label: 'List',
  },
  link: {
    path: '/link',
    component: LinkStory,
    label: 'Link',
  },
  menu: {
    path: '/menu',
    component: MenuStory,
    label: 'Menu',
  },
  stepper: {
    path: '/stepper',
    component: StepperStory,
    label: 'Stepper',
  },
  tabs: {
    path: '/tabs',
    component: TabsStory,
    label: 'Tabs',
  },
  'text-field': {
    path: '/text-field',
    component: TextFieldStory,
    label: 'TextField',
  },
  'infinite-scroll': {
    path: '/infinite-scroll',
    component: InfiniteScrollStory,
    label: 'InfiniteScroll',
  },
}

const components = {
  h1: (props) => <h1 className="text-2xl font-bold mt-4" {...props}>{props.children}</h1>,
  h2: (props) => <h2 className="text-xl mt-4" {...props}>{props.children}</h2>,
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

export default () => {
  const [fields, setFields] = React.useReducer(reducer, initialState)
  const location = useLocation()

  useEffect(() => {
    window.addEventListener('popstate', listenToPopstate);
    return () => {
      window.removeEventListener('popstate', listenToPopstate);
    }
  }, [])

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

  const listenToPopstate = () => {

  };
  const route = location.pathname.substring(1)
  const loc = route || 'main'

  return (
    <MDXProvider components={components}>

      <div className="wrapper bg-gray-100">
        <header className="main-head">Documentation</header>
        <nav className="main-nav ml-4">
          <ul>
            {
              Object.entries(routes).map(([key, rout]) => (
                <li key={key}>
                  <Link to={rout.path}>{rout.label}</Link>
                </li>
              ))
            }
          </ul>
        </nav>
        <main className="content bg-white p-3">
          <div className="container mx-auto">
            <PropsControlContext.Provider value={[fields, onChange, setBatch]}>
              <Route
                exact={routes[loc].exact}
                path={routes[loc].path}
                render={(props) => {
                  const Component = routes[loc].component
                  return (
                    <Component {...props} />
                  )
                }}
              />
            </PropsControlContext.Provider>
          </div>
        </main>
        <aside className="side" />
        <footer className="main-footer">{date}</footer>
      </div>
    </MDXProvider>
  )
}
