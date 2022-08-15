import { createRouter, createWebHistory } from 'vue-router'
import layout from '@/views/layout/index.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      component: () => import('@/views/login/index.vue'),
      name: '登录'
    }
  ]
})

export const asyncRoutes = [
  {
    path: '/',
    component: layout,
    redirect: '/home',
    meta: {
      roles: [0, 1]
    },
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          roles: [0, 1]
        }
      }
    ]
  },
  {
    path: '/business',
    component: layout,
    redirect: '/business/org_manage_list',
    meta: {
      roles: [0, 1],
      title: '党务'
    },
    children: [
      {
        path: 'org_manage_list',
        name: 'org_manage_list',
        component: () => import('@/views/business/orgManage/orgList/index.vue'),
        meta: {
          roles: [0, 1],
          title: '党组织列表'
        }
      },
      {
        path: 'org_manage_tree',
        name: 'org_manage_tree',
        component: () => import('@/views/business/orgManage/orgTree/index.vue'),
        meta: {
          roles: [0, 1]
        }
      },
      {
        path: 'org_manage_detail',
        name: 'org_manage_detail',
        component: () => import('@/views/business/orgManage/orgDetails/index.vue'),
        meta: {
          roles: [0, 1],
          title: '请填写党组织资料'
        }
      }
    ]
  }
]

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
