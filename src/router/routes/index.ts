import type { RouteRecordRaw } from 'vue-router'

/**
 * 路由配置
 * @description 所有路由都在这里集中管理
 */
const routes: RouteRecordRaw[] = [
    /**
   * 首页
   */
  {
    path: '/index.html',
    name: 'index',
    component: () => import('@/views/home.vue'),
    meta: {
      title: '测试app',
    },
  },
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home.vue'),
    meta: {
      title: '测试app',
    },
  },
  {
    path: '/log',
    name: 'log',
    component: () => import('@/components/RequestList.vue'),
    meta: {
      title: '接收的消息',
    },
  },
  {
    path: '/pubsub',
    name: 'pubsub',
    component: () => import('@/views/pubsub.vue'),
    meta: {
      title: '发布订阅',
    },
  },
]

export default routes
