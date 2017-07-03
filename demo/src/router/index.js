import Vue from 'vue'
import Router from 'vue-router'
import Page1 from '@/components/pages/Page1'
import Page2 from '@/components/pages/Page2'
import Page3 from '@/components/pages/Page3'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Page1',
      component: Page1
    },
    {
      path: '/page2',
      name: 'Page2',
      component: Page2
    },
    {
      path: '/page3',
      name: 'Page3',
      component: Page3
    }
  ]
})
