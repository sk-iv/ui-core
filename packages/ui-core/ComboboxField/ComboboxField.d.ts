import * as React from 'react'

export interface ComboboxFieldProps {
  // /**
  //  * The icon to display in place of the default clear icon.
  //  * @default <ClearIcon fontSize="small" />
  //  */
  // clearIcon?: React.ReactNode;
  /**
   * Заменяет дефолтный текст иконки крестик
   * @default 'Clear'
   */
  clearText?: string;
  /**
   * Заменяет дефолтный текст иконки шеврон
   * @default 'Close'
   */
  closeText?: string;
  /**
   * Заблокированное состояние
   * @default false
   */
  disabled?: boolean;
  // /**
  //  * If `true`, the `Popper` content will be under the DOM hierarchy of the parent component.
  //  * @default false
  //  */
  // disablePortal?: boolean;
  /**
   * Состояние ошибки
   * @default false
   */
  error?: boolean;
  // /**
  //  * Force the visibility display of the popup icon.
  //  * @default 'auto'
  //  */
  // forcePopupIcon?:  'auto' | true | false ;
  /**
   * На всю ширину родительского контейнера
   * @default false
   */
  fullWidth?: boolean;
  // /**
  //  * The label to display when the tags are truncated (`limitTags`).
  //  *
  //  * @param {number} more The number of truncated tags.
  //  * @returns {ReactNode}
  //  * @default (more) => `+${more}`
  //  */
  // getLimitTagsText?: (more: number) => React.ReactNode;
  // /**
  //  * The component used to render the listbox.
  //  * @default 'ul'
  //  */
  // ListboxComponent?: React.JSXElementConstructor<React.HTMLAttributes<HTMLElement>>;
  /**
   * Вспомогательный текст
   */
  helperText?: string;
  /**
   * Состояние загрузки
   * @default false
   */
  loading?: boolean;
  // /**
  //  * Text to display when in a loading state.
  //  *
  //  * For localization purposes, you can use the provided [translations](/guides/localization/).
  //  * @default 'Loading…'
  //  */
  // loadingText?: React.ReactNode;
  // /**
  //  * The maximum number of tags that will be visible when not focused.
  //  * Set `-1` to disable the limit.
  //  * @default -1
  //  */
  // limitTags?: number;
  // /**
  //  * Text to display when there are no options.
  //  *
  //  * For localization purposes, you can use the provided [translations](/guides/localization/).
  //  * @default 'No options'
  //  */
  // noOptionsText?: React.ReactNode;
  // /**
  //  * Override the default text for the *open popup* icon button.
  //  *
  //  * For localization purposes, you can use the provided [translations](/guides/localization/).
  //  * @default 'Open'
  //  */
  // openText?: string;
  // /**
  //  * The component used to render the body of the popup.
  //  * @default Paper
  //  */
  // PaperComponent?: React.JSXElementConstructor<React.HTMLAttributes<HTMLElement>>;
  /**
   * Поле обязательно для выбора
   * @default false
   */
   required?: boolean;
  // /**
  //  * The icon to display in place of the default popup icon.
  //  * @default <ArrowDropDownIcon />
  //  */
  // popupIcon?: React.ReactNode;
}

declare const ComboboxField: React.FunctionComponent<ComboboxFieldProps>

export default ComboboxField