<template>
  <section class="page user">
    <jt-header class="header" header-title="User" go-back="0"></jt-header>
    <div ref="wrapper" class="wrapper"> 
      <ul class="content"> 
        <h1>{{msg}} user</h1>
        <li v-for="item in data" :key="item">
          <p>{{item}}1</p>
          <p>{{item}}22</p>
          <p>{{item}}33</p>
          <p>{{item}}44</p>
          <p>{{item}}55</p>
        </li>
      </ul> 
      <div class="loading-wrapper"></div> 
    </div>
    <jt-footer class="footer" active="我的"></jt-footer>
  </section>
</template>

<script>
import jtHeader from "@/components/jt-header"
import jtFooter from "@/components/jt-footer"
import BScroll from "better-scroll"
export default {
  name: "user",
  data() {
    return {
      msg: "welcome to",
      data: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],
      pulldown: true
    };
  },
  mounted () {
    setTimeout(() => {
      this.scroll = new BScroll(this.$refs.wrapper, {probeType: 3})
          this.scroll.on('touchEnd', (pos) => {
            // 下拉动作
            // console.log(pos)
            if (pos.y > 50) {
              this.loadData()
            }
          })
          this.scroll.on('touchEnd', (pos) => {
            console.log(pos)
          })
    }, 200)
  },
  components: {
    jtHeader,
    jtFooter
  },
  methods: {
    pulldowns : function(){
      
    },
    loadData: function(){
      console.log('loadData')
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/css/mixin";
.user h1 {
  text-align: center;
  line-height: 100px;
}
.user{
  z-index: 1;
  padding: 44px 0 50px;
}
.header{
  position: absolute;
  top: 0;
  left: 0;
  height: 44px;
  line-height: 44px;
  z-index: 2;
}
.footer{
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  z-index: 2;
}
.wrapper{
  width: 100%;
  height: 100%;
}
</style>
