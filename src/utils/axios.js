import axios from 'axios'
import {Toast} from 'vant'

//请求的地址
axios.defaults.baseURL = process.env.NODE_ENV=='development'?'http://backend-api-01.newbee.ltd/api/v1':'//127.0.0.1:28019/api/v1'
// 跨域请求是要不要携带cookie，本项目没有跨域请求的情况
axios.defaults.withCredentials = true
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
// 本课程判断用户登录状态是通过 token 来实现 localStorage 可以让数据一直存储在浏览器，除非卸载
axios.defaults.headers['token'] = localStorage.getItem('token') || ''
//post请求的时候，发送json形式的数据包
axios.defaults.headers.post['Content-Type'] = 'application/json'
//interceptors是拦截器，每个请求都要经过这个拦截器
axios.interceptors.response.use(res => {
    if (typeof res.data!== 'object'){
        Toast.fail('服务器异常！')
        return Promise.reject(res)
    }
    if (res.data.resultCode !== 200) {
        if (res.data.message) Toast.fail(res.data.message)
        if (res.data.resultCode == 416) {
            // 返回 416 代表没有登录状态，路由跳转到/login 页面（目前还为创建组件），这里的 window.vRouter 是在
            // main.js 里面设置好的 window.vRouter = router
            window.vRouter.push({ path: '/login' })
        }
        return Promise.reject(res.data)
    }
    return res.data
})
export default axios