// import PropTypes from 'prop-types'
// import React from 'react'
// import clsx from 'clsx'
// import styles from './SvgIcon.module.css'
//
// function SvgIcon(props) {
//   const {
//     children, className, titleAccess, viewBox, ...other
//   } = props
//
//   return (
//     <svg
//       aria-hidden={titleAccess ? 'false' : 'true'}
//       className={clsx(styles.icon, className)}
//       focusable="false"
//       viewBox={viewBox}
//       {...other}
//     >
//       {
//         titleAccess ? (
//           <title>
//             {titleAccess}
//           </title>
//         ) : null
//       }
//       {children}
//     </svg>
//   )
// }
//
// SvgIcon.defaultProps = {
//   viewBox: '0 0 24 24',
// }
//
// SvgIcon.muiName = 'SvgIcon'
// SvgIcon.propTypes = {
//
//   /**
//      * Elements passed into the SVG Icon.
//      */
//   children: PropTypes.node,
//
//   /**
//      * @ignore
//      */
//   className: PropTypes.string,
//
//   /**
//      * Provides a human-readable title for the element that contains it.
//      * https://www.w3.org/TR/SVG-access/#Equivalent
//      */
//   titleAccess: PropTypes.string,
//
//   /**
//      * Allows you to redefine what the coordinates without units mean inside an svg element.
//      * For example, if the SVG element is 500 (width) by 200 (height),
//      * and you pass viewBox="0 0 50 20",
//      * this means that the coordinates inside the svg will go from the top left corner (0,0)
//      * to bottom right (50,20) and each unit will be worth 10px.
//      */
//   viewBox: PropTypes.string,
// }
// export default SvgIcon
