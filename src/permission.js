// import { ElMessage } from 'element-plus'
import NProgress from 'nprogress'
import router from '@/router'
import store from '@/store'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login', '/404']

router.beforeEach(async(to, from, next) => {
  NProgress.start()
  document.title = getPageTitle(to.meta.title)
  const hasToken = getToken() || true
  if (hasToken) {
    if (to.path === '/login') {
      NProgress.done()
      next('/home')
    }
    const hasGetUserInfo = store.getters.name || true
    if (hasGetUserInfo) {
      next()
    }
  } else if (whiteList.indexOf(to.path) !== -1) {
    next()
  } else {
    next(`/login?redirect=${to.path}`)
    NProgress.done()
  }
})

router.afterEach(() => {
  NProgress.done()
})
