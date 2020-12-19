import styled from 'styled-components'

const Grid = styled.div.withConfig({
  shouldForwardProp: (prop) => !['direction', 'paper'].includes(prop),
})`
  display: grid;
  grid-auto-flow: dense;
  width: 100%;
  grid-template-rows: min-content;
  ${() => `
    grid-template-columns:repeat(12, [col-start] 1fr)
  `}
  `
export default Grid
