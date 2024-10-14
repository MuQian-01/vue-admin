import { setToken, getToken, removeToken } from '@/utils/auth'
import { login } from '@/api/user'

const actions = {
  async login({ commit }, loginForm) {
    let res = await login(loginForm)
    console.log(res)
  },
}

const mutations = {}

const state = {
  token: null,
}

export default {
  // 开启命名空间
  namespaced: true,
  state,
  mutations,
  actions,
}
