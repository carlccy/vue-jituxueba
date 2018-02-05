<template>
  <div class="mall">
    <jt-header slot="header" header-title="Mall" go-back="0"></jt-header>
    <main>
      <h1>{{msg}} mall</h1>
        <section class="mall-item" v-for="item in goodsList" :key="item" @click="gotoGoods(item)">商品 {{item}}</section>
    </main>
    <jt-footer slot="footer" active="商城"></jt-footer>
  </div>
</template>

<script>
import jtHeader from '@/components/jt-header'
import jtFooter from '@/components/jt-footer'
export default {
  name: 'mall',
  data () {
    return {
      msg: 'welcome to',
      goodsList: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
    }
  },
  components: {
    jtHeader,
    jtFooter
  },
  methods: {
    gotoGoods (id) {
      this.$router.push({ path: `/goods/${id}`})
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/css/mixin';
.mall {
  background-color: #f2f6f2;
  text-align: center;
}
.mall-item{
  width: 100%;
  height: 60px;
  line-height: 60px;
  font-size: 20px;
  padding: 0 15px;
}
</style>
