<template>
  <div class="nav-bar">
    <ul class="nav-list">
      <router-link tag="li" class="nav-list-item active" to="home">
        <span class="iconfont icon-shouye"></span>
        <span>首页</span>
      </router-link>
      <router-link tag="li" class="nav-list-item" to="category">
        <span class="iconfont icon-fenlei"></span>
        <span>分类</span>
      </router-link>
      <router-link tag="li" class="nav-list-item" to="cart">
        <van-icon class="cartCount" :badge="!count ? '' : count" />
        <span class="iconfont icon-gouwudai"  name="shopping-cart-o" :info="!count ? '' : count" ></span>
        <span>购物车</span>
      </router-link>
      <router-link tag="li" class="nav-list-item" to="user">
        <span class="iconfont icon-wode"></span>
        <span>我的</span>
      </router-link>
    </ul>
  </div>
</template>

<script>
import {getLocal} from "@/common/js/utils";

export default {
  data(){
    return{}
  },
  mounted(){
    const token = getLocal('token')
    if(token){
      this.$store.dispatch('updateCart')
    }
  },
  computed:{
    count(){
      return this.$store.state.cartCount
    }
  }
}
</script>

<style lang="less" scoped >
@import '../common/style/mixin';
.nav-bar{
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 5px 0;
  z-index: 1000;
  background: #fff;
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
  .nav-list {
    width: 100%;
    .fj();
    flex-direction: row;
    padding: 0;
    .nav-list-item {
      display: flex;
      flex: 1;
      flex-direction: column;
      text-align: center;
      color: #666;
      //点到哪个哪个就变色
      &.router-link-active {
        color: @primary;
      }
      .cartCount{
        right:36px
      }
      i {
        text-align: center;
        font-size: 22px;
      }
      span{
        font-size: 12px;
      }
    }
  }
}
</style>