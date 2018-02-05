<template>
  <layout class="confirmOrder">
    <jt-header slot="header" header-title="ConfirmOrder"></jt-header>
    <main>
      <h1>{{msg}} confirmOrder</h1>
      <div class="z10">Z10</div>
      <section @click="gotoAddress({path: 'confirmOrder/chooseAddress'})">选择地址</section>
      <section @click="gotoAddress({path: 'confirmOrder/coupon'})">优惠券</section>
      <section @click="gotoAddress({path: 'confirmOrder/invoice'})">发票</section>
      <section>asdfasdfasd1</section>
      <section>asdfasdfasd2</section>
      <section>asdfasdfasd3</section>
      <section>asdfasdfasd4</section>
      <section>asdfasdfasd5</section>
      <section>asdfasdfasd6</section>
      <section>asdfasdfasd7</section>
      <section>asdfasdfasd8</section>
      <section>asdfasdfasd9</section>
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
  name: 'confirmOrder',
  data () {
    return {
      msg: 'welcome to'
    }
  },
  components: {
    layout,
    jtHeader
  },
  methods: {
    gotoAddress (path) {
      this.$router.push(path)
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/css/mixin';
.confirmOrder{
  z-index: 1;
  h1,
  section{
    text-align: center;
    line-height: 100px;
  }
  .z10{
    position: absolute;
    z-index: 2;
  }
}
</style>
