## No Server?

If you want the highest degree of security, then you will never ship a server with your app if you don't have to. The `no-server` mode that you can configure in `tauri.conf.js` will do just that: Ship your app without a server. It requires a bit of extra effort on your part, in that you will need to modify your webpack config or chain and add an extra node module to your project dependencies.


### Installation and Setup
```bash
yarn add @tauri-apps/tauri-webpack
```


In your `tauri.conf.js`
```js
tauri: {
  embeddedServer: {
    active: false
  }
}
```

### webpack
If you are handcrafting your own webpack, you can do this:
`webpack.config.js`
```js
const mode = process.env.NODE_ENV || 'development'
const devMode = mode !== 'production'
const tauriMode = !!process.env.TAURI

const webpackConfig = {
    entry: {
        bundle: ['./src-ui/index.js']
    },
    ... CONFIG HERE
}

if (tauriMode) {
    const merge = require('webpack-merge')
    const tauriWebpackConfig = require('@tauri-apps/tauri-webpack').config()
    module.exports = merge(webpackConfig, tauriWebpackConfig)
}
else {
    module.exports = webpackConfig
}
```

And then in the `scripts` of your package.json:
```
"dev": "webpack-dev-server --content-base .build/ --port 3000 --host 0.0.0.0",
"build": "cross-env NODE_ENV=production webpack",
"build:tauri": "TAURI=1 npm run build",
"dev:tauri": "TAURI=1 npm run dev",
```

The webpack plugin

### webpack chain
```js
chainWebpack (chain) {
  require('@tauri-apps/tauri-webpack').chain(chain)
}
```
