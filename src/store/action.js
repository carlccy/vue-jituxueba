import {
  getUser
} from '../service/getData'
import {
  GET_TOKEN,
  GET_USERINFO
} from './mutation-types.js'

export default {
  async getToken ({
    commit,
    state
  }) {
    commit(GET_TOKEN)
  },
  async getUserInfo ({
    commit,
    state
  }) {
    let res = await getUser()
    commit(GET_USERINFO, res.data)
  }
}
