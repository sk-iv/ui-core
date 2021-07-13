import * as React from 'react'

export interface ButtonProps {
    className?: string;
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
    /**
     * убрать пульсацию фокуса
     * @default false
     */
    disableFocusRipple?: boolean;
    // /**
    //  * Элемент после children
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
     * Состояние загрузки
     * @default 'md'
     */
    loading?: boolean;
    /**
     * Высота кнопки
     * @default 'md'
     */
    size?: 'md' | 'sm' | 'lg';
    // /**
    //  * Элемент до children
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