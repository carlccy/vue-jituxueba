<template>
  <div class="page">
    <div class="page-header">
      <slot name="header"></slot>
    </div>
    <div class="page-content">
      <div class="page-scroll">
        <slot></slot>
      </div>
    </div>
    <div class="page-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'layout',
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
@import 'src/css/mixin';
.page{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0 auto;
  max-width: 540px;
  background-color: #f2f6f2;
  display: flex;
  flex-direction: column;
  .page-header{
    height: auto;
  }
  .page-content{
    flex: 1;
    overflow: hidden;
    .page-scroll{
      height: 100%;
      overflow-x: hidden;
      overflow-y: hidden;
      word-break: break-word;
      -webkit-overflow-scrolling: touch;
    }
  }
}
.page-footer{
  height: auto;
}
</style>


