import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main-page',
      component: require('@/components/MainPage').default,
      children: [
        {
          path: '/spinsys',
          name: 'spinsys',
          component: require('@/components/WorkingArea/SpinsysPanel').default
        },
        {
          path: '/pulseseq',
          name: 'pulseseq',
          component: require('@/components/WorkingArea/PulseseqPanel').default
        },
        {
          path: '/settings',
          name: 'settings',
          component: require('@/components/WorkingArea/SettingsPanel').default
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
