import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'
import app from './modules/app'
import user from './modules/user'
import getters from './getters'

const vuexLocal = new VuexPersistence({
  modulesstring: [user],
  storage: window.localStorage
})
export default createStore({
  modules: {
    app,
    user
  },
  getters,
  plugins: [vuexLocal.plugin]
})
