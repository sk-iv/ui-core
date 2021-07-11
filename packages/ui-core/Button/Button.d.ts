import * as React from 'react'

export interface ButtonProps {
    /**
     * Цвет кнопки
     * @default 'primary'
     */
    color?: 'default' | 'primary' | 'secondary' | 'accent';
    /**
     * Заблокированное состояние
     * @default false
     */
    disabled?: boolean;
    // /**
    //  * If `true`, no elevation is used.
    //  * @default false
    //  */
    // disableElevation?: boolean;
    /**
     * убрать пульсацию фокуса
     * @default false
     */
    disableFocusRipple?: boolean;
    // /**
    //  * Element placed after the children.
    //  */
    // endIcon?: React.ReactNode;
    /**
     * На всю длину родительского контейнера
     * @default false
     */
    fullWidth?: boolean;
    /**
     * URL в ситуации, когда кнопка должна быть ссылкой
     */
    href?: string;
    /**
     * Высота кнопки
     * @default 'md'
     */
    size?: 'md' | 'sm' | 'lg';
    // /**
    //  * Element placed before the children.
    //  */
    // startIcon?: React.ReactNode;
    /**
     * Призрачная или обычная кнопка
     * @default 'contained'
     */
    variant?: 'contained' | 'outlined';
}

declare const Button: React.FunctionComponent<ButtonProps>

export default Button