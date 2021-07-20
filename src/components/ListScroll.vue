<template>
  <div ref="wrapper" class="scroll-wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BSscroll from 'better-scroll'
export default {
  props:{
    /**
     * 1 滚动的时候会派发scroll事件，会截流。
     * 2 滚动的时候实时派发scroll事件，不会截流。
     * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
     */
    probeType:{
      type:Number,
      default:1
    },
    // 点击列表是否派发click事件
    click:{
      type:Boolean,
      default: false
    },
    //是否开启横向滚动
    scrollX:{
      type:Boolean,
      default:false
    },
    //是否派发滚动事件
    listenScroll:{
      type:Boolean,
      default:false
    },
    //列表数据
    scrollData:{
      type:Array,
      default:null
    },
    //是否派发滚动到底部的事件，用于上拉加载
    pullup:{
      type:Boolean,
      default:false
    },
    //是否派发顶部下拉的事件，用于下拉刷新
    pulldown:{
      type:Boolean,
      default:false
    },
    //是否派发列表滚动开始的事件
    beforeScroll:{
      type:Boolean,
      default:false
    },
    // 当数据更新之后，刷新scroll的延时
    refreshDelay:{
      type:Number,
      default:20
    }
  },
  mounted() {
    //在Dom渲染完毕后初始化better-scroll 间隔20毫秒，确保DOM渲染完毕
    setTimeout(()=>{
      this.initScroll()
    },20)
  },
  methods:{
    //初始化滚动组件，拿不到this.$refs.wrapper代码
    initScroll(){
      if (!this.$refs.wrapper){
        return
      }
    }
  },
  name: "ListScroll"
}
</script>

<style scoped>

</style>