import * as React from 'react'

export interface ButtonProps {
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     * @default 'primary'
     */
    color?: 'default' | 'primary' | 'secondary' | 'accent';
    /**
     * If `true`, the button is disabled.
     * @default false
     */
    disabled?: boolean;
    /**
     * If `true`, no elevation is used.
     * @default false
     */
    disableElevation?: boolean;
    /**
     * If `true`, the  keyboard focus ripple is disabled.
     * @default false
     */
    disableFocusRipple?: boolean;
    /**
     * Element placed after the children.
     */
    endIcon?: React.ReactNode;
    /**
     * If `true`, the button will take up the full width of its container.
     * @default false
     */
    fullWidth?: boolean;
    /**
     * The URL to link to when the button is clicked.
     * If defined, an `a` element will be used as the root node.
     */
    href?: string;
    /**
     * The size of the button.
     * `small` is equivalent to the dense button styling.
     * @default 'medium'
     */
    size?: 'small' | 'medium' | 'large';
    /**
     * Element placed before the children.
     */
    startIcon?: React.ReactNode;
}

declare const Button: React.FunctionComponent<ButtonProps>

export default Button