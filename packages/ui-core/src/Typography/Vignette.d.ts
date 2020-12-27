import * as React from 'react'

export interface VignetteProps {
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     * @default 'primary'
     */
    name: string;
    className?: string;
    strokeWidth?: number;
}

declare const Vignette: React.FunctionComponent<VignetteProps>

export default Vignette