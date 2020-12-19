import * as React from 'react'
import {Pagination} from "@sivasifr/ui-carousel/Pagination"
import {Button} from "@sivasifr/ui-core/Button"
import {Carousel, CarouselContextProvider} from "@sivasifr/ui-carousel/Carousel"

const App = () => (
  <>
    <CarouselContextProvider>
      <Pagination
        arrowNext={<Button>Next</Button>}
        arrowPrev={<Button>Prev</Button>}
      />
      <div style={{width: 400, height: 300, backgroundColor: '#ccc'}}>
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
      </div>
    </CarouselContextProvider>
  </>
)
export default App
