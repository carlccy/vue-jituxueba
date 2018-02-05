import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)

const state = {
  latitude: '', // 当前位置纬度
  longitude: '', // 当前位置经度
  userInfo: null, // 用户信息
  choosedAddress: null, // 选择地址
  addressIndex: null, // 选择地址的索引值
  login: false, // 是否登录
  loginShow: false, // 是否显示登录界面
  token: '', // 是否登录
  uid: '' // 是否登录
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
