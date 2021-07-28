import * as React from 'react'

export interface LinkProps {
  /**
  * Определяет, когда ссылка должна быть подчеркнута
  * @default 'always'
  */ 
  underline?: 'always' | 'none' | 'hover';
  /**
   * Стиль подчеркивания
   * @default 'solid'
   */
   variant?: 'solid' | 'dashed';
}

export default function Link(props: LinkProps): JSX.Element;