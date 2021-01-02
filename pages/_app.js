import * as React from 'react'
import { Pagination, Proportion } from '@sivasifr/ui-carousel/Pagination'
import { Button } from '@sivasifr/ui-core/Button'
import { Carousel, CarouselContextProvider } from '@sivasifr/ui-carousel/Carousel'
import { AppBar } from '@sivasifr/ui-core/AppBar'
import { List, ListItem } from '@sivasifr/ui-core/List'
import { IconSvg } from '@sivasifr/icons/IconSvg'
import { Buttress } from '@sivasifr/ui-core/Buttress'
import { Drawer } from '@sivasifr/ui-core/Drawer'
import { Typography, Vignette } from '@sivasifr/ui-core/Typography'
import { Paper } from '@sivasifr/ui-core/Paper'
import Link from '@sivasifr/ui-core/Link'

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
    </>
  )
}
export default App
