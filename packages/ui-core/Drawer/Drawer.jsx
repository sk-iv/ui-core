import PropTypes from 'prop-types'
import React from 'react'
import clsx from 'clsx'
import Modal from '../Modal'
import Paper from '../Paper'
import { Slide } from '../Transition'
import Backdrop from '../Modal/Backdrop'
import styles from './Drawer.mdl.css'

const oppositeDirection = {
  left: 'right',
  right: 'left',
  top: 'down',
  bottom: 'up',
}

export function isHorizontal(props) {
  return [
    'left',
    'right',
  ].indexOf(props.anchor) !== -1
}

export function getAnchor(props) {
  return 'rtl' === 'rtl' && isHorizontal(props)
    ? oppositeDirection[props.anchor]
    : props.anchor
}

/**
 * The properties of the [Modal](/api/modal/) component are available
 * when `variant="temporary"` is set.
 */
const defaultTransitionDuration = { enter: 300, exit: 100 }
/**
 * The props of the [Modal](/api/modal/) component are available
 * when `variant="temporary"` is set.
 */
const Drawer = React.forwardRef((props, ref) => {
  const {
    anchor: anchorProp = 'left',
    BackdropProps,
    children,
    className,
    elevation = 16,
    ModalProps: { BackdropProps: BackdropPropsProp, ...ModalProps } = {},
    onClose,
    open = false,
    PaperProps,
    SlideProps,
    transitionDuration = defaultTransitionDuration,
    variant = 'temporary',
    ...other
  } = props

  // Let's assume that the Drawer will always be rendered on user space.
  // We use this state is order to skip the appear transition during the
  // initial mount of the component.
  const mounted = React.useRef(false)
  React.useEffect(() => {
    mounted.current = true
  }, [])

  const anchor = anchorProp

  const drawer = (
    <Paper
      elevation={variant === 'temporary' ? elevation : 0}
      className={clsx(
        styles.paper,
        styles[`paperAnchor-${anchor}`],
        {
          [styles[`paperAnchorDocked-${anchor}`]]: variant !== 'temporary',
        },
      )}
      {...PaperProps}
    >
      {children}
    </Paper>
  )

  if (variant === 'permanent') {
    return (
      <div
        className={clsx(
          styles.drawer, styles.drawerDocked, className,
        )}
        ref={ref}
        {...other}
      >
        {drawer}
      </div>
    )
  }

  const slidingDrawer = (
    <Slide
      in={open}
      direction={oppositeDirection[anchor]}
      timeout={transitionDuration}
      appear={mounted.current}
      {...SlideProps}
    >
      {drawer}
    </Slide>
  )

  if (variant === 'persistent') {
    return (
      <div
        className={clsx(
          styles.drawer, styles.drawerDocked, className,
        )}
        ref={ref}
        {...other}
      >
        {slidingDrawer}
      </div>
    )
  }

  // variant === temporary
  return (
    <Modal
      BackdropProps={{
        ...BackdropProps,
        ...BackdropPropsProp,
        transitionDuration,
      }}
      BackdropComponent={Backdrop}
      className={clsx(
        styles.drawer,
        styles.drawerModal,
        styles[anchor],
        className,
      )}
      open={open}
      onClose={onClose}
      ref={ref}
      {...other}
      {...ModalProps}
    >
      {slidingDrawer}
    </Modal>
  )
})

Drawer.propTypes = {
  /**
   * Side from which the drawer will appear.
   */
  anchor: PropTypes.oneOf(['left', 'top', 'right', 'bottom']),
  /**
   * @ignore
   */
  BackdropProps: PropTypes.object,
  /**
   * The contents of the drawer.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The elevation of the drawer.
   */
  elevation: PropTypes.number,
  /**
   * Props applied to the [`Modal`](/api/modal/) element.
   */
  ModalProps: PropTypes.object,
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback.
   */
  onClose: PropTypes.func,
  /**
   * If `true`, the drawer is open.
   */
  open: PropTypes.bool,
  /**
   * Props applied to the [`Paper`](/api/paper/) element.
   */
  PaperProps: PropTypes.object,
  /**
   * Props applied to the [`Slide`](/api/slide/) element.
   */
  SlideProps: PropTypes.object,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  transitionDuration: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({ enter: PropTypes.number, exit: PropTypes.number }),
  ]),
  /**
   * The variant to use.
   */
  variant: PropTypes.oneOf(['permanent', 'persistent', 'temporary']),
}

export default Drawer
