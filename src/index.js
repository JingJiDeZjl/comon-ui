let MasterPage = require('./components/master-page/index.js')['default']

const components = [
  MasterPage
]

const install = function(Vue, opts = {}) {
  /* istanbul ignore if */
  if (install.installed) return;
  components.map(component => {
    Vue.component(component.name, component);
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

module.exports = {
  version: '1.0.0',
  install,
  MasterPage
}
