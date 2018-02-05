<template>
  <layout class="coupon">
    <jt-header slot="header" header-title="Coupon"></jt-header>
    <main>
      <h1>{{msg}} coupon</h1>
    </main>
  </layout>
</template>

<script>
import layout from '@/components/layout'
import jtHeader from '@/components/jt-header'
export default {
  name: 'coupon',
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
.coupon {
  h1{
    text-align: center;
    line-height: 100px;
  }
}
</style>
