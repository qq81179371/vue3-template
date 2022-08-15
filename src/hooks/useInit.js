/**
 * 该函数负责刷新时的初始化动作
 * 1. 读取本地存储的信息,是否登录,以及身份
 * 2. 根据身份挂载不同的路由模块
 * 3. 返回到main函数中生成实例
 */
import { computed } from 'vue'
import store from '@/store'
import router from '@/router'
import createRoutes from '@/utils/createRoutes'
// import Err404 from '@/router/modules/err'

const useInit = () => {
  const isLogin = computed(() => store.getters.isLogin || true)
  if (isLogin.value) {
    const routes = createRoutes(store.getters.roles)
    // router.removeRoute('err404')
    routes.forEach(e => {
      router.addRoute(e)
    })
    // router.addRoute(Err404)
  }
  return {
    store,
    router
  }
}

export default useInit
