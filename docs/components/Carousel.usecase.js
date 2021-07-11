import React from 'react'
import { Carousel, CarouselContextProvider } from '@sivasifr/ui-carousel/Carousel'
import Pagination, { Proportion } from '@sivasifr/ui-carousel/Pagination'
import { Button } from '@sivasifr/ui-core/Button'
import IconSvg from '@sivasifr/icons/IconSvg'
import Link from '@sivasifr/ui-core/Link'

export default () => (
  <CarouselContextProvider>
    <Pagination
      arrowNext={<Button><IconSvg name="arrowLeft" /></Button>}
      arrowPrev={<Button><IconSvg name="arrowRight" /></Button>}
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
)
