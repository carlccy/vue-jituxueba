<template>
  <section class="page user">
    <scroll :pullup="pullup" :pulldown="pulldown"> 
      <div class="content">
        <div class="top" v-show="token">
          <div class="set"><img @click="toPage('user')" src="../../images/user/icon_setting.png" alt="设置"></div>
          <div class="user">
            <div class="user-headpic" @click="toPage('useredit')">
              <img class="user-avatar" :src="user.head_pic" width="100%" height="100%" alt="头像">
              <img class="user-is-teacher" v-show="user.is_teacher_status == 1" src="../../images/user/icon_lecturer_small.png" alt="v">
            </div>
            <div class="user-info">
              <p class="user-name"> {{user.nickname ? user.nickname : user.username}}</p>
              <p class="user-fans">
                <span name="myfollow({teacher_uid: user.teacher_id})">关注 {{user.follow_sum}} </span>
                <span>&nbsp;|&nbsp;</span>
                <span name="myfans({teacher_uid: user.teacher_id})"> 粉丝 {{user.fans}}</span>
              </p>
            </div>
          </div>
        </div>
        <div class="top" v-show="!token">
          <div class="set" @click="toPage('user')"><img src="../../images/user/icon_setting.png" alt="设置"></div>
          <div class="login"><router-link to="user/login">登录 / 注册</router-link></div>
          <p class="login-intro">登录后内容学习有奖</p>
        </div>
        <div class="money flex" v-show="token">
          <div class="flexOne" @click="toPage('jituamount')"><span>积土币</span><em :class="{true:'dot',false:''}[user.jitu_amount_dot]" >{{user.jitu_amount}}</em></div>
          <!-- <div class="line"></div> -->
          <div class="flexOne" @click="toPage('coupon')"><span>优惠券</span><em :class="{true:'dot',false:''}[user.notice_dot]" >{{user.cou_count}}</em></div>
          <div class="flexOne" @click="toPage('jiangliCoupon')"><span>奖励券</span><em :class="{true:'dot',false:''}[user.reward_notice_dot]">{{user.rewarc_count?user.rewarc_count:0}}</em></div>
        </div>
        <div class="money flex" v-show="!token">
          <div class="flexOne" @click="toPage('jituamount')"><span>积土币</span><em>--</em></div>
          <!-- <div class="line"></div> -->
          <div class="flexOne" @click="toPage('coupon')"><span>优惠券</span><em>--</em></div>
          <div class="flexOne" @click="toPage('jiangliCoupon')"><span>奖励券</span><em>--</em></div>
        </div>

        <div class="list" @click="toPage('sign')">
          <img class="list-icon" src="../../images/user/icon_sign.png" width="20" height="20" alt="">
          <p class="list-name">点击签到</p>
          <p class="list-introduce">
              <span v-if="user.today_check_in">今日已签到</span>
              <span v-else>每日签到即送0.1积土币</span>
              <img class="icon-enter" src="../../images/user/icon_more.png" width="8" height="14" alt="">
          </p>
        </div>
        <div class="list" @click="toPage('sign')">
          <img class="list-icon" src="../../images/user/icon_prizes.png" width="20" height="20" alt="">
          <p class="list-name">做任务赢奖励</p>
          <p class="list-introduce">
              <img class="icon-enter" src="../../images/user/icon_more.png" width="8" height="14" alt="">
          </p>
        </div>
        <div class="list" @click="toPage('sign')">
          <img class="list-icon" src="../../images/user/icon_ambassador.png" width="20" height="20" alt="">
          <p class="list-name">推广大使</p>
          <p class="list-introduce">
              <img class="icon-enter" src="../../images/user/icon_more.png" width="8" height="14" alt="">
          </p>
        </div>
        <div class="list" @click="toPage('sign')">
          <img class="list-icon" src="../../images/user/icon_record.png" width="20" height="20" alt="">
          <p class="list-name">学习记录</p>
          <p class="list-introduce">
              <img class="icon-enter" src="../../images/user/icon_more.png" width="8" height="14" alt="">
          </p>
        </div>
        <div class="list" @click="toPage('sign')">
          <img class="list-icon" src="../../images/user/icon_collect.png" width="20" height="20" alt="">
          <p class="list-name">活动中心</p>
          <p class="list-introduce">
              <img class="icon-enter" src="../../images/user/icon_more.png" width="8" height="14" alt="">
          </p>
        </div>

        <button v-show="token" type="button" class="sign-out" @click="OUT_LOGIN">退出登录</button>
      </div>
    </scroll>
    <jt-footer active="我的"></jt-footer>
    <transition name="router-slid" mode="out-in">
      <router-view></router-view>
    </transition>
  </section>
</template>

<script>
import jtFooter from "@/components/jt-footer";
import scroll from "@/components/scroll";
import { getUser } from "@/service/getData";
import { mapState, mapMutations } from "vuex";
export default {
  name: "user",
  data() {
    return {
      user: "",
      pulldown: true,
      pullup: true
    };
  },
  computed: {
    ...mapState(["token", "uid"])
  },
  created () {
    },
  mounted () {
    this.token && getUser().then(res => {
      this.user = res.data
    })
  },
  beforeRouteUpdate (to, from, next) {
    this.token && getUser().then(res => {
      this.user = res.data
    })
    next()
  },
  components: {
    jtFooter,
    scroll
  },
  methods: {
    ...mapMutations(["OUT_LOGIN"]),
    toPage: function() {

    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/css/mixin";
@import "./user.scss";
</style>
