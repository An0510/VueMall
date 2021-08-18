export default {
    // 通过context.commit('addCart', { xxx }) 调用 addCart 方法，合并全局状态的数据
    changeCart(state,payload){
        state.cartCount = payload.count
    }
}