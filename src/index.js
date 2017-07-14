let MasterPage = require('./components/master-page/index.js')['default']
let Page404 = require('./components/page-404/index.js')['default']
let TanrsFilter = require('./components/trans-filter/index.js')['default']
let SelectOption = require('./components/select-option/index.js')['default']

const components = [
  MasterPage,
  Page404,
  TanrsFilter,
  SelectOption
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
  MasterPage,
  Page404,
  TanrsFilter,
  SelectOption
}
