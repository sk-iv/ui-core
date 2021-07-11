import * as React from 'react'

export interface ComboboxFieldProps {
  // /**
  //  * The icon to display in place of the default clear icon.
  //  * @default <ClearIcon fontSize="small" />
  //  */
  // clearIcon?: React.ReactNode;
  /**
   * Override the default text for the *clear* icon button.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   * @default 'Clear'
   */
  clearText?: string;
  /**
   * Override the default text for the *close popup* icon button.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   * @default 'Close'
   */
  closeText?: string;
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * If `true`, the `Popper` content will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal?: boolean;
  /**
   * Force the visibility display of the popup icon.
   * @default 'auto'
   */
  forcePopupIcon?: true | false | 'auto';
  /**
   * If `true`, the input will take up the full width of its container.
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
   * If `true`, the component is in a loading state.
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
  /**
   * The maximum number of tags that will be visible when not focused.
   * Set `-1` to disable the limit.
   * @default -1
   */
  limitTags?: number;
  // /**
  //  * Text to display when there are no options.
  //  *
  //  * For localization purposes, you can use the provided [translations](/guides/localization/).
  //  * @default 'No options'
  //  */
  // noOptionsText?: React.ReactNode;
  /**
   * Override the default text for the *open popup* icon button.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   * @default 'Open'
   */
  openText?: string;
  // /**
  //  * The component used to render the body of the popup.
  //  * @default Paper
  //  */
  // PaperComponent?: React.JSXElementConstructor<React.HTMLAttributes<HTMLElement>>;

  // /**
  //  * The icon to display in place of the default popup icon.
  //  * @default <ArrowDropDownIcon />
  //  */
  // popupIcon?: React.ReactNode;
}

declare const ComboboxField: React.FunctionComponent<ComboboxFieldProps>

export default ComboboxField