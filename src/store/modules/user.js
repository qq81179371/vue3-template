import { setToken } from '@/utils/auth'

const state = {
  token: '',
  roles: 0
}

const mutations = {
  SET_TOKEN: (stat, token) => {
    setToken(token)
    stat.token = token
  },
  SET_ROLES: (stat, roles) => {
    stat.roles = roles
  }
}

const actions = {
  handleSetUserInfo({ commit }, data) {
    commit('SET_TOKEN', data.token)
    commit('SET_ROLES', data.type)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
