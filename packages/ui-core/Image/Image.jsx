import React from 'react'
import clsx from 'clsx'
import st from './Image.mdl.css'

const Image = ({
  alt,
  srcset,
  sizes,
  isBackground,
}) => {
  const src = srcset ? srcset.split(',')[0] : ''
  return (
    <picture>
      <source srcset={srcset} sizes={sizes} />
      <img
        className={clsx(st.root, {
          [st.absolute]: isBackground,
        })}
        src={src}
        alt={alt}
      />
    </picture>
  )
}
export default Image
