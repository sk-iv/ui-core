// import PropTypes from 'prop-types';
// import React from 'react';
// import clsx from 'clsx';
// // Import { capitalizeFirstLetter } from '../utils/helpers';
// if (process.env.WEBPACK) {
//   require('./icon.css');
// }
//
//
// function Icon(props) {
//   const {
//     children, className: classNameProp, color, ...other
//   } = props;
//
//   const className = clsx(
//     'icon',
//     'icon--size24',
//     classNameProp,
//   );
//
//   return (
//     <span
//       aria-hidden="true"
//       className={className}
//       {...other}
//     >
//       <glyphs viewBox="0 0 24 24">
//         {children}
//       </glyphs>
//     </span>
//   );
// }
//
// Icon.defaultProps = {
//   color: 'inherit',
// };
//
// Icon.muiName = 'Icon';
//
// Icon.propTypes = {
//
//   /**
//      * The name of the icon font ligature.
//      */
//   children: PropTypes.node,
//
//   /**
//      * @ignore
//      */
//   className: PropTypes.string,
//
//   /**
//      * The color of the component. It's using the theme palette when that makes sense.
//      */
//   color: PropTypes.oneOf([
//     'inherit',
//     'accent',
//     'action',
//     'contrast',
//     'disabled',
//     'error',
//     'primary',
//   ]),
// };
//
// export default Icon;
