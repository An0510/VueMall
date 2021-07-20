<template>
  <div class="user-box">
    <s-header :title="'我的'"></s-header>
    <div class="user-info">
      <div class="info">
        <img src="//s.weituibao.com/1583583975067/user-graduate%20(1).png" alt="">
        <div class="user-desc">
          <span>昵称：{{user.nickName}}</span>
          <span>登录名：{{ user.loginName }}</span>
          <span class="name">个性签名：{{ user.introduceSign }}</span>
        </div>
      </div>
    </div>
    <ul class="user-list">
      <li>
        <span>我的订单</span>
        <span class="iconfont icon-qianjin"></span>
      </li>
      <li>
        <span>账号管理</span>
        <span class="iconfont icon-qianjin"></span>
      </li>
      <li>
        <span>地址管理</span>
        <span class="iconfont icon-qianjin"></span>
      </li>
      <li>
        <span>关于我们</span>
        <span class="iconfont icon-qianjin"></span>
      </li>
    </ul>
  </div>

</template>

<script>
import sHeader from '@/components/SimpleHeader'
import {getUserInfo} from "@/service/user";
export default {
  name: "User",
  components:{
    sHeader
  },
  data(){
    return {
      user:{}
    }
  },
  async mounted(){
    //获取用户信息
    const { data } = await getUserInfo();
    //赋值给user
    this.user = data
  }
}
</script>

<style lang="less" scoped>
@import '../common/style/mixin';
.user-box {

  .user-info {
    width: 94%;
    margin: 10px;
    height: 115px;
    background: linear-gradient(90deg, @primary, #51c7c7);
    box-shadow: 0 2px 5px #269090;
    border-radius: 6px;
    margin-top: 50px;
    .info {
      position: relative;
      display: flex;
      width: 100%;
      height: 100%;
      padding: 25px 20px;
      .boxSizing();
      img {
        .wh(60px, 60px);
        border-radius: 50%;
        margin-top: 4px;
      }
      .user-desc {
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        line-height: 20px;
        font-size: 14px;
        color: #fff;
        span {
          color: #fff;
          font-size: 14px;
          padding: 2px 0;
        }
      }
      .account-setting {
        position: absolute;
        top: 10px;
        right: 20px;
        font-size: 13px;
        color: #fff;
        .van-icon-setting-o {
          font-size: 16px;
          vertical-align: -3px;
          margin-right: 4px;
        }
      }
    }
  }
  .user-list{
    width: 90%;
    margin: 25px;
    li:hover{
      color:@primary
    }
    li{
      margin-top: 15px ;
      height: 30px;
      line-height: 30px;
      border-bottom: 1px solid gray;
      cursor:pointer;
      display: flex;
      justify-content: space-between;
      span:nth-child(1){
        font-size: 20px;
      }
      span:nth-child(2){
        font-size:20px;
      }
    }
  }
}
</style>