// all swiper
<template>
  <div class="page channel">
    <div id="top">
      <div class="flex">
        <!-- <img id="activity" src="../../images/logo.png" width="22px" alt=""> -->
        <div id="search" class="flexOne"><img src="../../images/channel/icon_search.png" width="14px" height="14px"><span>搜索课程</span></div>
        <div id="filter" @click="doFilter">筛选<!-- <img src="../../images/channel/icon_filter.png" width="14" height="14" alt=""> --></div>
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
        <swiper :options="scrollOption" ref="myScroll" class="scroll" :scrollIndex="index">
          <swiper-slide>
            <div class="scroll-con">
              <div class="refresh">下拉刷新</div>
              <div class="login" v-show="!token && index === 0">
                <img src="../../images/logo.png" width="100px" alt="logo">
                <p>登录后可查看已关注内容</p>
                <router-link to="channel/login" class="go-login">点击登录</router-link>
              </div>
              <div class="hot-body" v-show="index >= 1 || token">
                <div class="hot-item" v-for="item in scrollData[index].content" @click="_goDetail(item)" :class="{true:'answerd'}[item.answer_status == 2]">
                  <div class="hot-pic">
                    <img :src="item.image_path" alt="" width="100%">
                  </div>
                  <!-- <div :data-background="item.image_path" class="swiper-lazy image-path">
                    <div class="swiper-lazy-preloader"></div>
                  </div> -->
                  <div class="hot-txt">
                    <p class="hot-title inlineShow">
                      {{item.content_name}}
                    </p>
                    <p class="hot-intro two-line" v-html="item.introduce">
                    </p>
                    <div class="hot-actions">
                      <div class="text-left hot-left flexOne">
                        <img src="../../images/home/icon_video.png" alt="视频" height="11" v-if="item.content_type == 1">
                        <img src="../../images/home/icon_graphic.png" alt="图文" height="11" v-if="item.content_type == 2">
                        <img src="../../images/home/icon_audio.png" alt="音频" height="11" v-if="item.content_type == 3">
                        <span>{{item.channel_name}}</span>
                        <img class="head_pic" :src="item.head_pic?item.head_pic:'images/avater.png'" width="16" height="16" alt="作者">
                        <span>{{item.user_name?item.user_name:item.realname}}</span>
                      </div>
                      <div class="text-right hot-right">
                        <img src="../../images/home/icon_seen.png" height="10" alt="浏览">
                        <span>{{item.look_count}}</span>
                        <img src="../../images/home/icon_comment.png" height="10" alt="评论">
                        <span>{{item.comment_count}}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="loadmore" v-if="scrollData[index].noMore">已加载全部</div>
              <div class="loadmore" v-if="!scrollData[index].noMore && !(index == 0 && !token)"><img src="../../images/refresh.gif" width="20" height="20"><span>正在加载中…</span></div>
            </div>
          </swiper-slide>
        </swiper>
      </swiper-slide>
    </swiper>
    <!-- <jt-footer></jt-footer> -->
    <div class="mark" v-show="openFilter" @click="cancelFilter"></div>
    <div class="filterBox" :class="{true:'show-filter'}[openFilter]">
      <p @click="setFilter(0)">全部</p>
      <p @click="setFilter(1)">只看视频</p>
      <p @click="setFilter(3)">只看音频</p>
      <p @click="setFilter(2)">只看图文</p>
      <p @click="cancelFilter">取消</p>
    </div>
    <a class="goTop" @click="_goTop" v-show="showGoTop">回到顶部</a>
    <jt-footer active="频道"></jt-footer>
    <loading :show="loading"></loading>
    <transition name="router-slid" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import jtHeader from "@/components/jt-header";
