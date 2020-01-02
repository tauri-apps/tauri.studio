## src-tauri/tauri.conf.json

```
const path = require('path')
const distDir = path.resolve(__dirname, './dist/spa')

module.exports = function () {
  return {
    build: {
      distDir: distDir,
      devPath: 'http://localhost:7334' // devServer URL or path to folder where index.html is found
    },
    ctx: {
      prod: false,          // readonly
      dev: false,           // readonly
      debug: false          // readonly
    },
    tauri: {
      embeddedServer: {
        active: false
      },
      bundle: {
        active: true
      },
      whitelist: {
        all: true
      },
      window: {
        title: 'Tauri App',
        width: 800,
        height: 600,
        resizable: true
      },
      security: {
        csp: 'default-src data: filesystem: ws: http: https: \'unsafe-eval\' \'unsafe-inline\''
      },
      edge: {
        active: true
      }
    }
  }
}
```