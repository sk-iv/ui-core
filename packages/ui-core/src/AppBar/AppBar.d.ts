import * as React from 'react'

export interface AppBarProps {
    position?: 'fixed' | 'absolute' | 'sticky' | 'static' | 'relative';
}

declare const AppBar: React.FunctionComponent<AppBarProps>

export default AppBar