## No Server?

If you want the highest degree of security, then you will never ship a server with your app if you don't have to. The `no-server` mode that you can configure in `tauri.conf.js` will do just that: Ship your app without a server. It requires a bit of extra effort on your part, in that you will need to modify your webpack config or chain and add an extra node module to your project dependencies.


### Installation and Setup
```bash
yarn add @tauri-apps/tauri-webpack
```

In your webpack config:
```js
chainWebpack (chain) {
  require('@tauri-apps/tauri-webpack').chain(chain)
}
```

In your `tauri.conf.js`
```js
tauri: {
  embeddedServer: {
    active: false
  }
}
```

### Multimode
If you are using Tauri for just one of your targets, you may want to avoid using the tauri webpack config if you aren't shipping to Tauri. Here is a nice little trick to do that:

```js
if (tauriMode) {
    const merge = require('webpack-merge')
    const tauriWebpackConfig = require('@tauri-apps/tauri-webpack').config()
    module.exports = merge(webpackConfig, tauriWebpackConfig)
}
else {
    module.exports = webpackConfig
}
```