import loading from "@/components/loading";
import jtFooter from "@/components/jt-footer";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import { getChannelList, getMyFollow, getChannelDetail } from '@/service/getData'
import {mapState, mapMutations, mapActions} from 'vuex'
export default {
  name: "channel",
  data() {
    return {
      loading: true,
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
      reachEndAble: false, // 到达底部加载更多生效，初始化每个scrollSwiper时都会调用一次reachEnd方法
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
          'reachEnd': this.scrollReachEnd,
          'touchMove': this.scrollTouchMove,
          'transitionEnd': this.scrollTransitionEnd
        }
      },
    };
  },
  components: {
    jtHeader,
    jtFooter,
    loading,
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
    scrollSwiper() {
      return this.$refs.myScroll;
    },
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
  async beforeMount () {
    // 获取频道列表数据后初始化navSwiper
    await getChannelList().then((res) => {
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

    // 不能放入mounted中，beforeMount和mounted并不是同步执行
    /* this.getToken().then(() => {
      this.pageSwiper.slideTo(1, 300, false);
      this.reachEndAble = true;
    }) */
  },
  mounted() {
    // 后去登陆信息后，获取我的关注
    // this.pageSwiper.slideTo(1, 1000, false);
    this.getToken().then(() => {
      if(this.token) {
        getMyFollow(this.token, this.uid, 0, 1)
        .then((res) => this._setData(res)).then(() => this.$forceUpdate()).then(() => {
          // current swiper instance
          // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
          this.pageSwiper.slideTo(0, 1000, false)
          this.navSwiper.slideTo(0, 1000, false)
          this.scrollSwiper[this.currentIndex].swiper.lazy.load() // 延时加载的图片 启动加载
          this.reachEndAble = true;
          this.loading = false;
        })
      }else{
        this.reachEndAble = true;
        this.loading = false;
      }
    })
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
          this.token && getMyFollow(this.token, this.uid, 0, 1)
          .then((res) => this.scrollData[0].content = [...res.data.list]).then(() => this.$forceUpdate())
          .then(() => this.scrollSwiper[this.currentIndex].swiper.lazy.load())
        }else{
          getChannelDetail(this.token, this.uid, this.currentChannelId, this.filtered, this.currentChannelPage)
          .then((res) => this._setData(res)).then(() => this.$forceUpdate())
          .then(() => this.scrollSwiper[this.currentIndex].swiper.lazy.load())
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
          if(this.token){
            getMyFollow(this.token, this.uid, 0, 1)
            .then((res) => this._setData(res)).then(() => {
              this.$forceUpdate()
              refreshText.html("刷新完成")
              this.refreshEnd = true
              $scroll.setTranslate(0)
              $scroll.allowTouchMove = true
            })
          }else{
            refreshText.html("刷新完成")
            this.refreshEnd = true
            $scroll.setTranslate(0)
            $scroll.allowTouchMove = true
          }
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
      if ($scroll.translate < -1500) { // 滚动高度大于1500显示返回顶部按钮
        this.showGoTop = true
      }else {
        this.showGoTop = false
      }
    },
    _setData: function(res) { // 将数据加入数据列表
      this.scrollData[this.currentIndex].content.push(...res.data.list)
      if(res.data.list.length < 10){
        this.scrollData[this.currentIndex].noMore = true
      }else{
        this.scrollData[this.currentIndex].noMore = false
      }
    },
    scrollReachEnd: function() {
      // token改变这个也会触发 ...
      if(this.reachEndAble){
        this.loadmoreEnd = false
        this.scrollData[this.currentIndex].page++
        if(!this.loadmoreEnd){
          if(this.currentIndex === 0){
            this.token && getMyFollow(this.token, this.uid, this.filtered, this.scrollData[this.currentIndex].page)
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
      }
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
          this.token && getMyFollow(this.token, this.uid, this.filtered, 1)
          .then((res) => {
            this._setData(res)
            this.loadmoreEnd = true
            this._goTop()
          })
          .then(() => this.$forceUpdate())
          .then(() => this.scrollSwiper[this.currentIndex].swiper.lazy.load())
        }else{
          getChannelDetail(this.token, this.uid, this.currentChannelId, this.filtered, 1)
          .then((res) => {
            this._setData(res)
            this.loadmoreEnd = true
            this._goTop()
          })
          .then(() => this.$forceUpdate())
          .then(() => this.scrollSwiper[this.currentIndex].swiper.lazy.load())
        }
      })
    },
    _goTop: function() {
      const $scroll = this.scrollSwiper[this.currentIndex].swiper
      $scroll.setTransition($scroll.params.speed);
      $scroll.setTranslate(0);
      this.showGoTop = false;
    },
    _getFollow: function() {
      this.scrollData[this.currentIndex] = {content: [], page: 1, noMore: false}
      this.token && getMyFollow(this.token, this.uid, 0, 1)
      .then((res) => this._setData(res))
      .then(() => this.$forceUpdate())
      .then(() => this.scrollSwiper[this.currentIndex].swiper.lazy.load())
    },
    _goDetail: function(v) {
      if(v.content_type === 1) {
        console.log('video')
        this.$router.push({ path: `channel/video/${v.id}`})
      }else if(v.content_type === 2) {
        this.$router.push({ path: `channel/article/${v.id}`})
      }else if(v.content_type === 3) {
        console.log('audio')
        this.$router.push({ path: `channel/audio/${v.id}`})
      }
    }
  },
  watch: {
    // 登录后获取我的关注
    token: function(val, oldVal){
      this._getFollow()
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/css/mixin";
@import './channel.scss';
</style>

