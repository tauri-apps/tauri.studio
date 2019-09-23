import * as mermaid from 'mermaid'

mermaid.initialize({
  startOnLoad: true,
  logLevel: 'debug',
  theme: 'neutral',
  fontFamily: '"Roboto"',
  securityLevel: 'loose',
  flowchart: {
    useMaxWidth: true,
    htmlLabels: true,
    curve: 'basis'
  }
})

export default ({ Vue }) => {
  Vue.prototype.$mermaid = mermaid
}

export { mermaid }
