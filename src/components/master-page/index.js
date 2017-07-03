import MasterPage from './src/main.vue';

MasterPage.install = function(Vue) {
  Vue.component(MasterPage.name, MasterPage);
};

export default MasterPage;
