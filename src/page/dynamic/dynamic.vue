<template>
  <div class="dynamic">
    <jt-header slot="header" header-title="Dynamic" go-back="0"></jt-header>
    <main>
      <h1>{{msg}} dynamic</h1>
    </main>
    <jt-footer slot="footer" active="动态"></jt-footer>
  </div>
</template>

<script>
import jtHeader from '@/components/jt-header'
import jtFooter from '@/components/jt-footer'

export default {
  name: 'dynamic',
  data () {
    return {
      msg: 'welcome to'
    }
  },
  components: {
    jtHeader,
    jtFooter
  }
}
</script>

<style lang="scss" scoped>
@import 'src/css/mixin';
.dynamic {
  background-color: #f2f6f2;
  text-align: center;
}
.dynamic h1{
  text-align: center;
  line-height: 100px;
}
</style>
