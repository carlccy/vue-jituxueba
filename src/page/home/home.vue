<template>
  <div class="page home">
    <header class="top flex">
      <img class="top-img" src="../../images/home/icon_search.png" width="" height="20" alt="search">
      <h1 class="top-search flexOne">积土学吧</h1>
      <img class="top-img" src="../../images/home/icon_message.png" width="18" height="22" alt="message">
    </header>

    <scroll :pullup="pullup" :pulldown="pulldown" @pulldown="loadData" @pullup="loadMore" :data="todayRecommand"> 
      <div class="content">
        <swiper :options="bannerOptions" ref="myBanner" id="banner">
          <swiper-slide v-for="item in banners" :key="item.name" class="banner-item">
            <img @click="goBanner(item)" :src="item.banner" alt="" width="100%">
          </swiper-slide>
          <div class="swiper-pagination"  slot="pagination"></div>
        </swiper>

        <nav class="nav-list">
          <div class="nav-item" @click="toChannel(1)">
            <div class="nav-img">
              <img src="../../images/home/icon_c_story.png" width="100%" alt="国学故事">
            </div>
            <p>国学故事</p>
          </div>
          <div class="nav-item" @click="toChannel(2)">
            <div class="nav-img">
              <img src="../../images/home/icon_c_keep.png" width="100%" alt="国医养生">
            </div>
            <p>国医养生</p>
          </div>
          <div class="nav-item" @click="toChannel(3)">
            <div class="nav-img">
              <img src="../../images/home/icon_happy_post.png" width="100%" alt="快乐驿站">
            </div>
            <p>快乐驿站</p>
          </div>
          <div class="nav-item" @click="toChannel(4)">
            <div class="nav-img">
              <img src="../../images/home/icon_read.png" width="100%" alt="读书会">
            </div>
            <p>读书会</p>
          </div>
          <div class="nav-item" @click="toChannel('')">
            <div class="nav-img">
              <img src="../../images/home/icon_all_cate.png" width="100%" alt="更多频道">
            </div>
            <p>更多频道</p>
          </div>
        </nav>

        <!-- <div class="recommend-top flex">
          <div class="flexOne text-right"><img src="../../images/home/head_styles_l.png" alt=""></div>
          <h1>热门推荐</h1>
          <div class="flexOne text-left"><img src="../../images/home/head_styles_r.png" alt=""></div>
        </div> -->

        <!-- 热门推荐 -->
        <div class="list">
          <div class="list-head">
            <i class="line"></i>
            <h3>今日推荐</h3>
            <img src="../../images/home/icon_more.png" width="7" height="15" alt="more">
          </div>
          <div class="list-body">
            <div class="list-item flex" v-for="item in todayRecommand">
              <div class="list-pic">
                <img :src="item.image_path" width="100%" height="100%" alt="picture">
              </div>
              <div class="list-txt flexOne">
                <p class="txt-title one-line">{{item.content_name}}</p>
                <p class="txt-con three-line" v-html="item.introduce"></p>
                <div class="actions">
                  <div class="action">
                    <img src="../../images/home/icon_seen.png" width="12" height="10" alt="">
                    <span>{{item.look_count}}</span>
                  </div>
                  <div class="action">
                    <img src="../../images/home/icon_comment.png" width="10" height="10" alt="">
                    <span>{{item.comment_count}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 猜你喜欢 -->
        <div class="list">
          <div class="list-head">
            <i class="line"></i>
            <h3>猜你喜欢</h3>
            <img src="../../images/home/icon_change.png" width="15" height="15" alt="more">
            <span>换一换</span>
          </div>
          <div class="list-body">
            <div class="card-item">
              <div class="card" v-for="item in [1,2,3]">
                <div class="card-pic">
                  <img src="../../images/home/pic1.png" width="100%" height="100%" alt="picture">
                </div>
                <p class="card-txt two-line">一杯清茶,一杯清茶，品人生浮沉丨国医养生</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 热门学习 -->
        <div class="list">
          <div class="list-head">
            <i class="line"></i>
            <h3>热门学习</h3>
            <img src="../../images/home/icon_more.png" width="7" height="15" alt="more">
          </div>
          <div class="list-body">
            <div class="hot-item" v-for="item in hotContentList" :key="item.id" @click="toHot(item)" :class="{true:'answerd'}[item.answer_status == 2]">
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
                    <img class="head_pic" :src="item.head_pic?item.head_pic: require('../../images/avater.png')" width="16" height="16" alt="作者">
                    <span>{{item.user_name}}</span>
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
        </div>
        <div class="loadmore"><img src="../../images/refresh.gif">正在加载…</div>
      </div>
      <transition name="router-slid" mode="out-in">
        <router-view></router-view>
      </transition>
    </scroll>
    <jt-footer active="首页"></jt-footer>
    <loading :show="loading"></loading>
  </div>
</template>

<script>
import jtFooter from '@/components/jt-footer'
// import { swiper, swiperSlide } from "vue-awesome-swiper";
import scroll from "@/components/scroll"
import { getBannerList, getHotContentList } from '@/service/getData'
import loading from "@/components/loading";

export default {
  name: 'home',
  data () {
    return {
      msg: 'welcome to',
      loading: false,
      banners: '',
      bannerOptions: {},
      hotContentList: '',
      todayRecommand: '',
      currentPage: 1,
      loadend: true,
      scrollOption: {
        speed: 200,
        direction: 'vertical',
        slidesPerView: 'auto',
        freeMode: true,
        mousewheel: true,
        // preventClicks: false,
        preventLinksPropagation : false,
        pagination: {
          el: '.swiper-pagination'
        },
        // lazy: {
        //   loadPrevNext: true,
        // },
      },
      pulldown: true,
      pullup: true,
    }
  },
  components: {
    jtFooter,
    scroll,
    // swiper,
    // swiperSlide,
    loading
  },
  created () {
    this.loading = true
    getBannerList().then((res) => this.banners = res.data)
    getHotContentList().then((res) => {
      this.hotContentList = res.data.list
      this.todayRecommand = [...res.data.list].splice(0, 3)
      this.loading = false
    })
  },
  mounted () {
  },
  computed: {
  },
  methods: {
    toChannel (n) {
      this.$router.push({ path: `channel/${n}`})
    },
    toHot (v) {
      if(v.content_type === 1) {
        console.log('video')
        this.$router.push({ path: `home/video/${v.id}`})
      }else if(v.content_type === 2) {
        this.$router.push({ path: `home/article/${v.id}`})
      }else if(v.content_type === 3) {
        console.log('audio')
        this.$router.push({ path: `home/audio/${v.id}`})
      }
    },
    loadMore : function(){
      this.currentPage++
      if(this.loadend){
        this.loadend = false;
        getHotContentList(this.currentPage).then((res) => this.hotContentList.push(...res.data.list))
        .then(() => {
          this.loadend = true;
          this.$forceUpdate();
        })
      }
    },
    loadData: function(){
      console.log('loadData')
    },
    goBanner: function(v){
      // window.location.href = v.link;
    }
  }
}
</script>

<style lang="scss" scoped>
  @import 'src/css/mixin';
  @import './home.scss';
</style>
