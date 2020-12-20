import * as React from 'react'
import { Pagination } from '@sivasifr/ui-carousel/Pagination'
import { Button } from '@sivasifr/ui-core/Button'
import { Carousel, CarouselContextProvider } from '@sivasifr/ui-carousel/Carousel'
import { AppBar } from '@sivasifr/ui-core/AppBar'
import { List, ListItem } from '@sivasifr/ui-core/List'
import { IconSvg } from '@sivasifr/icons/IconSvg'
import { Buttress } from '@sivasifr/ui-core/Buttress'
import { Drawer } from '@sivasifr/ui-core/Drawer'

const menu = [
  'Образование',
  'Просвещение',
]

const App = () => {
  const [open, setOpen] = React.useState(false)
  const handler = (e) => {
    console.log('e', e)
    setOpen(true)
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
      <CarouselContextProvider>
        <Pagination
          arrowNext={<Button>Next</Button>}
          arrowPrev={<Button>Prev</Button>}
        />
        <div style={{ width: 400, backgroundColor: '#ccc' }}>
          <Buttress size={80}>
            <Carousel containerWidth={400}>
              {
                [
                  'https://www.belanta.vet/vet-blog/wp-content/uploads/2020/01/1-13.jpg',
                  'https://hsto.org/getpro/geektimes/post_images/672/881/5cd/6728815cd7397e71fec8dda79879e375.jpg',
                ].map((item) => (
                  <img
                    key={item}
                    src={item}
                    alt=""
                    height={300}
                    width={770}
                  />
                ))
              }
            </Carousel>
          </Buttress>
        </div>
      </CarouselContextProvider>
    </>
  )
}
export default App
