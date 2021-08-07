import * as React from 'react'

export interface ChipProps {
    className?: string;
    /**
     * Если `true`, чип будет кликабельным
     * @default false
     */
    clickable?: boolean;
    color?: 'default' | 'primary' | 'secondary' | 'accent';
    /**
     * Заблокированное состояние
     * @default false
     */
    disabled?: boolean;
    /**
     * Высота чипа
     * @default 'sm'
     */
    size?: 'sm' | 'md';
}

declare const Chip: React.FunctionComponent<ChipProps>

export default Chip