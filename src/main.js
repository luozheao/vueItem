import Vue from 'vue'
import ElementUI from 'element-ui'
import VueRouter from 'vue-router'
import 'element-ui/lib/theme-default/index.css'
import App from './App.vue'
import peopleCenter from './components/peopleCenter.vue'
import areaMsgList from './components/areaMsgList.vue'
import areaPeopleManage from './components/areaPeopleManage.vue'
import areaPositionSet from './components/areaPositionSet.vue'
import Luozheao from './components/luozheao.vue'
import questionScoreList from './components/questionScoreList.vue'
import complaintHandling from './components/complaintHandling.vue'
import questionnaireList from './components/questionnaireList.vue'
import leaderAccountNum from './components/leaderAccountNum.vue'


Vue.use(ElementUI)
Vue.use(VueRouter)

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
        path: '/questionnaireList',
        component: questionnaireList,
    },
    {
        path: '/questionScoreList',
        component: questionScoreList,
    },
    {
        path: '/complaintHandling',
        component: complaintHandling,
    },
    {
        path: '/luozheao',
        component: Luozheao,
    },
]
const router = new VueRouter({
    routes
})
new Vue({
    el: '#app',
    router,
    render: h => h(App)
})
