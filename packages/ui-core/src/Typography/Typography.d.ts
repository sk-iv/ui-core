import * as React from 'react'

export interface TypographyProps {
    /**
     * Set the text-align on the component.
     * @default 'inherit'
     */
    align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
    /**
     * The content of the component.
     */
    children?: React.ReactNode;
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     * @default 'initial'
     */
    color?:
        | 'initial'
        | 'inherit'
        | 'muted'
        | 'light'
        | 'dark'
        | 'error';
    component?:
        | 'span'
        | 'h1'
        | 'h2'
        | 'h3'
        | 'h4'
        | 'h5'
        | 'h6'
        | 'p'
        | 'div';
    /**
     * Controls the display type
     * @default 'initial'
     */
    display?: 'initial' | 'block' | 'inline';
    /**
     * If `true`, the text will have a bottom margin.
     * @default false
     */
    gutterBottom?: boolean;
    /**
     * If `true`, the text will not wrap, but instead will truncate with a text overflow ellipsis.
     *
     * Note that text overflow can only happen with block or inline-block level elements
     * (the element needs to have a width in order to overflow).
     * @default false
     */
    noWrap?: boolean;
    /**
     * If `true`, the text will have a bottom margin.
     * @default false
     */
    paragraph?: boolean;
    /**
     * Applies the theme typography styles.
     * @default 'body1'
     */
    size?:
        | 'sm'
        | 'base'
        | 'md'
        | 'xmd'
        | 'xxm'
        | 'lg'
        | 'xl'
        | 'xxl'
        | 'hg'
        | 'xhg'
        | 'xxh'
        | 'gn'
        | 'xgn'
        | 'xxg';
    font?:
        | 'body'
        | 'display'
        | 'accent';

}

declare const Typography: React.FunctionComponent<TypographyProps>

export default Typography