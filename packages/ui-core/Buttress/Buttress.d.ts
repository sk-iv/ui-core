import * as React from 'react'

export interface ButtressProps {
    children: React.ReactNode,
    aspectRatio?: number;
    className?: string;
    background?: string;
    overflowHidden?: boolean;
}

declare const Buttress: React.FunctionComponent<ButtressProps>

export default Buttress