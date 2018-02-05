// better-scroll
<template>
  <div class="page channel">
    <jt-header go-back="0">
    </jt-header>
    <div id="top">
      <div class="flex">
        <div class="flexOne">
          <input type="text" placeholder="搜索学习" id="search">
        </div>
        <div id="filter" @click="doFilter">筛选</div>
      </div>
      <swiper :options="navOptions" ref="myNav" id="nav">
        <swiper-slide v-for="navItem in navs" :key="navItem.id" class="nav-item">
          <span>{{navItem.name}}</span>
        </swiper-slide>
        <div class="bar">
          <div class="color"></div>
        </div>
      </swiper>
    </div>
    <swiper :options="pageOption" ref="myPage" id="page">
      <!-- slides -->
      <swiper-slide v-for="(pageItem, index) in scrolls" :key="pageItem">
        <div ref="myScroll" class="scroll" :scrollIndex="index">
          <div>
            <div class="refresh">下拉刷新</div>
            slide {{index}}
            <div class="card" v-for="(item, index) in scrollData[index].content" :key="item.id">
              <div :data-background="item.image_path" class="swiper-lazy image">
                <div class="swiper-lazy-preloader"></div>
              </div>
              <!-- <div class="image">
                <img :data-src="item.image_path" class="swiper-lazy" width="100%" :alt="item.content_name">
              </div> -->
              <p><strong>课程{{index + 1}}:</strong> {{item.content_name}}</p>
              <p>{{item.channel_name}}</p>
            </div>
            <div class="loadmore" v-if="scrollData[index].noMore">已加载全部</div>
            <div class="loadmore" @click="_getMore" v-else>点击加载更多</div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
    <!-- <jt-footer></jt-footer> -->
    <div class="mark" v-show="openFilter"></div>
    <div class="filterBox" :class="{true:'show-filter'}[openFilter]">
      <p @click="setFilter(1)">只看视频</p>
      <p @click="setFilter(3)">只看音频</p>
      <p @click="setFilter(2)">只看图文</p>
      <p @click="cancelFilter">取消</p>
    </div>
    <a class="goTop" @click="_goTop" v-show="showGoTop">回到顶部</a>
    <jt-footer active="频道"></jt-footer>
  </div>
</template>

