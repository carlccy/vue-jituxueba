<template>
  <div class="page video">
    <jt-header :header-title="video.lession_name?video.lession_name:'视频详情'" :share="share"></jt-header>
    <scroll :pullup="pullup" :pulldown="pulldown" ref="myScroll" :data="video">
      <div class="content">
        <section class="top" :style="{'backgroundImage': 'url('+video.picture_path+')'}">
          <video :src="video.video_path" width="100%" controls="controls" autoplay="autoplay"></video>
        </section>
        <section class="teacher flex">
          <div class="avater">
            <img :src="video.teacher.avatar" width="40" height="40" alt="avater">
            <img v-show="video.teacher.is_teacher == 1" class="v" src="../../images/video/icon_lecturer_small.png" width="20" height="20" alt="v">
          </div>
          <div class="flexOne">
            <p class="teacher-name">{{video.teacher.teacher_name}}</p>
            <p class="teacher-other">
              <span>{{video.upload_time}}</span>
              <img src="../../images/video/icon_seen.png" width="12" alt="seen">
              <span>{{video.visits}}</span>
            </p>
          </div>
          <!-- <div class="follow">
            + 关注
          </div> -->
        </section>
        <section class="video-info">{{video.introduce}}</section>
        <section class="video-con">
          <div class="answer">
            <img src="../../images/video/prize.png" height="32px" alt="prize">
            <span>答题赚取积土币</span>
          </div>
        </section>
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
import scroll from "@/components/scroll";
import loading from "@/components/loading";
import jtHeader from "@/components/jt-header";
import commentList from "@/components/comment-list";
import { getVideoDetail, getCommentList } from "@/service/getData";
import { mapState, mapMutations } from "vuex";
export default {
  // name: 'video',
  data () {
    return {
      video: '', // 图文详情
      comment_list: '', // 评论列表
      share: true,
      pulldown: true,
      pullup: true,
      loading: true
    }
  },
  components: {
    jtHeader,
    loading,
    scroll,
    commentList
  },
  computed: {
    ...mapState(["token", "uid"])
  },
  created () {
    getVideoDetail(this.uid, this.$route.params.video_id).then(res => {this.video = res.data; this.loading = false;})
    getCommentList(this.token, this.uid, this.$route.params.video_id, 1, 1).then(res => this.comment_list = res.data.comment_list)
  },
  methods: {
    /* back: function() {
      this.$router.go(-1)
    }, */
    // 跳转相关
    goDetail: function(v){
      if(v.type === 1){
        // this.$router.go({path: '/text'})
      }else if(v.type === 2){
        this.$router.replace({ path: `/video/${v.id}`})
      }else if(v.type === 3){
        // this.$router.go({path: '/text'})
      }
    },
  }
}
</script>

<style lang="scss" scoped>
@import "src/css/mixin";
@import "./video.scss";
</style>
