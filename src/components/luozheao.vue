<style lang="less" type="text/less" scoped>

</style>
<style lang="less" type="text/less">

</style>

<template>
    <div id="luozheao" style="height: 1000px;background: red;position: relative;opacity: 0.6;">
        <vue-lazy-component
                @init="initTest"
        >
            <!--需要懒加载的组件-->
            <bc/>
            <!--在加载之前展示的骨架组件-->
            <ab slot="skeleton"/>
        </vue-lazy-component>
    </div>
</template>

<script type="es6">
    import { component as VueLazyComponent } from '@xunlei/vue-lazy-component'

    export default {
        props: [],
        data() {
            /**********状态层**************/
            return  {
                /*******中转变量********/

                /*******model********/
                form: {

                },

            }
        },
        computed: {
            //特征:1.别的属性(内部隐式监控)发生变化,本身才可以变化;2.适用于封装出新的变量;3.改变内部的值后立马生效,不会放到下个周期

        },
        watch: {
            //特征:1.别的属性(外部显示监控)发生变化,本身才可以变化;2适用于触发方法或者值的改变;3改变的方法或者值在$nextTick生效

        },
        methods: {
            initTest(){
                console.log(111111111);
            },


        },
        mounted() {

        },
        components: {
            'vue-lazy-component': VueLazyComponent,

        },
    }
</script>