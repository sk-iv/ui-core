import * as React from 'react'

export interface ButtressProps {
    position?: 'fixed' | 'absolute' | 'sticky' | 'static' | 'relative';
}

declare const Buttress: React.FunctionComponent<ButtressProps>

export default Buttress