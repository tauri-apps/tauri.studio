import mermaid from 'mermaid'

mermaid.initialize({
  startOnLoad: true,
  theme: 'neutral',
  fontFamily: 'Roboto'
})

export default ({ Vue }) => {
  Vue.prototype.$mermaid = mermaid
}

export { mermaid }
