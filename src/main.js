import Vue from 'vue'
import ElementUI from 'element-ui'
import VueRouter from 'vue-router'
import 'element-ui/lib/theme-default/index.css'
import App from './App.vue'
import peopleCenter from './components/peopleCenter.vue'
import areaMsgList from './components/areaMsgList.vue'
import areaPeopleManage from './components/areaPeopleManage.vue'


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
    },,
    {
        path: '/areaPeopleManage',
        component: areaPeopleManage,
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
