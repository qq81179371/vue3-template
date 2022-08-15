import request from './request'

export const userLogin = data => request({
  url: '/Login/Login',
  method: 'POST',
  data
})
export const getUserInfo = () => request({
})
