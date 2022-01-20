import { getCart } from '@/service/cart'
//在actions中获取ajax请求
export default {
    async updateCart(context) {
        //data中就是购物车数组 长度也就是首页购物车要显示的数
        const {data} = await getCart()
        // console.log('数据',data)
        context.commit('changeCart',{
            //将购物车的数量传递过去
            count:data.length || 0
        })
    }
}
