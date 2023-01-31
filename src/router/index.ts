import type { App } from 'vue'
import { setupRouterGuard } from './guard'
import { createRouter, createWebHistory } from 'vue-router'
import type { RoutesType } from '~/types/router'


const basicRouters: RoutesType =[
  {
    name:'Home',
    path:'/',
    component:() => import('@/views/home/index.vue')
  },
  {
    name:'About',
    path:'/about',
    component:() => import('@/views/about/index.vue'),
    meta:{
      title:'关于我'
    }
  },
  // 无匹配路由跳转 404
  {
    name: 'NotFound',
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    isHidden: true,
  },
]

const router = createRouter({
  history:createWebHistory('/'),
  routes:basicRouters,
  scrollBehavior:()=> ({left:0,top:0})
})

export function setupRouter(app:App){
  setupRouterGuard(router)
  app.use(router)
} 