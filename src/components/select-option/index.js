import SelectOption from './src/main.vue';

SelectOption.install = function(Vue) {
  Vue.component(SelectOption.name, SelectOption);
};

export default SelectOption;
