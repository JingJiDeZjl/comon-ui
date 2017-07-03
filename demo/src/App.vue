<template>
  <div id="app">
    <CUMasterPage :config="config">
      <router-view></router-view>
    </CUMasterPage>
  </div>
</template>

<script>
  import {getSiteConfig} from './config/site'
  export default {
    name: 'app',
    data(){
      return {
        config: getSiteConfig()
      }
    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
