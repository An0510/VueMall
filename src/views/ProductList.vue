<template>
  <div class="product-list-wrap">
    <div class="product-list-content">
      <header class="category-header wrap">
        <i class="iconfont icon-fanhui" @click="goBack"></i>
        <div class="header-search">
          <i class="iconfont icon-sousuo1"></i>
          <input
              type="text"
              class="search-title"
              v-model="keyword"/>
        </div>
        <span class="search-btn" @click="getSearch">搜索</span>
      </header>
      <van-tabs type="card" color="#1baeae" @click="changeTab"  class="vantabs">
        <van-tab title="推荐" name=""></van-tab>
        <van-tab title="新品" name="new"></van-tab>
        <van-tab title="价格" name="price"></van-tab>
      </van-tabs>
    </div>
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh" class="product-list-refresh">
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            @offset="300"
        >
          <!-- <p v-for="item in list" :key="item">{{ item }}</p> -->
          <div class="product-item" v-for="(item, index) in productList" :key="index" @click="productDetail(item)">
            <img :src="prefix(item.goodsCoverImg)" />
            <div class="product-info">
              <p class="name">{{item.goodsName}}</p>
              <p class="subtitle">{{item.goodsIntro}}</p>
              <span class="price">￥ {{item.sellingPrice}}</span>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { search } from '../service/goods'
export default {
  name: "ProductList",
  data(){
    return{
      keyword:this.$route.query.keyword || '',
      refreshing: false, // 是否是下拉刷新
      loading: false, //下拉加载的时候显示是否显示加载中
      finished: false, // 还有没有没有更多
      productList: [], // 列表数据
      totalPage: 0, // 页码总数
      page: 1, // 页码
      orderBy: ''
    }
  },
  methods:{
    //搜索
    getSearch(){
      this.onRefresh()
    },
    // 改变标签页 推荐/新品/价格
    changeTab(name,title){
      this.orderBy = name
      this.onRefresh()
    },
    onRefresh(){
      //改变标签页或搜索了
      this.refreshing = true
      this.finished = false
      this.loading = true
      this.page = 1
      this.onLoad()
    },
    // 滚动或者下拉刷新的时候加载onLoad
    onLoad() {
      // 第一次搜索或者改变标签页
      if (this.refreshing) {
        this.productList = [];
        this.refreshing = false;
      }
      // 滚动加载页数小于总页数时
      if (!this.refreshing && this.page < this.totalPage) {
        this.page = this.page + 1
      }
      this.init()
    },
    async init() {
      // categoryId是用来分类页直接筛选的
      const {categoryId, from} = this.$route.query
      // console.log(this.$route.query,categoryId,from)
      if (!categoryId && !this.keyword) {
        this.finished = true
        this.loading = false
        return
      }
      // 通过axios请求到数据 data里面有很多数据，data:{list}代表获取其中的list数据
      const {data, data: {list}} = await search({
        pageNumber: this.page,
        goodsCategoryId: categoryId,
        keyword: this.keyword,
        orderBy: this.orderBy
      })
      //拼接
      this.productList = this.productList.concat(list)
      // 获取总页数
      this.totalPage = data.totalPage
      // 加载完毕
      this.loading = false
      // 已经完全读取完了，最下面显示finished-text
      if (this.page >= data.totalPage) this.finished = true
    },
    // 点击商品跳转对应详情页
    productDetail(item) {
      this.$router.push({path: `product/${item.goodsId}`})
    },
    // 返回上一级
    goBack(){
      this.$router.go(-1)
    },
  }
}
</script>

<style lang="less" scoped>
  @import '../common/style/mixin';
  .product-list-content{
    background-color: white;
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    z-index: 10000;
  }
  .category-header{
    display: flex;
    height: 50px;
    line-height: 50px;
    box-sizing: border-box;
    z-index: 1000;
    padding: 0 15px;
    width: 100%;
    .boxSizing();
    justify-content: space-between;
    margin-top: 6px;
    .icon-fanhui{
      font-size: 25px;
    }
    .search-btn{
      height: 28px;
      line-height: 28px;
      padding: 0 5px;
      font-size: 18px;
      color: #fff;
      background: @primary;
      border-radius: 5px;
      margin-top: 10px;
    }
    .header-search{
      display: flex;
      color: #232326;
      width: 76%;
      background: #F7F7F7;
      border-radius: 20px;
      .search-title{
        background: #F7F7F7;
        font-size: 18px;
      }
      .icon-sousuo1{
        font-size: 25px;
        margin-left: 15px;
      }
    }
  }
  .vantabs{
    margin-top: 5px;
  }
  .product-list-refresh {
    margin-top: 86px;
    .product-item {
      .fj();
      width: 100%;
      height: 120px;
      padding: 10px 0;
      border-bottom: 1px solid #dcdcdc;

      img {
        width: 140px;
        height: 120px;
        padding: 0 10px;
        .boxSizing();
      }

      .product-info {
        width: 56%;
        height: 120px;
        padding: 5px;
        text-align: left;
        .boxSizing();

        p {
          margin: 0
        }

        .name {
          width: 100%;
          max-height: 40px;
          line-height: 20px;
          font-size: 15px;
          color: #333;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .subtitle {
          width: 100%;
          max-height: 20px;
          padding: 10px 0;
          line-height: 25px;
          font-size: 13px;
          color: #999;
          overflow: hidden;
        }

        .price {
          color: @primary;
          font-size: 16px;
        }
      }
    }
  }

</style>