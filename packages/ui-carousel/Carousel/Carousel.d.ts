import * as React from 'react'

export interface CarouselProps {
    /**
     * Width container component.
     */
    containerWidth: number;
}

declare const Carousel: React.FunctionComponent<CarouselProps>

export default Carousel