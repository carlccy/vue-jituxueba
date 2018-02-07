<template>
    <div>
      <transition name="router-fade" mode="out-in">
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
      </transition>
      <transition name="router-fade" mode="out-in">
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </transition>
    </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  export default {
    name: 'app',
    data () {
      return {

      }
    },
    computed: {
      ...mapState([
        'token', 'uid', 'userInfo'
      ]),
    },
    mounted () {
      this.getToken().then(() => {
        this.token && this.getUserInfo()
        this.getInfo()
      })
    },
    methods: {
      ...mapActions([
        'getToken', 'getUserInfo'
      ]),
      getInfo () {
        if (!this.token) {
          console.log('未登录')
        } else {
          console.log('已登录')
        }
      },
    }
  }
</script>

<style lang="scss">
  @import 'src/css/common'; // 公共css
  .page{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0 auto;
    max-width: 540px;
    background-color: #f2f6f2;
    overflow: auto;
    z-index: 1;
  }
  .article-con p{
    margin: 18px 0;
  }
  .article-con p span{
    font-size: 15px !important;
    color: #3e3e3e;
    line-height: 28px !important;
    letter-spacing: 1px !important;
    font-family: Arial, Helvetica, sans-serif !important;
  }
  .article-con img{
    max-width: 100% !important;
  }
</style>
