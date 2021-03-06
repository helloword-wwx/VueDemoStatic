// 步骤1：导入 vue这个包
// var Vue = require('vue');
import Vue from 'vue';

// 步骤2：想要解析和呈现App.vue组件的内容，则导入 App.vue组件
// var App = require('./App.vue');
import App from './App.vue';

// 1.0 路由的写法
// 1.0.0 导包
import vueRouter from 'vue-router';

// 1.0.2 将vueRouter和vue绑定起来
Vue.use(vueRouter);

// 1.0.3 定义路由规则
// 导入系统的整体布局组件
import layout from './components/site/layout.vue';

//导入goodslist
import goodslist from './components/site/goodslist.vue';
// 导入商品详情
import goodsinfo from './components/site/goodsinfo.vue';
//导入购物车详情
import car from './components/site/car.vue'

var router = new vueRouter({
    routes: [
        { name: 'default', path: '/', redirect: '/site' },
        {
            name: 'layout',
            path: '/site',
            component: layout,
            children: [
                { name: goodslist, path: 'goodslist', component: goodslist },
                { name: goodsinfo, path: 'goodsinfo/:goodsid', component: goodsinfo },
                { name: car, path: 'car/:goodsid', component: car }
            ]
        }
    ]
});

// 2.0 axios的使用
// 2.0.1 导入axios包
import axios from 'axios';
// 2.0.2 设定axios的基本的url请求前缀
axios.defaults.baseURL = 'http://157.122.54.189:9095';

// 2.0.3 想要在将来的每个子组件中的方法中均可以使用 this.$http去调用其方法执行ajax请求
//就要将axios对象挂载到vue的原型属性$http上
Vue.prototype.$http = axios;

// 设定axios的参数使得axios发出的ajax请求能够自动带上cookie
axios.defaults.withCredentials = true;

// 2.0.4 绑定到vue上
Vue.use(axios);

// 3.0 使用elementUI这个ui框架的步骤
// 3.0.1、导包
import elementUI from 'element-ui';
// 3.0.2 导入elemeui的css控制样式
// 由于项目的样式和elementui的css样式有些不一样，那么修改了这个样式以后，要利用自己的样式替换原来的原有样式

// import 'element-ui/lib/theme-default/index.css';

// 3.0.3 绑定
Vue.use(elementUI);

// 导入整个网站布局的控制样式
import '../statics/site/css/style.css';


// 4.0 定义共有过滤器(全局过滤器)来实现日期字符串的格式化操作
Vue.filter('datefmt', (input, fmtstring) => {
    var mydate = new Date(input);
    var y = mydate.getFullYear();
    var m = mydate.getMonth() + 1;
    var d = mydate.getDate();
    var h = mydate.getHours();
    var mi = mydate.getMinutes();
    var s = mydate.getSeconds();

    if (fmtstring == 'YYYY-MM-DD') {
        return y + '-' + m + '-' + d;
    }
    if (fmtstring == 'YYYY-MM-DD HH:mm:ss') {
        return y + '-' + m + '-' + d + ' ' + h + ':' + mi + ':' + s;
    }

});

//定义vuex来实现购物车的同步业务
//1.0 数据对象 
//特点:当state的值发生改变后, 通过this.$store.state.bucount 的地方就会自动发生刷新改变
var state = { buycount: 0 }

//2.0action,购物车按钮点击的时候出发actions , 代码:this.$store.dispatch('changeBuycount',购买数量)

var actions = {
        changeBuycount({ commit }, parmsBuycount) {
            commit('changeBuycount', parmsBuycount)
        }
    }
    //3.0 mutations
var mutations = {
    changeBuycount(state, parmsBuycount) {
        state.buycount = parmsBuycount
    }
}
import vuex from 'vuex';
Vue.use(vuex)
    //4.0 由于目前不需要对state中的buycount进行逻辑封装, 所以留空
var getters = {

};

//5.0 实例化一个store
var store = new vuex.Store({
    state,
    actions,
    mutations,
    getters
})

new Vue({
    el: '#app',
    // 使用app这个组件对象
    // es5的写法
    // render:function(create){create(App);}
    router,
    store,
    // es6的写法 :将app当做根组件替换index1.html这个模板中的<div id="app">
    render: create => create(App)
});