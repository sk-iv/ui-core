import * as React from 'react'

export interface DrawerProps {
  /**
   * Сторона, с которой будет выдвигаться панель
   * @default 'left'
   */
  anchor?: 'left' | 'top' | 'right' | 'bottom';
  // /**
  //  * The content of the component.
  //  */
  // children?: React.ReactNode;
  /**
   * The elevation of the drawer.
   * @default 16
   */
  elevation?: number;
  // /**
  //  * Props applied to the [`Modal`](/api/modal/) element.
  //  * @default {}
  //  */
  // ModalProps?: Partial<ModalProps>;
  // /**
  //  * Callback fired when the component requests to be closed.
  //  *
  //  * @param {object} event The event source of the callback.
  //  */
  // onClose?: ModalProps['onClose'];
  /**
   * If `true`, the component is shown.
   * @default false
   */
  open?: boolean;
  /**
   * Props applied to the [`Paper`](/api/paper/) element.
   * @default {}
   */
  // PaperProps?: Partial<PaperProps>;
  // /**
  //  * Props applied to the [`Slide`](/api/slide/) element.
  //  */
  // SlideProps?: Partial<SlideProps>;
  // /**
  //  * The duration for the transition, in milliseconds.
  //  * You may specify a single timeout for all transitions, or individually with an object.
  //  * @default { enter: duration.enteringScreen, exit: duration.leavingScreen }
  //  */
  // transitionDuration?: TransitionProps['timeout'];
  /**
   * The variant to use.
   * @default 'temporary'
   */
  variant?: 'temporary' | 'permanent' | 'persistent';
}

export default function Drawer(props: DrawerProps): JSX.Element;