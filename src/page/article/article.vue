<template>
  <div class="page article">
    <jt-header :header-title="article.teletext_name?article.teletext_name:'图文详情'" :share="share"></jt-header>
    <scroll :pullup="pullup" :pulldown="pulldown" ref="myScroll" :data="article">
      <div class="content">
        <section class="top">
          <img :src="article.image_path" width="100%" alt="">
          <!-- <img @click="back" class="btn-back" src="../../images/article/icon_back.png" width="32" height="32" alt=""> -->
          <!-- <img class="btn-love" src="../../images/article/icon_love.png" width="19" height="16.5" alt="">
          <img class="btn-share" src="../../images/article/icon_share.png" width="17.5" height="16.5" alt=""> -->
        </section>
        <section class="teacher flex">
          <div class="avater">
            <img :src="article.head_pic?article.head_pic:'images/avater.png'" width="40" height="40" alt="avater">
            <img v-show="article.is_cancel_teacher == 1" class="v" src="../../images/article/icon_lecturer_small.png" width="20" height="20" alt="v">
          </div>
          <div class="flexOne">
            <p class="teacher-name">{{article.user_name}}</p>
            <p class="teacher-other">
              <span>{{article.createtime}}</span>
              <img src="../../images/article/icon_seen.png" width="12" alt="seen">
              <span>{{article.look_count}}</span>
            </p>
          </div>
          <!-- <div class="follow">
            + 关注
          </div> -->
        </section>
        <section class="article-con">
          <h1>{{article.teletext_name}}</h1>
          <div class="article-txt" ref="myTxt">
            <div class="txt-con" :class="{true:'close'}[close]" v-html="article.text">
            缺乏运动除了影响健康状况，对人精神也很有影响。有些人白天没精神，晚上睡不着，总是情绪不好，这都是缺少运动的结果。有研究表明：慢跑可以调节人的情绪，让人从忧郁中摆脱出来，是非常有效的情绪调节方法。可见运动对情绪的确影响很大。
                                        ——《全养生》精华导读
            </div>
            <div class="btn-toggle" v-show="show"  @click="toggle">{{msg}}</div>
          </div>
          <div class="answer">
            <img src="../../images/article/prize.png" height="32px" alt="prize">
            <span>答题赚取积土币</span>
          </div>
        </section>
        <div class="divider"></div>
        <!-- 相关推荐 -->
        <related-list :data="recommend_list" v-on:change="change" v-on:click="goDetail"></related-list>
        <div class="divider"></div>
        <!-- 评论 -->
        <comment-list :data="comment_list" :uid="uid"></comment-list>
      </div>
    </scroll>
    <div class="comment flex">
      <input type="text" class="flexOne" placeholder="写评论…">
      <span>发送</span>
    </div>
    <loading :show="loading"></loading>
  </div>
</template>

<script>
import jtHeader from "@/components/jt-header";
import scroll from "@/components/scroll";
import loading from "@/components/loading";
import relatedList from "@/components/related-list";
import commentList from "@/components/comment-list";
import { getTextDetail, getCommentList, getRecommendContent } from "@/service/getData";
import { mapState, mapMutations } from "vuex";
export default {
  // name: 'article',
  data () {
    return {
      article: '', // 图文详情
      comment_list: '', // 评论列表
      recommend_list: '', // 相关推荐
      show: false, // 显示点击打开
      close: false, // 是否收起
      share: true,
      pulldown: true,
      pullup: true,
      loading: true
    }
  },
  components: {
    jtHeader,
    scroll,
    loading,
    relatedList,
    commentList
  },
  computed: {
    ...mapState(["token", "uid"]),
    msg(){
      return this.close?'点击打开':'点击收起'
    },
  },
  created () {
    getTextDetail(this.token, this.uid, this.$route.params.text_id).then(res => {this.article = res.data; this.loading = false;})
    getCommentList(this.token, this.uid, this.$route.params.text_id, 2, 1).then(res => this.comment_list = res.data.comment_list)
    getRecommendContent(this.$route.params.text_id, 2).then(res => this.recommend_list = res.data)
  },
  beforeRouteUpdate (to, from, next) {
    console.log(this)
    this.close = false;
    this.loading = true;
    getTextDetail(this.token, this.uid, to.params.text_id).then(res => {this.article = res.data; this.showMsg(); this.loading = false;})
    getCommentList(this.token, this.uid, to.params.text_id, 2, 1).then(res => this.comment_list = res.data.comment_list)
    getRecommendContent(to.params.text_id, 2).then(res => this.recommend_list = res.data)
  },
  mounted () {
    this.showMsg()
    this.path = this.$route.matched[0].path;
  },
  methods: {
    back: function() {
      this.$router.go(-1)
    },
    // 换一换
    change: function() {
      getRecommendContent(this.$route.params.text_id, 2).then(res => this.recommend_list = res.data)
    },
    // 跳转相关
    goDetail: function(v){
      if(v.type === 1){
        // this.$router.go({path: '/text'})
      }else if(v.type === 2){
        this.$router.replace({ path: `${this.path}/article/${v.id}`})
      }else if(v.type === 3){
        // this.$router.go({path: '/text'})
      }
    },
    // 打开收起
    toggle: function(){
      this.close = !this.close;
    },
    // 判断是否显示'打开收起'
    showMsg(){
      setTimeout(() => {
        var $class = this.$refs.myTxt.className
        var $height = document.querySelector("."+$class).offsetHeight
        console.log($height)
        if($height <= 800){
          this.show = false
        }else{
          this.close = true
          this.show = true
        }
      },300)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/css/mixin";
@import "./article.scss";
</style>
