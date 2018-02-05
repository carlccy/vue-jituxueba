<template>
  <header>
    <img class="back" @click="$router.go(-1)" v-show="!goBack" src="../images/back_black.png" height="16" alt="back">
    <span class="title">{{headerTitle}}</span>
    <slot></slot>
    <img class="share" v-show="share" src="../images/share.png" height="20" alt="share">
  </header>
</template>

<script>
export default {
  name: 'jt-header',
  data () {
    return {}
  },
  props: ['headerTitle', 'goBack', 'share']
}
</script>

<style lang="scss" scoped>
  @import 'src/css/mixin';
  header{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    max-width: 540px;
    margin: 0 auto;
    line-height: 44px;
    text-align: center;
    border-bottom: 1px solid #ddd;
    background-color: #fff;
    z-index: 1;

    .title{
      font-size: 16px;
      color: #333;
    }
    .back{
      position: absolute;
      left: 15px;
      top: 14px;
      cursor: pointer;
    }
    .share{
      position: absolute;
      right: 15px;
      top: 12px;
      cursor: pointer;
    }
  }
</style>


