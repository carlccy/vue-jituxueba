<template>
  <div class="page user">
    <div class="page-header">
      <jt-header header-title="User" go-back="0"></jt-header>
    </div>
    <div class="page-content">
      <div class="page-scroll">
        <section>user</section>
        <section>user</section>
        <section>user</section>
        <section>user</section>
        <section>user</section>
        <section>user</section>
        <section>user</section>
        <section>user</section>
        <section>user</section>
        <section>user</section>
        <section>user</section>
        <section>user</section>
        <section>user</section>
        <section>user</section>
        <section>user</section>
        <section>user</section>
        <section>user</section>
        <section>user</section>
        <section>user</section>
        <section>user</section>
        <section>user</section>
        <section>user</section>
        <section>user</section>
        <section>user</section>
        <section>user</section>
        <section>user</section>
        <section>user</section>
        <section>user</section>
        <section>user</section>
        <section>user</section>
        <section>user</section>
        <section>user</section>
        <section>user</section>
        <section>user</section>
        <section>user</section>
        <section>user</section>
      </div>
    </div>
    <div class="page-footer">
      <jt-footer></jt-footer>
    </div>
  </div>
</template>

<script>
import jtHeader from '@/components/jt-header'
import jtFooter from '@/components/jt-footer'
export default {
  name: 'user',
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
.user {
  background-color: #f2f6f2;
  section{
    text-align: center;
    line-height: 50px;
    font-size: 25px;
  }
}

</style>
