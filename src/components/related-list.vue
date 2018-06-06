<template>
  <div class="list">
    <div class="list-head">
      <i class="line"></i>
      <h3>相关推荐</h3>
      <img @click="change" src="../images/home/icon_change.png" width="15" height="15" alt="change">
      <span>换一换</span>
    </div>
    <div class="list-body">
      <div class="list-item flex" v-for="item in data" @click="goRelated(item)">
        <div class="list-pic">
          <img :src="item.image_path" width="100%" height="100%" alt="picture">
        </div>
        <div class="list-txt flexOne">
          <p class="txt-title">{{item.teletext_name}}</p>
          <p class="txt-con" v-html="item.introduce"></p>
          <!-- <div class="actions">
              <div class="action">
              <img src="../images/home/icon_seen.png" width="12" height="10" alt="">
              <span>{{item.look_count}}</span>
              </div>
              <div class="action">
              <img src="../images/home/icon_comment.png" width="10" height="10" alt="">
              <span>{{item.comment_count}}</span>
              </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getHotContentList } from '@/service/getData'
export default {
  name: 'related-list',
  data () {
    return {
    }
  },
  props: ['data'],
  mounted () {
  },
  methods: {
    change: function(){
      this.$emit('change')
    },
    goRelated: function(v){
      if(v.content_type === 1){
        // this.$emit('click', {type: v.content_type, id: v.teletext_id})
      }else if(v.content_type === 2){
        this.$emit('click', {type: v.content_type, id: v.teletext_id})
      }else if(v.content_type === 3){
        // this.$emit('click', {type: v.content_type, id: v.teletext_id})
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/css/mixin";
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
    h3{
      flex: 1;
      font-size: 16px;
      letter-spacing: -0.3px;
      color: #666;
    }
    span{
      font-size: 16px;
      color: #999;
    }
  }
  .list-body{
    padding: 0 15px 15px 15px;
    .list-item{
      margin-bottom: 15px;
      display: flex;
      align-items: center;
      border-radius: 5px;
      background-color: #fff;
      box-shadow: 0px 1px 10px 0 rgba(0, 0, 0, 0.15);
      overflow: hidden;
      .list-pic{
        width: 150px;
        height: 90px;
        overflow: hidden;
      }
      .list-txt{
        // flex: 1;
        padding: 0 10px;
        .txt-title{
          font-size: 15px;
          color: #666;
          @include limit(2);
        }
        .txt-con{
          // margin: 10px 0 17px;
          margin-top: 5px;
          font-size: 14px;
          color: #999;
          line-height: 19px;
          max-height: 38px;
          overflow: hidden;
          @include limit(2);
        }
        .actions{
          display: flex;
          align-items: center;
          .action{
            flex: 1;
            display: flex;
            align-items: center;
            font-size: 11px;
            color: #999;
            img{
              vertical-align: middle;
              margin-right: 5px;
            }
          }
        }
      }
    }
  }
}
</style>


