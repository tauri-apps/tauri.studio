import * as mermaid from 'mermaid'

mermaid.initialize({
  startOnLoad: true,
  logLevel: 'debug',
  theme: 'neutral',
  fontFamily: '"Roboto"',
  flowchart: {
  }
})

export default ({ Vue }) => {
  Vue.prototype.$mermaid = mermaid
}

export { mermaid }
