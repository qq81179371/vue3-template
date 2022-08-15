import { asyncRoutes } from '@/router'

function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return route.meta.roles.some(v => v === roles)
  }
  return true
}

export default function createRoutes(roles, routes = asyncRoutes) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = createRoutes(roles, tmp.children)
      }
      res.push(tmp)
    }
  })
  return res
}
