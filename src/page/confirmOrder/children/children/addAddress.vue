<template>
  <layout class="addAddress">
    <jt-header slot="header" header-title="addAddress"></jt-header>
    <main>
      <h1>{{msg}} AddAddress</h1>
    </main>
  </layout>
</template>

<script>
import layout from '@/components/layout'
import jtHeader from '@/components/jt-header'
export default {
  name: 'addAddress',
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
.addAddress {
  h1{
    text-align: center;
    line-height: 100px;
  }
}
</style>
