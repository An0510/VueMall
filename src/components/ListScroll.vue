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
    //初始化滚动组件，拿不到this.$refs.wrapper代码就跳出
    initScroll(){
      if (!this.$refs.wrapper){
        return
      }
      //better-scroll 初始化 传入配置项参数
      this.scroll = new BScroll(this.$refs.wrapper,{
        probeType: this.probeType,
        click: this.click,
        scrollX: this.scrollX
      })
      //是否派发滚动事件
      if(this.listenScroll){
        const self = this
        this.scroll.on('scroll',(position)=>{
          self.$emit('scroll',position)
        })
      }
      if(this.pullup){
        this.scroll.on('scrollEnd',()=>{
          //滚动到底部
          if(this.scroll.y <= (this.scroll.maxScrollY+50)){
            //派发滚动到底部的事件
            this.$emit('scrollToEnd')
          }
        })
      }
      if (this.pulldown){
        this.scroll.on('touchend',(pos)=>{
          //下拉动作
          if(pos.y > 50){
            //下拉刷新
            this.$emit('pulldown')
          }
        })
      }
      if (this.beforeScroll){
        this.scroll.on('beforeScrollStart',()=>{
          //列表滚动前触发
          this.$emit('beforeScroll')
        })
      }
    },
    disable(){
      //代理 better-scroll的disable方法
      this.scroll && this.scroll.disable()
    },
    enable(){
      //代理better-scroll的enable方法
      this.scroll && this.scroll.enable()
    },
    refresh() {
      // 代理 better-scroll 的 refresh 方法
      this.scroll && this.scroll.refresh()
    },
    scrollTo() {
      // 代理 better-scroll 的 scrollTo 方法
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement() {
      // 代理 better-scroll 的 scrollToElement 方法
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    },
  },
  watch:{
    data(){
      setTimeout(()=>{
        this.refresh()
      },this.refreshDelay)
    }
  },

  name: "ListScroll"
}
</script>

<style scoped>
.scroll-wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>