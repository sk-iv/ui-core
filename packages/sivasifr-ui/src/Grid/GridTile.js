import styled from 'styled-components';

const GridTile = styled.div.withConfig({
  shouldForwardProp: (prop) => !['size', 'offset', 'justify', 'align'].includes(prop),
})`
display: flex;
flex-wrap: wrap;
${({
    size,
    offset,
    justify = 'start',
    align = 'start',
  }) => `
grid-column-start: ${offset ? `col-start ${offset}` : 'col-start 1'};
grid-column-end: ${size ? `span ${size}` : 'span 12'};
grid-row-start: auto;
grid-row-end: auto;
justify-content: ${justify}; 
align-items: ${align};
`}`;
export default GridTile;
