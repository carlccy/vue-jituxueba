<template>
  <transition name="router-slideUp" mode="out-in">
    <div class="mask"  v-show="loginShow">
      <div id="login">
          <form class="form">
            <input type="number" v-model="mobile" placeholder="请输入手机号">
            <input type="password" v-model="password" @keyup.enter="login" placeholder="请输入密码">
          </form>
          <button @click="HIDE_LOGIN">X</button>
      </div>
    </div>
  </transition>
</template>

<script>

import md5 from '@/service/md5'
import http from '@/service/http'
import { mapState, mapMutations } from "vuex";

export default {
  name: 'login',
  data () {
    return {
      msg: 'welcome to',
      mobile: '',
      password: ''
    }
  },
  computed: {
    ...mapState(["loginShow"])
  },
  methods: {
    ...mapMutations([
      'RECORD_USERINFO', 'HIDE_LOGIN'
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
        // this.$router.push({path: '/home'})
        this.$emit('logged');
        this.HIDE_LOGIN()
      } else {
        alert(res.message)
      }
    }
    // send_message () {},
    // toPage () {}
  }
}
</script>

<style lang="scss" scoped>
@import 'src/css/mixin';
.mask{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  max-width: 540px;
  margin: 0 auto;
  background-color: #f2f6f2;
  z-index: 999;
}
#login{
  width: 300px;
  height: 400px;
  margin: 50px auto 0;
  border-radius: 10px;
  background-color: #fff;
  text-align: center;
}
form{
  width: 100%;
  padding: 15px;
}
input{
  margin: 10px 0;
  padding: 0 5px;
  height: 30px;
  line-height: 30px;
  border: 1px solid #eee;
  border-radius: 5px;
}
button{
  position: absolute;
  top: 15px;
  left: 15px;
  width: 30px;
  height: 30px;
  line-height: 30px;
}
</style>


