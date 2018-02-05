<template>
  <div class="page home">
    <jt-header slot="header" go-back="0">
      <div class="flex">
        <div @click="SHOW_LOGIN">积土学吧</div>
        <div class="flexOne">搜索课程</div>
        <div @click="outLogin">消息</div>
      </div>
    </jt-header>
    <div class="wrapper" ref="home">
      <div class="content">
          <!-- <h1>{{msg}} home</h1>
          <section>
            <a @click="getInfo">loginStatus</a>
          </section>
          <section>
            <router-link to="login">Login</router-link>
          </section> -->
          <!-- <section>
            <a @click="outLogin">outLogin</a>
          </section> -->
          <swiper :options="bannerOptions" ref="myBanner" id="banner">
            <swiper-slide v-for="item in banners" :key="item.name" class="banner-item">
              <img :src="item.banner" alt="" width="100%">
            </swiper-slide>
            <div class="swiper-pagination"  slot="pagination"></div>
          </swiper>
          <nav class="nav-list clearfix">
            <div class="nav-item" @click="toChannel(50)">
              <div class="nav-img">
                <img src="../../images/home/icon_c_story.png" width="100%" alt="国学故事">
              </div>
              <p>国学故事</p>
            </div>
            <div class="nav-item" @click="toChannel(51)">
              <div class="nav-img">
                <img src="../../images/home/icon_c_keep.png" width="100%" alt="国医养生">
              </div>
              <p>国医养生</p>
            </div>
            <div class="nav-item" @click="toChannel(52)">
              <div class="nav-img">
                <img src="../../images/home/icon_happy_post.png" width="100%" alt="快乐驿站">
              </div>
              <p>快乐驿站</p>
            </div>
            <div class="nav-item" @click="toChannel(53)">
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

          <div class="recommend-top flex">
            <div class="flexOne text-right"><img src="../../images/home/head_styles_l.png" alt=""></div>
            <h1>热门推荐</h1>
            <div class="flexOne text-left"><img src="../../images/home/head_styles_r.png" alt=""></div>
          </div>

          <div class="recommend-item" v-for="item in hotContentList" :key="item.id" @click="toHot(item)" :class="{true:'answerd'}[item.answer_status == 2]">
            <div class="image-path">
              <img :src="item.image_path" err-src="../../images/home/content_placeholder.png" alt="" width="100%">
            </div>
            <p class="item-title inlineShow">
              {{item.content_name}}
            </p>
            <p class="item-intro two-line" v-html="item.introduce">
            </p>
            <div class="btns flex">
              <div class="text-left btn-left flexOne">
                <img src="../../images/home/icon_video.png" alt="视频" v-if="item.content_type == 1">
                <img src="../../images/home/icon_graphic.png" alt="图文" v-if="item.content_type == 2">
                <img src="../../images/home/icon_audio.png" alt="音频" v-if="item.content_type == 3">
                <!-- <span v-if="item.content_type == 1">视频</span>
                <span v-if="item.content_type == 2">图文</span>
                <span v-if="item.content_type == 3">音频</span> -->
                <span>{{item.channel_name}}</span>
                <img class="head_pic" :src="item.head_pic" err-src="../../images/home/mune_nav_size.png" alt="作者">
                <span>{{item.user_name}}</span>
              </div>
              <div class="text-right btn-right">
                <img src="../../images/home/icon_seen.png" alt="浏览">
                <span>{{item.look_count}}</span>
                <img src="../../images/home/icon_comment.png" alt="评论">
                <span>{{item.comment_count}}</span>
              </div>
            </div>
          </div>
          <div class="loadmore"><img src="../../images/refresh.gif">正在加载</div>
      </div>
    </div>
    <jt-footer slot="footer" active="首页"></jt-footer>
  </div>
</template>

<script>
import jtHeader from '@/components/jt-header'
import jtFooter from '@/components/jt-footer'
import BScroll from "better-scroll"
import { swiper, swiperSlide } from "vue-awesome-swiper";
import { getBannerList, getHotContentList } from '@/service/getData'

import http from '@/service/http'
import {mapState, mapMutations, mapActions} from 'vuex'
// import login from '@/components/login'

