<template>
  <section class="list">
    <div class="list-head">
      <i class="line"></i>
      <h3>最新评论</h3>
      <img src="../images/home/icon_more.png" width="7" height="15" alt="more">
    </div>
    <div class="list-body">
      <div class="list-item flex" v-for="item in data">
        <img class="item-pic" :src="item.head_pic?item.head_pic: require('../images/logo.png')" width="40" height="40" alt="headpic">
        <div class="item-right flexOne">
          <p class="flex"><span class="item-name">{{item.nickname}}</span><small class="item-date">{{item.create_time}}</small><span v-show="item.user_id == uid">删除</span></p>
          <p class="item-info">{{item.content}}</p>
        </div>
      </div>
      <div v-show="!data.length" class="no-data">
        <img src="../images/sofa.png" width="40" height="40" alt="sofa">
        <span>客官请坐~</span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'comment-list',
  data () {
    return {
      todayRecommand: '',
    }
  },
  props: ['data', 'uid'],
  methods: {
    
  }
}
</script>

<style lang="scss" scoped>
.list {
  background-color: #fff;
  .list-head {
    padding: 0 15px;
    height: 44px;
    display: flex;
    align-items: center;
    .line {
      margin-right: 7px;
      width: 3px;
      height: 15px;
      background-color: #1d9ff5;
    }
    h3 {
      flex: 1;
      font-size: 16px;
      letter-spacing: -0.3px;
      color: #666;
    }
    span {
      font-size: 16px;
      color: #999;
    }
  }
  .list-body {
    padding: 0 15px 15px 15px;
    .list-item {
      align-items: center;
      .item-pic{
        margin-top: 15px;
        margin-right: 15px;
        align-self: flex-start;
        border-radius: 50%;
      }
      .item-right{
        padding: 15px 0;
        border-bottom: 1px solid #e3e3e3;
        .item-name{
          font-size: 15px;
          color: #333;
        }
        small{
          flex: 1;
          font-size: 12px;
          color: #999;
          margin-left: 15px;
        }
        span{
          color: #1d9ff5;
          font-size: 13px;
        }
        .item-info{
          font-size: 14px;
          color: #666;
          line-height: 20px;
        }
      }
    }
    .no-data{
      line-height: 100px;
      text-align: center;
      img,span{
        opacity: .7;
        vertical-align: middle;
      }
    }
  }
}
</style>


