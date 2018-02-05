<template>
  <layout class="goods">
    <jt-header slot="header" header-title="Goods" ></jt-header>
    <main>
      <h1>{{msg}} goods {{$route.params.goods_id}}</h1>
      <p>商品详情：拉送的积分拉世纪东方拉上来地方加拉时代峰峻辣椒水大时登录分数得分。</p>
      <p>商品详情：拉送的积分拉世纪东方拉上来地方加拉时代峰峻辣椒水大时登录分数得分。</p>
      <p>商品详情：拉送的积分拉世纪东方拉上来地方加拉时代峰峻辣椒水大时登录分数得分。</p>
      <p>商品详情：拉送的积分拉世纪东方拉上来地方加拉时代峰峻辣椒水大时登录分数得分。</p>
      <p>商品详情：拉送的积分拉世纪东方拉上来地方加拉时代峰峻辣椒水大时登录分数得分。</p>
      <p>商品详情：拉送的积分拉世纪东方拉上来地方加拉时代峰峻辣椒水大时登录分数得分。</p>
      <p>商品详情：拉送的积分拉世纪东方拉上来地方加拉时代峰峻辣椒水大时登录分数得分。</p>
      <p>商品详情：拉送的积分拉世纪东方拉上来地方加拉时代峰峻辣椒水大时登录分数得分。</p>
      <p>商品详情：拉送的积分拉世纪东方拉上来地方加拉时代峰峻辣椒水大时登录分数得分。</p>
      <p>商品详情：拉送的积分拉世纪东方拉上来地方加拉时代峰峻辣椒水大时登录分数得分。</p>
      <p>商品详情：拉送的积分拉世纪东方拉上来地方加拉时代峰峻辣椒水大时登录分数得分。</p>
      <p>商品详情：拉送的积分拉世纪东方拉上来地方加拉时代峰峻辣椒水大时登录分数得分。</p>
      <p>商品详情：拉送的积分拉世纪东方拉上来地方加拉时代峰峻辣椒水大时登录分数得分。</p>
      <p>商品详情：拉送的积分拉世纪东方拉上来地方加拉时代峰峻辣椒水大时登录分数得分。</p>
      <p>商品详情：拉送的积分拉世纪东方拉上来地方加拉时代峰峻辣椒水大时登录分数得分。</p>
      <p>商品详情：拉送的积分拉世纪东方拉上来地方加拉时代峰峻辣椒水大时登录分数得分。</p>
      <p>商品详情：拉送的积分拉世纪东方拉上来地方加拉时代峰峻辣椒水大时登录分数得分。</p>
      <p>商品详情：拉送的积分拉世纪东方拉上来地方加拉时代峰峻辣椒水大时登录分数得分。</p>
      <p>商品详情：拉送的积分拉世纪东方拉上来地方加拉时代峰峻辣椒水大时登录分数得分。</p>
      <p>商品详情：拉送的积分拉世纪东方拉上来地方加拉时代峰峻辣椒水大时登录分数得分。</p>
      <p>商品详情：拉送的积分拉世纪东方拉上来地方加拉时代峰峻辣椒水大时登录分数得分。</p>
      <p>商品详情：拉送的积分拉世纪东方拉上来地方加拉时代峰峻辣椒水大时登录分数得分。</p>
      <p>商品详情：拉送的积分拉世纪东方拉上来地方加拉时代峰峻辣椒水大时登录分数得分。</p>
      <p>商品详情：拉送的积分拉世纪东方拉上来地方加拉时代峰峻辣椒水大时登录分数得分。</p>
      <button class="btn-buy" type="button" @click="goBuy()">立即购买</button>
    </main>
  </layout>
</template>

<script>
import layout from '@/components/layout'
import jtHeader from '@/components/jt-header'
export default {
  name: 'goods',
  data () {
    return {
      msg: 'welcome to'
    }
  },
  components: {
    layout,
    jtHeader
  },
  mounted () {
    console.log(this.$route.params)
  },
  methods: {
    goBuy () {
      this.$router.push({path: '/confirmOrder'})
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/css/mixin';
.goods {
  text-align: center;
  p {
    padding: 0 15px;
    line-height: 30px;
    text-indent: 2em;
    text-align: left;
  }
  .btn-buy {
    position: fixed;
    right: 0;
    bottom: 20px;
    width: 80px;
    height: 40px;
    line-height: 40px;
    border: 1px solid #ddd;
    text-align: center;
    background-color: #f6f
  }
}
</style>
