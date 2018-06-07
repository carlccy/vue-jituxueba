<template>
  <div class="page audio">
    <jt-header :header-title="audio.voice_msg.voice_name?audio.voice_msg.voice_name:'音频详情'" :share="share"></jt-header>
    <scroll :pullup="pullup" :pulldown="pulldown" ref="myScroll" :data="audio">
      <div class="content">
        <section class="top">
          <audio id="audio" ref="audio" :src="audio.voice_msg.voice_path" width="100%" controls="controls" preload="preload"></audio>
          <div class="top-bg"></div>
          <div class="top-btn" :class="{false:'pause'}[playing]" :style="{'backgroundImage': 'url('+audio.voice_msg.image_path+')'}">
            <!-- <img @click="toggle" class="btn-action" src="../../images/audio/icon_play.png" width="30px" alt=""> -->
          </div>
          <div class="top-control">
            <p class="top-date"><span>{{currentTime | format}}</span><span>{{duration | format}}</span></p>
            <div class="top-padding" @click="setProgress">
              <div class="top-progress">
                <div class="progress" :style="{width: progress + '%'}"></div>
              </div>
            </div>
            <div class="top-btns">
              <div class="btn-item" @click="toggle">
                <img v-if="playing" src="../../images/audio/pause.png" alt="pause">
                <img v-else src="../../images/audio/play.png" alt="play">
                <p>播放</p>
              </div>
              <div class="btn-item" @click="prev15">
                <img src="../../images/audio/15p.png" alt="prev15">
                <p>后退</p>
              </div>
              <div class="btn-item" @click="next15">
                <img src="../../images/audio/15n.png" alt="next15">
                <p>前进</p>
              </div>
              <div class="btn-item" @click="star">
                <img v-if="stared" src="../../images/audio/stared.png" alt="stared">
                <img v-else src="../../images/audio/star.png" alt="star">
                <p>收藏</p>
              </div>
            </div>
          </div>
        </section>
        <section class="teacher flex">
          <div class="avater">
            <img :src="audio.avatar?audio.avatar:require('../../images/avater.png')" width="40" height="40" alt="avater">
            <img v-show="audio.is_teacher == 1" class="v" src="../../images/audio/icon_lecturer_small.png" width="20" height="20" alt="v">
          </div>
          <div class="flexOne">
            <p class="teacher-name">{{audio.nickname}}</p>
            <p class="teacher-other">
              <span>{{audio.voice_msg.upload_time}}</span>
              <img src="../../images/audio/icon_seen.png" width="12" alt="seen">
              <span>{{audio.voice_msg.pay_count}}</span>
            </p>
          </div>
        </section>
        <section class="audio-info">{{audio.voice_msg.introduce}}</section>
        <section class="audio-con">
          <div class="answer">
            <img src="../../images/audio/prize.png" height="32px" alt="prize">
            <span>答题赚取积土币</span>
          </div>
        </section>
        <section class="audio-txt">
          <p class="txt-title">音频文本</p>
          <div v-html="audio.voice_msg.text"></div>
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
// import audiojs from './audiojs/audio'
import scroll from "@/components/scroll";
import loading from "@/components/loading";
import jtHeader from "@/components/jt-header";
import commentList from "@/components/comment-list";
import { getAudioDetail, getCommentList } from "@/service/getData";
import { mapState, mapMutations } from "vuex";
export default {
  // name: 'audio',
  data () {
    return {
      audio: {
        voice_msg: ''
      }, // 图文详情
      comment_list: '', // 评论列表
      share: true,
      pulldown: true,
      pullup: true,
      loading: false,
      audioDom: null,
      playing: false, // 正在播放
      currentTime: 0,
      duration: 0,
      progress: 0,
      stared: false // 已收藏
    }
  },
  components: {
    jtHeader,
    loading,
    scroll,
    commentList
  },
  computed: {
    ...mapState(["token", "uid"]),
    // $dom(){
    //   return this.$refs.audio
    // }
  },
  created () {
    this.loading = true;
    getAudioDetail(this.token, this.uid, this.$route.params.audio_id).then(res => {
      this.audio = res.data; 
      this.loading = false;
      this.$nextTick(() => {
        this.init()
      })
    })
    getCommentList(this.token, this.uid, this.$route.params.audio_id, 3, 1).then(res => this.comment_list = res.data.comment_list)
  },
  mounted () {

  },
  methods: {
    init: function() {
      const $audio = this.$refs.audio
      // console.log($audio)

      // $audio.addEventListener('loadedmetadata', () => {
      //   console.log('loadedmetadata')
      // }, false);
      this.duration = $audio.duration
      $audio.addEventListener('timeupdate', (e) => {
        // console.log(e.target.currentTime)
        // console.log(e.target.duration)
        this.currentTime = Math.floor(e.target.currentTime);
        this.duration = Math.floor(e.target.duration);
        this.progress = (this.currentTime / this.duration * 100).toFixed(2)
      });
    },
    toggle: function() {
      const $audio = this.$refs.audio
      if($audio.paused){
        $audio.play()
        this.playing = true
      }else{
        $audio.pause()
        this.playing = false
      }
    },
    next15: function() {
      const $audio = this.$refs.audio
      if($audio.currentTime + 15 >= this.duration){
        $audio.currentTime = this.duration
      }else{
        $audio.currentTime += 15
      }
    },
    prev15: function() {
      const $audio = this.$refs.audio
      if($audio.currentTime - 15 <= 0){
        $audio.currentTime = 0
      }else{
        $audio.currentTime -= 15
      }
    },
    star: function() {
      this.stared = !this.stared
    },
    setProgress: function(e){
      const $audio = this.$refs.audio
      const percents = (e.offsetX / $audio.offsetWidth * 100)
			$audio.currentTime = parseInt($audio.duration * percents / 100);
    }
  },
  filters: {
    'format': function(date) {
      const newD = Math.floor(date * 1) || 0;
      if(newD != 0){
        var m = Math.floor(newD/60);
        var s = newD - m*60
        if(m < 10){
          m = '0'+m;
        }
        if(s < 10){
          s = '0'+s
        }
        return m+':'+s
      }else{
        return '00:00'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/css/mixin";
@import "./audio.scss";
</style>
