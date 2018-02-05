<template>
  <layout class="chooseAddress">
    <jt-header slot="header" header-title="ChooseAddress"></jt-header>
    <main>
      <h1>{{msg}} chooseAddress</h1>
      <div class="z20">z20</div>
      <router-link to="/confirmOrder/chooseAddress/addAddress">
        <span>新增收货地址</span>
      </router-link>
      <router-link to="/confirmOrder/chooseAddress/editAddress">
        <span>编辑收货地址</span>
      </router-link>
    </main>
    <transition name="router-slid" mode="out-in">
      <router-view></router-view>
    </transition>
  </layout>
</template>

<script>
import layout from '@/components/layout'
import jtHeader from '@/components/jt-header'
export default {
  name: 'chooseAddress',
  data () {
    return {
      msg: 'welcome to'
    }
  },
  components: {
    layout,
    jtHeader
  }
}
</script>

<style lang="scss" scoped>
@import 'src/css/mixin';
.chooseAddress {
  text-align: center;
  line-height: 100px;
  z-index: 2;
  // @include sub
  .z20{
    position: absolute;
  }
}
</style>
