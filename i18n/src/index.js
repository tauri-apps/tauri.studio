const extendQuasarConf = function (conf) {
  // make sure boot file is registered
  conf.boot.push('~@nuyu/quasar-app-extension-i18n/src/boot/i18n.js')

  // make sure boot & component files transpile
  conf.build.transpileDependencies.push(/quasar-app-extension-i18n[\\/]src/)

  // conf.framework.components.push(['QMenu', 'QList'])
}

module.exports = function (api) {
  // extend quasar.conf
  api.extendQuasarConf(extendQuasarConf)
}