<script>
import jtHeader from "@/components/jt-header";
import jtFooter from "@/components/jt-footer";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import { getChannelList, getMyFollow, getChannelDetail } from '@/service/getData'
import {mapState, mapMutations, mapActions} from 'vuex'
import BScroll from "better-scroll"
export default {
  name: "channel",
  data() {
    return {
      navs: null, //nav数据
      scrolls: null, // 渲染scroll的空列表
      scrollData: [], // 列表主要的数据
      Inited: false, // 是否被清空。mounted后scrollInitData[0]有数据，很奇怪
      scrollInitData: [], // 列表主要的数据 空数据 缓存起来
      filtered: 0, // 内容类型 0、全部，1、视频，2、图文，3、音频
      refreshEnd: false, // 下拉刷新end
      loadmoreEnd: false, // 点击加载更多end
      openFilter: false, // 筛选
      showGoTop: false, // 回到顶部
      times: 0, //加载次数
      tSpeed: 300, // 切换动画时间ms
      bar: null, // 底部bar
      navSlideWidth: 0, //导航字数需要统一,每个导航宽度一致
      navSum: 0, //最后一个slide的位置
      navClientWidth: 0, //Nav的可视宽度
      navWidth: 0, // nav总宽度
      currentIndex: 0, // 当前激活的slide
      navOptions: {
        slidesPerView: 'auto',
        // spaceBetween: 30,
        freeMode: true,
        on: {
          'tap': this.navSwiperTap
        }
      },
      progress: 0, // page progress
      pageOption: {
        // some swiper options/callbacks
        // 所有的参数同 swiper 官方 api 参数
        watchSlidesProgress: true,
        resistanceRatio: 0,
        on: {
          'touchMove': this.pageTouchMove,
          'transitionStart': this.pageTransitionStart
        }
      },
      scrollOption: {
        direction: 'vertical',
        slidesPerView: 'auto',
        freeMode: true,
        mousewheel: true,
        lazy: {
          loadPrevNext: true,
        },
        on: {
          'touchEnd': this.scrollTouchEnd,
          'touchStart': this.scrollTouchStart,
          // 'reachEnd': this.scrollReachEnd,
          'touchMove': this.scrollTouchMove,
          'transitionEnd': this.scrollTransitionEnd
        }
      },
    };
  },
  components: {
    jtHeader,
    jtFooter,
    swiper,
    swiperSlide
  },
  computed: {
    ...mapState([
      'token', 'uid'
    ]),
    pageSwiper() {
      return this.$refs.myPage.swiper;
    },
    // scrollSwiper() {
    //   return this.$refs.myScroll;
    // },
    navSwiper() {
      return this.$refs.myNav.swiper;
    },
    currentChannelId() {
      return this.navs[this.currentIndex].id
    },
    currentChannelPage() {
      return this.scrollData[this.currentIndex].page
    }
  },
  beforeMount () {
    // 获取频道列表数据后初始化navSwiper
    getChannelList().then((res) => {
      this.navs = [{id: 0, name: '我的关注', url: 'icon'}, ...res.data]
      this.scrolls = new Array(this.navs.length)
      for(let i=0;i<this.navs.length;i++){
        this.scrollInitData[i] = {
          content: [], // 频道内容
          page: 1, // 页码
          noMore: false}}
      for(let i=0;i<this.navs.length;i++){
        this.scrollData[i] = {
          content: [], // 频道内容
          page: 1, // 页码
          noMore: false}}
      // this.scrollInitData = this.scrollData (不能这样赋值，否则scrollInitData[0]会一直有值)
    }).then(() => this.navSwiperInit()) // 初始化navSwiper
  },
  mounted() {
    // 后去登陆信息后，获取我的关注
    this.getToken().then(() => getMyFollow(this.token, this.uid, 0, 1)
    .then((res) => this._setData(res)).then(() => this.$forceUpdate()).then(() => {
      // current swiper instance
      // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
      this.pageSwiper.slideTo(0, 1000, false);
      this.navSwiper.slideTo(0, 1000, false);
      // this.scrollSwiper[this.currentIndex].swiper.lazy.load() // 延时加载的图片 启动加载
      this.$refs.myScroll.forEach((item, index) => {
        var cc = new BScroll(this.$refs.myScroll[index])
        cc.on('scrollEnd', (pos) => console.log(pos))
      })
    }))
  },
  methods: {
    ...mapActions([
      'getToken'
    ]),
    navSwiperInit: function() {
      const $nav = this.navSwiper;
      this.navSlideWidth = $nav.slides.eq(0).css('width'); //导航字数需要统一,每个导航宽度一致
      this.bar = $nav.$el.find('.bar')
      this.bar.css('width', this.navSlideWidth)
      this.bar.transition(this.tSpeed)
      this.navSum = $nav.slides[$nav.slides.length - 1].offsetLeft //最后一个slide的位置
      // console.log(this.navSum)
      this.navClientWidth = parseInt($nav.$wrapperEl.css('width')) //Nav的可视宽度
      // console.log(this.navClientWidth)
      for (let i = 0; i < $nav.slides.length; i++) {
        this.navWidth += parseInt($nav.slides.eq(i).css('width')) // nav总宽度
      }
      // console.log(this.navWidth)

      // topBar = $nav.$el.parents('body').find('#top') //页头
    },
    navSwiperTap: function() {
      const $nav = this.navSwiper;
      this.currentIndex = $nav.clickedIndex;
      this.pageSwiper.slideTo(this.currentIndex, 0);
    },
    navCenter: function() { //导航居中
      const $nav = this.navSwiper;
      const navActiveSlideLeft = $nav.slides[this.currentIndex].offsetLeft //activeSlide距左边的距离
      $nav.setTransition(this.tSpeed)
      if (navActiveSlideLeft < (this.navClientWidth - parseInt(this.navSlideWidth)) / 2) {
        $nav.setTranslate(0)
      } else if (navActiveSlideLeft > this.navWidth - (parseInt(this.navSlideWidth) + this.navClientWidth) / 2) {
        $nav.setTranslate(this.navClientWidth - this.navWidth)
      } else {
        $nav.setTranslate((this.navClientWidth - parseInt(this.navSlideWidth)) / 2 - navActiveSlideLeft)
      }
    },
    barMove: function() { // 导航条移动过渡
      const activeSlidePosition = this.navSwiper.slides[this.currentIndex].offsetLeft
      //释放时导航粉色条移动过渡
      this.bar.transition(this.tSpeed)
      this.bar.transform('translateX(' + activeSlidePosition + 'px)')
    },
    pageTouchMove: function() {
      const $page = this.pageSwiper
      this.progress = $page.progress
      this.bar.transition(0)
      this.bar.transform('translateX(' + this.navSum * this.progress + 'px)')
    },
    pageTransitionStart: function() { // 切换频道
      const $page = this.pageSwiper
      this.currentIndex = $page.activeIndex
      this.navCenter();
      this.barMove();
      if(this.scrollData[this.currentIndex].content.length === 0){
        if(this.currentIndex === 0){
          getMyFollow(this.token, this.uid, 0, 1)
          .then((res) => this.scrollData[0].content = [...res.data.list]).then(() => this.$forceUpdate())
          // .then(() => this.scrollSwiper[this.currentIndex].swiper.lazy.load())
        }else{
          getChannelDetail(this.token, this.uid, this.currentChannelId, this.filtered, this.currentChannelPage)
          .then((res) => this._setData(res)).then(() => this.$forceUpdate())
          // .then(() => this.scrollSwiper[this.currentIndex].swiper.lazy.load())
        }
      }
    },
    scrollTouchMove: function() {
      const $scroll = this.scrollSwiper[this.currentIndex].swiper
      let refreshText = $scroll.$el.find('.refresh')
      if ($scroll.translate > 80){
        this.$nextTick(function () {
          refreshText.html("释放刷新")
        })
      }
    },
    scrollTouchEnd: function() {
      const $scroll = this.scrollSwiper[this.currentIndex].swiper
      let refreshText = $scroll.$el.find('.refresh')
      if ($scroll.translate > 80) {
        $scroll.setTransition($scroll.params.speed);
        $scroll.setTranslate(80);
        $scroll.touchEventsData.isTouched = false; //跳过touchEnd事件后面的跳转(4.0.5)
        refreshText.html("刷新中...")
        $scroll.allowTouchMove = false;

        this.scrollData[this.currentIndex].page = 1
        this.scrollData[this.currentIndex].content = []
        // 刷新
        if(this.currentIndex === 0){
          getMyFollow(this.token, this.uid, 0, 1)
          .then((res) => this._setData(res)).then(() => {
            this.$forceUpdate()
            refreshText.html("刷新完成")
            this.refreshEnd = true
            $scroll.setTranslate(0)
            $scroll.allowTouchMove = true
          })
        }else{
          getChannelDetail(this.token, this.uid, this.currentChannelId, this.filtered, 1)
          .then((res) => this._setData(res)).then(() => {
            this.$forceUpdate()
            refreshText.html("刷新完成")
            this.refreshEnd = true
            $scroll.setTranslate(0)
            $scroll.allowTouchMove = true
          })
        }
      }
    },
    scrollTouchStart: function() {
      let refreshText = this.scrollSwiper[this.currentIndex].swiper.$el.find('.refresh')
      if (this.refreshEnd == true) {
        refreshText.html("下拉刷新");
        this.refreshEnd = false;
      }
    },
    scrollTransitionEnd: function() {
      const $scroll = this.scrollSwiper[this.currentIndex].swiper
      if ($scroll.translate < -1000) { // 滚动高度大于1000显示返回顶部按钮
        this.showGoTop = true
      }else {
        this.showGoTop = false
      }
    },
    _setData: function(res) {
      this.scrollData[this.currentIndex].content.push(...res.data.list)
      if(res.data.list.length < 10){
        this.scrollData[this.currentIndex].noMore = true
      }else{
        this.scrollData[this.currentIndex].noMore = false
      }
    },
    _getMore: function() {
      this.loadmoreEnd = false
      this.scrollData[this.currentIndex].page++
      if(!this.loadmoreEnd){
        if(this.currentIndex === 0){
          getMyFollow(this.token, this.uid, this.filtered, this.scrollData[this.currentIndex].page)
          .then((res) => this._setData(res)).then(() => {
            this.loadmoreEnd = true
            this.$forceUpdate()
          })
        }else{
          getChannelDetail(this.token, this.uid, this.currentChannelId, this.filtered, this.scrollData[this.currentIndex].page)
          .then((res) => this._setData(res)).then(() => {
            this.loadmoreEnd = true
            this.$forceUpdate()
          })
        }
      }
      // this.$nextTick(() => {
      // })
    },
    doFilter: function() {
      this.openFilter = true
    },
    cancelFilter: function() {
      this.openFilter = false
    },
    setFilter: function(type) {
      this.filtered = type
      this.cancelFilter()

      this.scrollData = this.scrollInitData;
      this.$nextTick(() => {
        if(this.currentIndex === 0){
          getMyFollow(this.token, this.uid, this.filtered, 1)
          .then((res) => {
            this._setData(res)
            this.loadmoreEnd = true
            this._goTop()
          }).then(() => this.$forceUpdate())
          .then(() => this.scrollSwiper[this.currentIndex].swiper.lazy.load())
        }else{
          getChannelDetail(this.token, this.uid, this.currentChannelId, this.filtered, 1)
          .then((res) => {
            this._setData(res)
            this.loadmoreEnd = true
            this._goTop()
          }).then(() => this.$forceUpdate())
        }
      })
    },
    _goTop: function() {
      const $scroll = this.scrollSwiper[this.currentIndex].swiper
      // if ($scroll.translate > 80) {
      $scroll.setTransition($scroll.params.speed);
      $scroll.setTranslate(0);
      this.showGoTop = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/css/mixin";
.channel h1 {
  text-align: center;
  line-height: 100px;
}
#top{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  max-width: 540px;
  background-color: #fff;
  z-index: 3;
}
#search{
  margin-left: 10px;
  width: 100%;
  height: 32px;
  line-height: 20px;
  padding: 5px 10px;
  border: 1px solid #eee;
  border-radius: 16px;
}
#filter{
  width: 80px;
  height: 40px;
  text-align: center;
  font-size: 14px;
  color: #666;
  line-height: 40px;
}
#nav {
  width: 100%;
  height: 44px;
  line-height: 44px;
  border-top: 1px solid #eee;
  background-color: #fff;
}
.nav-item{
  width: 80px !important;
}
#page {
  width: 100%;
  height: 100%;
  // padding-top: 44px;
}
.scroll {
  width: 100%;
  height: 100%;
}
.scroll .swiper-slide{
  height: auto;
}
.refresh {
  margin-top: 40px;
  line-height: 44px;
  text-align: center;
  width: 100%;
}
.loadmore {
  padding-bottom: 50px;
  line-height: 30px;
  text-align: center;
  width: 100%;
}
.bar {
	width:50px;
	height:3px;
	position:absolute;
	bottom:0px;
}
.bar .color {
	width:50px;
	margin:0 auto;
	height:3px;
	background:#ff4891;
}
.card{
  line-height: 50px;
}
.image{
  position: relative;
  width: 100%;
  padding-bottom: 40%;
  height: 0;
  overflow: hidden;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}
.filterBox{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  max-width: 540px;
  margin: 0 auto;
  background-color: #fff;
  transform: translateY(100%);
  transition: all .5s ease;
  will-change: transform;
  z-index: 100;

  p{
    line-height: 30px;
    text-align: center;
    font-size: 15px;
    color: #666;
  }
}
.show-filter{
  transform: translateY(0);
}
.mark{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, .7);
  z-index: 99;
}
.goTop{
  position: fixed;
  right: 15px;
  bottom: 100px;
  padding: 10px;
  width: 50px;
  height: 50px;
  border: 1px solid #ddd;
  border-radius: 50%;
  line-height: 15px;
  font-size: 12px;
  text-align: center;
  color: #666;
  background-color: #fff;
  z-index: 5;
}
</style>
