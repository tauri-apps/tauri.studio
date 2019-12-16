import * as mermaid from 'mermaid'

export default ({ Vue, app }) => {
  Vue.prototype.$mermaid = mermaid
  app.mounted = function () {
    mermaid.initialize({
      startOnLoad: true,
      logLevel: 'debug',
      theme: 'neutral',
      securityLevel: 'loose',
      arrowMarkerAbsolute: true,
      flowchart: {
        useMaxWidth: true,
        htmlLabels: true,
        curve: 'basis'
      }
    })
  }
}

export { mermaid }
