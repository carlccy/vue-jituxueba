<template>
  <layout class="editAddress">
    <jt-header slot="header" header-title="EditAddress"></jt-header>
    <main>
      <h1>{{msg}} editAddress</h1>
    </main>
  </layout>
</template>

<script>
import layout from '@/components/layout'
import jtHeader from '@/components/jt-header'
export default {
  name: 'editAddress',
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
.editAddress {
  h1{
    text-align: center;
    line-height: 100px;
  }
}
</style>
