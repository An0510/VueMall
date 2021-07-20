<template>
  <div class="home">
    <header class="home-header wrap" :class="{'active' : headerScroll}">
      <router-link tag="i" to="./category"><i class="iconfont icon-weibiaoti12"></i></router-link>
      <div class="header-search">
        <span class="app-name">商城</span>
        <i class="iconfont icon-sousuo1"></i>
        <router-link tag="span" class="search-title" to="./product-list">山河无恙，人间皆安</router-link>
      </div>
      <router-link class="login" tag="span" to="./login" v-if="!isLogin">登录</router-link>
      <router-link class="login" tag="span" to="./user" v-else>
        <i class="iconfont icon-wode1"></i>
      </router-link>
    </header>
<!--    轮播-->
    <Swiper :list="swiperList"></Swiper>
<!--    中部分类菜单-->
    <div class="category-list">
      <div v-for="item in categoryList" v-bind:key="item.categoryId">
        <img :src="item.imgUrl">
        <span>{{item.name}}</span>
      </div>
    </div>
<!--    新品上线、热门商品、最新推荐-->
    <div class="good">
      <header class="good-header">新品上线</header>
      <div class="good-box">
        <div class="good-item" v-for="item in newGoodses" :key="item.goodsId" @click="goToDetail(item)">
          <img :src="prefix(item.goodsCoverImg)" alt="">
          <div class="good-desc">
            <div class="title">{{ item.goodsName }}</div>
            <div class="price">¥ {{ item.sellingPrice }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="good">
      <header class="good-header">热门商品</header>
      <div class="good-box">
        <div class="good-item" v-for="item in hots" :key="item.goodsId" @click="goToDetail(item)">
          <img :src="prefix(item.goodsCoverImg)" alt="">
          <div class="good-desc">
            <div class="title">{{ item.goodsName }}</div>
            <div class="price">¥ {{ item.sellingPrice }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="good" :style="{ paddingBottom: '100px'}">
      <header class="good-header">最新推荐</header>
      <div class="good-box">
        <div class="good-item" v-for="item in recommends" :key="item.goodsId" @click="goToDetail(item)">
          <img :src="prefix(item.goodsCoverImg)" alt="">
          <div class="good-desc">
            <div class="title">{{ item.goodsName }}</div>
            <div class="price">¥ {{ item.sellingPrice }}</div>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
import { getLocal } from '@/common/js/utils'
import swiper from '@/components/Swiper'
import { getHome } from '@/service/home'
import { Toast } from 'vant'
import Swiper from "@/components/Swiper";

export default {
  name: 'Home',
  components: {Swiper},
  data() {
    return {
      isLogin: false,
      //轮播图
      swiperList:[],
      //中部分类
      categoryList: [
        {
          name: '新蜂超市',
          imgUrl: '//s.weituibao.com/1583585285461/cs.png',
          categoryId: 100001
        }, {
          name: '新蜂服饰',
          imgUrl: '//s.weituibao.com/1583585285468/fs.png',
          categoryId: 100003
        }, {
          name: '全球购',
          imgUrl: '//s.weituibao.com/1583585285470/qq.png',
          categoryId: 100002
        }, {
          name: '新蜂生鲜',
          imgUrl: '//s.weituibao.com/1583585285472/sx.png',
          categoryId: 100004
        }, {
          name: '新蜂到家',
          imgUrl: '//s.weituibao.com/1583585285467/dj.png',
          categoryId: 100005
        }, {
          name: '充值缴费',
          imgUrl: '//s.weituibao.com/1583585285465/cz.png',
          categoryId: 100006
        }, {
          name: '9.9元拼',
          imgUrl: '//s.weituibao.com/1583585285469/pt.png',
          categoryId: 100007
        }, {
          name: '领劵',
          imgUrl: '//s.weituibao.com/1583585285468/juan.png',
          categoryId: 100008
        }, {
          name: '省钱',
          imgUrl: '//s.weituibao.com/1583585285471/sq.png',
          categoryId: 100009
        }, {
          name: '全部',
          imgUrl: '//s.weituibao.com/1583585285470/qb.png',
          categoryId: 100010
        }
      ],
      //新品上线、热门商品、最新推荐
      hots:[],
      newGoodses:[],
      recommends:[],
      // 滚动搜索框变色
      headerScroll: false,
    }
  },
  async mounted() {
    const token = getLocal('token')
    if (token) {
      this.isLogin = true
    }
    //加载中动画
    Toast.loading({
      message:'加载中...',
      forbidClick:true
    });
    //监听搜索框
    window.addEventListener('scroll', this.pageScroll)
    const { data } = await getHome()
    //获取轮播图list
    this.swiperList = data.carousels
    // 获取新品上线、热门商品、最新推荐的list
    this.newGoodses = data.newGoodses // 新品上线
    this.hots = data.hotGoodses // 热门商品
    this.recommends = data.recommendGoodses // 最新推荐
    // 数据请求结束，清楚弹窗
    Toast.clear()
  },
  methods:{
    pageScroll(){
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      scrollTop > 100 ? this.headerScroll = true : this.headerScroll = false
    }
  }
}
</script>

<style lang="less" scoped>
@import '../common/style/mixin';
.home {
  .good {
    .good-header {
      background: #f9f9f9;
      height: 50px;
      line-height: 50px;
      text-align: center;
      color: @primary;
      font-size: 16px;
      font-weight: 500;
    }
    .good-box {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      .good-item {
        box-sizing: border-box;
        width: 50%;
        border-bottom: 1PX solid #e9e9e9;
        padding: 10px 0;
        img {
          display: block;
          width: 120px;
          margin: 0 auto;
        }
        .good-desc {
          text-align: center;
          font-size: 14px;
          padding: 10px 0;
          .title {
            color: #222333;
          }
          .price {
            color: @primary;
          }
        }
        &:nth-child(2n + 1) {
          border-right: 1PX solid #e9e9e9;
        }
      }
    }
  }
  .category-list {
    display: flex;
    //flex-shrink: 0;
    //规定灵活的项目在必要的时候拆行或拆列。
    flex-wrap: wrap;
    width: 100%;
    padding-bottom: 13px;
    div {
      display: flex;
      flex-direction: column;
      width: 20%;
      text-align: center;
      img {
        .wh(40px, 40px);
        margin: 13px auto 8px auto;
      }
    }
  }
  .home-header {
    position: fixed;
    left: 0;
    top: 0;
    .wh(100%, 50px);
    .fj();
    line-height: 50px;
    padding: 0 15px;
    .boxSizing();
    font-size: 15px;
    color: #fff;
    z-index: 10000;
    .icon-weibiaoti12 {
      color: @primary;
    }
    //搜索框变色
    &.active {
      background: @primary;
      .nbmenu2 {
        color: #fff;
      }
      .login {
        color: #fff;
      }
    }

    .header-search {
      display: flex;
      .wh(74%, 20px);
      line-height: 20px;
      margin: 10px 0;
      padding: 5px 0;
      color: #232326;
      background: rgba(255, 255, 255, .7);
      border-radius: 20px;
      .app-name {
        padding: 0 10px;
        color: @primary;
        font-size: 20px;
        font-weight: bold;
        border-right: 1px solid #666;
      }
      .icon-sousuo1 {
        padding: 0 10px;
        font-size: 13px;
      }
      .search-title {
        font-size: 12px;
        color: #666;
        line-height: 21px;
      }
    }
    .login {
      color: @primary;
      line-height: 52px;
      .icon-wode1 {
        font-size: 25px;
        vertical-align: -3px;
      }
    }

  }
}
</style>
