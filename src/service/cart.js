import axios from "axios";
// Post请求：后一个请求不会把第一个请求覆盖掉。（所以Post用来增资源）
export function addCart(params) {
    return axios.post('/shop-cart',params)
}

export function getCart(params) {
    return axios.get('/shop-cart',{params})
}

export function deleteCartItem(id) {
    return axios.delete(`/shop-cart/${id}`);
}
// PUT请求：如果两个请求相同，后一个请求会把第一个请求覆盖掉。（所以PUT用来改资源）
export function modifyCart(params) {
    return axios.put('/shop-cart', params);
}

export function getByCartItemIds(params) {
    return axios.get('/shop-cart/settle', { params });
}