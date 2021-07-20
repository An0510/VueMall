import Vue from 'vue'
import App from './App.vue'
import router from './router' //vuerouter
import store from './store' //vuex
import {Button, Form, Field, Toast, Icon, Swipe, SwipeItem, SwipeCell } from 'vant'
import md5 from 'js-md5' //密码加密md5
import 'lib-flexible/flexible'
import {prefix} from "@/common/js/utils";

Vue.use(Form).use(Field).use(Toast).use(Button).use(Icon).use(Swipe).use(SwipeItem).use(SwipeCell)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
Vue.prototype.$md5 = md5;
Vue.prototype.prefix = prefix
//axios里的vRouter
window.vRouter = router
