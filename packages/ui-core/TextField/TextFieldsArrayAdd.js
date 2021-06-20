// import React from 'react';
// import Input, { InputAdornment, InputLabel } from '../Input';
//
// import Checkbox from '../Checkbox';
// import IconButton from '../IconButton';
// import IconSvg from '../SvgIcon';
// import TextField from './TextField';
//
// const TextFieldsArrayAdd = (props) => {
//   // state = {
//   //     "itemAddAttribute": ""
//   // };
//
//
//   const handleClickAddAttribute = () => {
//     this.props.onChange(this.props.items.concat({ id: Math.random().toString(36).substr(2, 9), [this.props.keyName]: '' }));
//   };
//
//   const handleClickRemoveAttribute = (value) => (e) => {
//     const i = this.props.items.indexOf(value);
//     this.props.onChange(this.props.items.splice(i, 1));
//   };
//
//   const onChange = (id) => (e) => {
//     const arr = this.props.items.map((item, i) => (item.id == id ? { id: item.id, [this.props.keyName]: e.target.value } : item));
//
//     this.props.onChange(arr);
//   };
//
//
//   // const onCheck = (id) => {
//   //   if(this.props.checked.some(elem => elem.id==id)){
//   //     this.props.onCheck(this.props.checked.filter(item => item.id !== id));
//   //   }else{
//   //     this.props.onCheck(this.props.checked.concat({id}));
//   //   }
//   //
//   // }
//
//
//   const {
//     items,
//     onCheck,
//     checked,
//     keyName,
//   } = props;
//
//   return (
//     <>
//       {items.length && (
//       <>
//         items.map((value, index) =>
//         <div key={index} className="d-flex" style={{ alignContent: 'center' }}>
//           {
//                     Boolean(onCheck)
//                       && (
//                       <Checkbox
//                         className="mr-2"
//                         checked={checked.some((elem) => elem.id == value.id)}
//                         onChange={(e) => { this.onCheck(value.id); }}
//                       />
//                       )
//                   }
//
//           <TextField
//     endAdornment={(
//                   <InputAdornment position="end">
//         <IconButton
//           onClick={this.handleClickRemoveAttribute(value.id)}
//         >
//           <IconSvg name="times" />
//         </IconButton>
//       </InputAdornment>
//                       )}
//     label="Признак"
//     margin="normal"
//     name="itemAddAttribute"
//     onChange={this.onChange(value.id)}
//     onDebounce={(e) => this.onDebounce()}
//     type="text"
//     value={value[keyName]}
//   />
//         </div>
//         )
//       </>
//       )}
//       <div className="d-flex" style={{ alignContent: 'center' }}>
//         {
//                 Boolean(onCheck)
//                   && <Checkbox checked={false} className="mr-2" />
//               }
//         <TextField
//           disabled
//           InputProps={{
//             endAdornment: <InputAdornment position="end">
//               <IconButton
//                 color="primary"
//                 onClick={(e) => this.handleClickAddAttribute()}
//               >
//                 <IconSvg name="plus" />
//               </IconButton>
//                           </InputAdornment>,
//           }}
//           label="Признак"
//           margin="normal"
//           type="text"
//         />
//       </div>
//     </>
//   );
// };
// TextFieldsArrayAdd.defaultProps = {
//   items: [],
//   keyName: 'txt',
// };
// export default TextFieldsArrayAdd;
