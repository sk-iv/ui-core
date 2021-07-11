import * as React from 'react'

export interface IconSvgProps {
  /**
  * Идентификатор
  */
  name: string;
  /**
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  /**
  * a11y: скрыть от скринридера в ситуации если рядом есть лейбл
  * @default true
  */
  ariaHidden?: boolean;
  /**
  * a11y: ссылка на id элемента-лейбла
  */
  ariaLabelledby?: string;
  /**
  * svg элемент по умолчанию может иметь состояние фокуса,
  * атрибут отключает эту способность у элемента
  * @default false
  */
  focusable?: boolean;
  /**
   * @default false
   */
  isFilled?: boolean;
}

declare const IconSvg: React.FunctionComponent<IconSvgProps>

export default IconSvg
