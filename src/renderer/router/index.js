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
          path: '',
          name: 'working-area',
          component: require('@/components/WorkingArea').default,
          children: [
            {
              path: '/panels/spinsys',
              name: 'spinsys',
              component: require('@/components/WorkingArea/SpinsysPanel').default
            },
            {
              path: '/panels/pulseseq',
              name: 'pulseseq',
              component: require('@/components/WorkingArea/PulseseqPanel').default
            },
            {
              path: '/panels/settings',
              name: 'settings',
              component: require('@/components/WorkingArea/SettingsPanel').default
            },
            {
              path: '*',
              redirect: '/panels/spinsys'
            }
          ]
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
