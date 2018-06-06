<template>
  <footer class="footer">
    <section @click="gotoAddress(item.path)" v-for="item in fData" :key="item.name">
      <div>
        <img :src="item.name == active ? item.selimg : item.defimg">
        <p>{{item.name}}</p>
      </div>
    </section>
  </footer>
</template>

<script>
export default {
  name: 'jt-footer',
  data () {
    return {
      fData: [
        {name: '首页', path: '/home', defimg: require('../images/footer/icon_home_def.png'), selimg: require('../images/footer/icon_home_sel.png')},
        {name: '频道', path: '/channel/0', defimg: require('../images/footer/icon_channel_def.png'), selimg: require('../images/footer/icon_channel_sel.png')},
        // {name: '动态', path: '/dynamic', defimg: require('../images/footer/icon_dynamics_def.png'), selimg: require('../images/footer/icon_dynamics_sel.png')},
        // {name: '商城', path: '/mall', defimg: require('../images/footer/icon_mall_def.png'), selimg: require('../images/footer/icon_mall_sel.png')},
        {name: '我的', path: '/user', defimg: require('../images/footer/icon_user_def.png'), selimg: require('../images/footer/icon_user_sel.png')}
      ]
    }
  },
  props: ['active'],
  methods: {
    gotoAddress (path) {
      this.$router.push({path: path})
    }
  }
}
</script>

<style lang="scss" scoped>
  @import 'src/css/mixin';
  .footer{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    height: 50px;
    max-width: 540px;
    display: flex;
    background-color: #fff;
    border-top: 1px solid #ddd;
    z-index: 1;
    
    section{
      flex: 1;
      height: 100%;
      text-align: center;

      img{
        display: inline-block;
        margin-top: 8px;
        width: 20px;
        height: 20px;
      }
      p{
        font-size: 10px;
        color: #999;
      }
    }
  }
</style>


