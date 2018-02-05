<template>
  <div class="page login">
    <img @click="back" class="back" src="../../images/login/icon_back.png" height="17" alt="back">
    <p class="top">welcome</p>
    <form class="form">
      <div class="input-group">
        <img class="input-img" src="../../images/login/icon_name.png" width="13" height="16" alt="mobile">
        <input type="number" v-model="mobile" placeholder="请输入手机号">
      </div>
      <div class="input-group">
        <img class="input-img" src="../../images/login/icon_password.png" width="13" height="16" alt="password">
        <input type="password" v-model="password" @keyup.enter="login" placeholder="请输入密码">
        <span class="input-"></span>
      </div>
      <p class="text-right">验证码登录</p>
      <button type="button" class="btn-login" @click="login">立即登录</button>
      <p class="action"><span>找回密码</span><span>|</span><span>立即注册</span></p>
    </form>
  </div>
</template>

<script>
import md5 from '@/service/md5'
import http from '@/service/http'
import {mapMutations} from 'vuex'

export default {
  // name: 'login',
  data () {
    return {
      msg: 'welcome to',
      mobile: '',
      password: ''
    }
  },
  components: {
  },
  methods: {
    ...mapMutations([
      'RECORD_USERINFO'
    ]),
    // tab () {},
    async login () {
      if (!this.mobile) {
        alert('手机号码不正确!')
        return false
      } else if (this.mobile && !/^[1][34578][0-9]{9}$/.test(this.mobile)) {
        alert('请填写正确的手机号!')
        return false
      } else if (this.mobile && !this.password) {
        alert('密码不能为空!')
        return false
      }
      let res = await http.post('/User/login', {
        mobile: this.mobile,
        password: md5.hex_md5(this.password)
      })
      console.log(res)
      if (res.code === '200') {
        console.log('登录成功!')
        this.RECORD_USERINFO(res.data) // 记录登录信息
        this.$router.go(-1)
      } else {
        console.log(res.message)
      }
    },
    back: function() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/css/mixin';
@import './login.scss';
</style>
