import Vue from 'vue'
import ElementUI from 'element-ui'
import VueRouter from 'vue-router'
import 'element-ui/lib/theme-default/index.css'
import App from './App.vue'
import peopleCenter from './components/peopleCenter.vue'
import areaMsgList from './components/areaMsgList.vue'
import areaPeopleManage from './components/areaPeopleManage.vue'
import areaPositionSet from './components/areaPositionSet.vue'
import questionScoreList from './components/questionScoreList.vue'
import complaintHandling from './components/complaintHandling.vue'
import leaderAccountNum from './components/leaderAccountNum.vue'
import questionnaireListManager from './components/questionnaireListManager.vue'
import questionnaireListMerge from './components/questionnaireListMerge.vue'
import VueResource from 'vue-resource'

let url="/api";//接口地址

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(VueResource);

// Vue.http.options.xhr = { withCredentials: true }
Vue.http.interceptors.push((request, next) => {

    console.log(this)//此处this为请求所在页面的Vue实例

    request.url=url+request.url;
    // const jwtToken = JSON.parse(localStorage.getItem('auth.jwt_token'));
    // if (jwtToken) {
    //     Vue.http.headers.common.Authorization = `Bearer ${jwtToken.access_token}`;
    // } else {
    //     delete Vue.http.headers.common.Authorization;
    // }
    // localStorage.clear();

    // request.method = 'POST';//在请求之前可以进行一些预处理和配置

    next((response) => {
        //在响应之后传给then之前对response进行修改和逻辑判断。对于token时候已过期的判断，就添加在此处，页面中任何一次http请求都会先调用此处方法
        // debugger;
        // response.body = '...';
        return response;

    });
});

const routes = [
    {
        path: '/',
        component: peopleCenter,
    },
    {
        path: '/peopleCenter',
        component: peopleCenter,
    },
    {
        path: '/areaMsgList',
        component: areaMsgList,
    },
    {
        path: '/areaPeopleManage',
        component: areaPeopleManage,
    },
    {
        path: '/areaPositionSet',
        component: areaPositionSet,
    },
    {
        path: '/leaderAccountNum',
        component: leaderAccountNum,
    },
    {
        path: '/questionnaireListManager',
        component:questionnaireListManager,
    },
    {
        path: '/questionnaireListMerge',
        component: questionnaireListMerge,
    },

    {
        path: '/questionScoreList',
        component: questionScoreList,
    },
    {
        path: '/complaintHandling',
        component: complaintHandling,
    }
]
const router = new VueRouter({
    routes
})
new Vue({
    el: '#app',
    router,
    render: h => h(App)
})
