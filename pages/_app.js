import * as React from 'react'
import Pagination, { Proportion } from '@sivasifr/ui-carousel/Pagination'
import { Button } from '@sivasifr/ui-core/Button'
import { Carousel, CarouselContextProvider } from '@sivasifr/ui-carousel/Carousel'
import { AppBar } from '@sivasifr/ui-core/AppBar'
import List, { ListItem } from '@sivasifr/ui-core/List'
import IconSvg from '@sivasifr/icons/IconSvg'
import { Buttress } from '@sivasifr/ui-core/Buttress'
import { Drawer } from '@sivasifr/ui-core/Drawer'
import { Typography, Vignette } from '@sivasifr/ui-core/Typography'
import Paper from '@sivasifr/ui-core/Paper'
import Link from '@sivasifr/ui-core/Link'
import { Collapse } from '@sivasifr/ui-core/Collapse'
import TextField from '@sivasifr/ui-core/TextField'
import ComboboxField from '@sivasifr/ui-core/ComboboxField'

const menu = [
  'Образование',
  'Просвещение',
]

// const options = [
//   { value: 'chocolate', label: 'Chocolate' },
//   { value: 'strawberry', label: 'Strawberry' },
//   { value: 'vanilla', label: 'Vanilla' },
// ]

const options = [
  'Chocolate2',
  'Strawberry2',
  'Vanilla2',
]

const initialState = {
  value: '',
  options: [options[0]],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_VALUE':
      return {
        ...state,
        value: action.payload,
      }
    case 'CHANGE_OPTIONS':
      return {
        ...state,
        options: action.payload,
      }
    default:
      return state
  }
}

const App = () => {
  const [open, setOpen] = React.useState(false)
  const [checked, setChecked] = React.useState(false)
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const handler = (e) => {
    setOpen(true)
  }
  const handleChange = () => {
    setChecked(!checked)
  }

  const handleChangeSelect2 = (e, newValue, reason, details) => {
    console.log('newValue', newValue, reason)
    if (reason === 'selectOption') {
      dispatch({ type: 'CHANGE_OPTIONS', payload: newValue })
      dispatch({ type: 'CHANGE_VALUE', payload: '' })
    }
    if (reason === 'input') {
      dispatch({ type: 'CHANGE_VALUE', payload: newValue })
    }
    if (reason === 'clear') {
      dispatch({ type: 'CHANGE_OPTIONS', payload: [] })
      dispatch({ type: 'CHANGE_VALUE', payload: '' })
    }
    if (reason === 'removeOption') {
      dispatch({ type: 'CHANGE_OPTIONS', payload: newValue })
    }
  }
  return (
    <>
      <AppBar>
        <List>
          {menu.map((item) => (<ListItem key={item} button>{item}</ListItem>))}
        </List>
        <Button onClick={handler}><IconSvg name="plus" /></Button>
      </AppBar>
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <div>ffggf</div>
      </Drawer>
      <Paper style={{ width: 400 }}>
        <Buttress
          aspectRatio={16 / 9}
          background="center / cover no-repeat url('https://www.belanta.vet/vet-blog/wp-content/uploads/2020/01/1-13.jpg')"
        >
          <Typography
            component="h2"
            size="sm"
            outline
          >
            Образование Образование Образование
            <br />
            <Vignette name="wave" />
          </Typography>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et harum illum modi nam
          numquam porro quam tempora temporibus unde veritatis.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et harum illum modi nam
        </Buttress>
      </Paper>
      <CarouselContextProvider>
        <Pagination
          arrowNext={<Button><IconSvg name="arrow-left" /></Button>}
          arrowPrev={<Button><IconSvg name="arrow-right" /></Button>}
        />
        <Proportion separator="|" />
        <div style={{ width: 400, backgroundColor: '#ccc', position: 'relative' }}>

          <Carousel containerWidth={400}>
            {
              [
                'https://www.belanta.vet/vet-blog/wp-content/uploads/2020/01/1-13.jpg',
                'https://hsto.org/getpro/geektimes/post_images/672/881/5cd/6728815cd7397e71fec8dda79879e375.jpg',
                'https://www.belanta.vet/vet-blog/wp-content/uploads/2020/01/1-13.jpg',
                'https://hsto.org/getpro/geektimes/post_images/672/881/5cd/6728815cd7397e71fec8dda79879e375.jpg',
              ].map((item, i) => (
                <div key={i}>
                  <Link href={`#${i}`} color="dark">JJjhJH</Link>
                  <img
                    key={item}
                    src={item}
                    alt=""
                    height={300}
                    width={770}
                  />
                </div>
              ))
            }
          </Carousel>

        </div>
      </CarouselContextProvider>

      <Paper style={{ width: 400 }}>
        <Typography
          component="h2"
          size="lg"
          font="display2"
        >
          Образование Образование Образование
          <br />
          <Vignette name="line" />
        </Typography>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et harum illum modi nam
        numquam porro quam tempora temporibus unde veritatis.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et harum illum modi nam
      </Paper>
      <TextField
        label="Standard"
      />
      <ComboboxField
        name="Combobox2"
        label="Combobox2"
        options={options}
        value={state.options}
        inputValue={state.value}
        onChange={handleChangeSelect2}
        fullWidth
        multiple
      />
      {/* <ComboboxField
        name="Combobox"
        label="Combobox"
        options={options}
        value={valSel}
        onChange={handleChangeSelect}
        fullWidth
        isSearchable={false}
      /> */}
      <Button onClick={handleChange}><IconSvg name="arrow-left" /></Button>
      <Collapse in={checked}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et harum illum modi nam
        numquam porro quam tempora temporibus unde veritatis.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et harum illum modi nam
      </Collapse>

    </>
  )
}
export default App
