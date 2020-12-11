import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/layout/index.vue'
import Login from '@/pages/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
    	path: '/',
    	name: 'app',
    	redirect: '/login',
    	component: Layout,
    	children: [
    		{
    			path: '/home',
		    	name: 'home',
		    	component: () => import('@/pages/home/index.vue'),
		    	redirect: '/home/panel',
		    	children: [
		    		{
		    			path: 'panel',
		    			component: () => import('@/pages/home/panel/index.vue')
		    		}
		    	]
    		}
    	]
    }
  ]
})
