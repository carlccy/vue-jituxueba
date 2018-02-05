<template>
  <layout class="cart">
    <jt-header slot="header" header-title="Cart" go-back="0"></jt-header>
    <main>
      <h1>{{msg}} cart</h1>
    </main>
    <jt-footer slot="footer"></jt-footer>
  </layout>
</template>

<script>
import layout from '@/components/layout'
import jtHeader from '@/components/jt-header'
import jtFooter from '@/components/jt-footer'

export default {
  name: 'cart',
  data () {
    return {
      msg: 'welcome to'
    }
  },
  components: {
    layout,
    jtHeader,
    jtFooter
  }
}
</script>

<style lang="scss" scoped>
@import 'src/css/mixin';
.cart h1{
  text-align: center;
  line-height: 100px;
}
</style>
