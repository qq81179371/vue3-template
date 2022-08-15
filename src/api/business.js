import request from './request'

export const getBusinessList = params => request({
  url: '/PB/Query',
  method: 'GET',
  params
})
export const getUserInfo = () => request({
})
