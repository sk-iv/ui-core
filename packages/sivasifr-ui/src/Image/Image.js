import styled from 'styled-components'

const Image = styled.div`
  overflow: auto;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
  ${({url, blur}) => `
    &::after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      z-index: 0;
    
      display: block;
      background-image: url(${url});
      background-size:cover;
      background-position: center;
      width: 100%;
      height: 100%;
    
      -webkit-filter: blur(${blur}px);
      -moz-filter: blur(${blur}px);
      -o-filter: blur(${blur}px);
      -ms-filter: blur(${blur}px);
      filter: blur(${blur}px);
    }
  `}
  `
export default Image
