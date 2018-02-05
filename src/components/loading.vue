<template>
    <div id="loading" v-show="show">
        <div class="ball-clip-rotate-multiple">
            <div></div>
            <div></div>
        </div>
        <p class="loads">玩儿命加载中</p>
    </div>
</template>

<script>
export default {
  name: 'loading',
  data () {
      return {

      }
  },
  props: ['show'],
  methods: {
      
  }
}
</script>


<style type="text/css">
    #loading{width:100%;position:fixed;top:0;left:0;right:0;bottom:0;max-width:540px;margin:0 auto;background-color:#fff;z-index:99998}
    #loading .loads{position:absolute;top:36%;left:0;right:0;text-align:center;font-size:15px;color:#1d9ff5;z-index:99999}
    .tab1,.tab2,.tab3{position:absolute;top:0;left:0;right:0;bottom:0;overflow-y:scroll;overflow-x:hidden;height:100%}
    .tab1{z-index:20}
    .tab2{z-index:50}
    .tab3{z-index:80}
    @-webkit-keyframes rotate{0%{-webkit-transform:rotate(0deg) scale(1);transform:rotate(0deg) scale(1)}50%{-webkit-transform:rotate(180deg) scale(0.6);transform:rotate(180deg) scale(0.6)}100%{-webkit-transform:rotate(360deg) scale(1);transform:rotate(360deg) scale(1)}}
    @-moz-keyframes rotate{0%{-moz-transform:rotate(0deg) scale(1);transform:rotate(0deg) scale(1)}50%{-moz-transform:rotate(180deg) scale(0.6);transform:rotate(180deg) scale(0.6)}100%{-moz-transform:rotate(360deg) scale(1);transform:rotate(360deg) scale(1)}}
    @-o-keyframes rotate{0%{-o-transform:rotate(0deg) scale(1);transform:rotate(0deg) scale(1)}50%{-o-transform:rotate(180deg) scale(0.6);transform:rotate(180deg) scale(0.6)}100%{-o-transform:rotate(360deg) scale(1);transform:rotate(360deg) scale(1)}}
    @-ms-keyframes rotate{0%{-ms-transform:rotate(0deg) scale(1);transform:rotate(0deg) scale(1)}50%{-ms-transform:rotate(180deg) scale(0.6);transform:rotate(180deg) scale(0.6)}100%{-ms-transform:rotate(360deg) scale(1);transform:rotate(360deg) scale(1)}}
    @keyframes rotate{0%{-webkit-transform:rotate(0deg) scale(1);transform:rotate(0deg) scale(1)}50%{-webkit-transform:rotate(180deg) scale(0.6);transform:rotate(180deg) scale(0.6)}100%{-webkit-transform:rotate(360deg) scale(1);transform:rotate(360deg) scale(1)}}
    .ball-clip-rotate-multiple{position:absolute;top:27%;left:50%;margin-left:-17.5px}
    .ball-clip-rotate-multiple>div{-webkit-animation-fill-mode:both;-moz-animation-fill-mode:both;-o-animation-fill-mode:both;-ms-animation-fill-mode:both;animation-fill-mode:both;position:absolute;left:0px;top:0px;border:2px solid #1d9ff5;border-bottom-color:transparent;border-top-color:transparent;border-radius:100%;height:35px;width:35px;-webkit-animation:rotate 1s 0s ease-in-out infinite;-moz-animation:rotate 1s 0s ease-in-out infinite;-o-animation:rotate 1s 0s ease-in-out infinite;-ms-animation:rotate 1s 0s ease-in-out infinite;animation:rotate 1s 0s ease-in-out infinite;will-change:transform}
    .ball-clip-rotate-multiple>div:last-child{display:inline-block;top:10px;left:10px;width:15px;height:15px;-webkit-animation-duration:0.5s;-moz-animation-duration:0.5s;-o-animation-duration:0.5s;-ms-animation-duration:0.5s;animation-duration:0.5s;border-color:#1d9ff5 transparent #1d9ff5 transparent;-webkit-animation-direction:reverse;-moz-animation-direction:reverse;-o-animation-direction:reverse;-ms-animation-direction:reverse;animation-direction:reverse}
</style>