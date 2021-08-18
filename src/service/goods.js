import axios from '../utils/axios'
//获取分类数据
export function getCategory(){
    return axios.get('/categories')
}
// 获取搜索后的数据
export function search(params) {
    return axios.get('/search', {params})
}
// 获取单个商品详情数据
export function getDetail(id) {
    return axios.get(`/goods/detail/${id}`)
}