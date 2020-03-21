// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

//bootstrap组件
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'
// iview组件
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);
// 跨域组件
import $axios from "axios" 
Vue.prototype.$http=$axios

// element-ui组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
import Print from "vue-print-nb"
//调用打印插件
Vue.use(Print)

//格式化时间
import * as moment from 'moment'
Vue.prototype.moment=moment
import 'babel-polyfill'
import qs from "qs"
var less = require('Less');
//anime动画
import anime from 'animejs'

Vue.use(anime)
import VueAnime from 'vue-animejs';
 
Vue.use(VueAnime)
//高德地图
import AMap from 'vue-amap'

　　　　Vue.use(AMap)

　　　　// 初始化地图

　　　　AMap.initAMapApiLoader({

　　　　　　// 高德的key

　　　　　　key: '3ab4f8834420771a249ceb40dd2edfb3',

　　　　　　// 插件集合

　　　　　　plugin: ['AMap.Autocomplete','AMap.Geocoder', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor']

　　　　})
Vue.config.productionTip = false

//监听事件
Vue.prototype.resetSetItem = function (key, newVal) {

      // 创建一个StorageEvent事件
      var newStorageEvent = document.createEvent('StorageEvent');
      const storage = {
          setItem: function (k, val) {
              sessionStorage.setItem(k, val);

              // 初始化创建的事件
              newStorageEvent.initStorageEvent('setItem', false, false, k, null, val, null, null);

              // 派发对象
              window.dispatchEvent(newStorageEvent)
          }
      }
        // 根据判断获取session中存入的多个值
  if (key === 'watchItem1') {
    return storage.setItem(key, newVal);
  } else if (key === 'watchItem2') {
    return storage.setItem(key, newVal)
  }else if(key==='watchItem3'){
    return storage.setItem(key, newVal)
  }else if(key==='show_div'){
    return storage.setItem(key, newVal)
  }
  
}

// import Vant from 'vant';
// import 'vant/lib/index.css';
// Vue.use(Vant);
import App from './App'
import router from './router'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
