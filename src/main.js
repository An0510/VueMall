import Vue from 'vue'
import App from './App.vue'
import router from './router' //vuerouter
import store from './store' //vuex
import { Divider, Popup, Overlay, Loading, Dialog,
  ContactCard, Form, AddressEdit, AddressList, Field,
  CellGroup, Cell, SwipeCell, Icon, Stepper, Card, Checkbox,
  CheckboxGroup, Button, Swipe, SwipeItem, PullRefresh, List, Tab,
  Tabs, Lazyload,GoodsAction, GoodsActionIcon, GoodsActionButton, SubmitBar, Toast } from 'vant'

import md5 from 'js-md5' //密码加密md5
import 'lib-flexible/flexible'
import {prefix} from "@/common/js/utils";

Vue.use(Divider).use(Lazyload).use(Popup).use(Overlay).use(Loading)
    .use(Dialog).use(Toast).use(ContactCard).use(Form)
    .use(AddressEdit).use(AddressList).use(Field).use(CellGroup)
    .use(Cell).use(SwipeCell).use(Icon).use(Stepper).use(Card)
    .use(Button).use(Swipe).use(SwipeItem).use(PullRefresh).use(List)
    .use(Tab).use(Tabs).use(GoodsAction).use(GoodsActionIcon)
    .use(GoodsActionButton).use(SubmitBar).use(Checkbox).use(CheckboxGroup)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
//用this.$md5调用该方法 这样VC就能调用到这个方法，也就可以直接在组件文件中调用了。
Vue.prototype.$md5 = md5;
Vue.prototype.prefix = prefix
//axios里的vRouter
window.vRouter = router