export default {
  name: 'home',
  data () {
    return {
      msg: 'welcome to',
      banners: '',
      bannerOptions: {},
      hotContentList: '',
      currentPage: 1,
      loadend: true,
      scrollOption: {
        direction: 'vertical',
        slidesPerView: 'auto',
        freeMode: true,
        mousewheel: true,
        lazy: {
          loadPrevNext: true,
        },
        on: {
          'transitionEnd': this.scrollTransitionEnd
        }
      }
    }
  },
  components: {
    jtHeader,
    jtFooter,
    // login
  },
  mounted () {
    this.getToken().then(() => {
      this.getUserInfo()
      this.getInfo()
    })
    getBannerList().then((res) => this.banners = res.data)
    getHotContentList().then((res) => this.hotContentList = res.data.list)
      this.scroll = new BScroll(this.$refs.home, {})
  },
  computed: {
    ...mapState([
      'token', 'uid', 'userInfo'
    ]),
    /* scrollSwiper() {
      return this.$refs.myScroll.swiper;
    }, */
  },
  methods: {
    ...mapMutations([
      'OUT_LOGIN', 'SHOW_LOGIN'
    ]),
    ...mapActions([
      'getToken', 'getUserInfo'
    ]),
    /* async getBanner () {
      let res = await http.post('/Banner/bannerList', {
        deviceType: 1
      })
      this.banners = res.data
    }, */
    async getInfo () {
      if (!this.token) {
        console.log('未登录')
      } else {
        console.log('已登录')
      }
    },
    outLogin () {
      this.OUT_LOGIN()
    },
    toChannel () {
      
    },
    toHot () {

    },
    scrollTransitionEnd () {
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
  }
}
</script>

<style lang="scss" scoped>
  @import 'src/css/mixin';
  .home {
    a{
      padding: 5px 15px;
      background: #fff;
      border-radius: 5px;
      border: 1px solid #ddd;
    }
    #banner{
      min-height: 150px;
    }
    .scroll{
      width: 100%;
      height: 50px;;
    }
    .wrapper{
      width: 100%;
      height: 100%;
    }
    .content{
      padding: 44px 0 50px;
    }
    .banner-item > img{
      display: block;
    }
    .nav-list{
      margin-bottom: 10px;
      height: 110px;
      background-color: #fff;

      .nav-item {
        float: left;
        width: 20%;
        padding: 20px 0;
        text-align: center;

        .nav-img {
          margin: 0 auto;
          margin-bottom: 10px;
          width: 40px;
          height: 40px;
          overflow: hidden;
        }
        p {
          font-size: 12px;
          color: #666;
        }
      }
    }

    .recommend-top {
        height: 48px;
        line-height: 48px;
        align-items: center;
        background-color: #fff;
        
        img{
          height: 3px;
        }
        
        h1 {
          margin: 0 15px;
          font-size: 15px;
          color: #333;
          text-align: center;
        }
    }

    .recommend-item{
      padding: 0 15px 30px;
      background-color: #fff;

      .image-path{
        position: relative;
        padding-bottom: 40%;
        width: 100%;
        height: 0;
        overflow: hidden;
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
        background-color: #f2f6f2;
      }
      .item-title{
        margin: 4px 0;
        font-size: 17px;
      }
      .item-intro{
        margin: 4px 0;
        font-size: 14px;
        line-height: 21px;
        max-height: 42px;
        color: #999;
      }
      .head_pic{
        border-radius: 50%;
      }
      .btns{
        height: 20px;
        line-height: 20px;
      }
      .answerd .item-title,
      .answerd .item-intro,
      .answerd .btns{
        color: #999;
      }
      .btn-left{
        font-size: 13px;
      }
      .btn-left img{
        width: 14px;
        height: 14px;
        vertical-align: middle;
      }
      .btn-left span,
      .btn-right span{
        margin-right: 10px;
        vertical-align: middle;
      }
      .btn-right{
        font-size: 11px;
      }
      .btn-right img{
        margin-left: 10px;
        width: 12px;
        vertical-align: middle;
      }
    }
    .loadmore{
      line-height: 40px;
      text-align: center;
      vertical-align: middle;
      font-size: 14px;

      img{
        margin: 0 5px;
        width: 16px;
        vertical-align: middle;
      }
    }
        
  }
</style>
