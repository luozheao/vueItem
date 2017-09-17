<style lang="less" type="text/less" scoped>

</style>
<style lang="less" type="text/less">

</style>

<template>
    <div id="luozheao">
        <el-form ref="form"
                 :model="form"
                 label-position="top"
        >
            <el-form-item label="单体模式:">
                划分命名空间.<br>
                集合一批相关的属性和方法<br>
            </el-form-item>
            <el-form-item label="工厂模式:">
                根据调用者的参数,创建对象<br>
                简单工厂模式:<br>
                复杂工厂模式:<br>
            </el-form-item>
            <el-form-item label="订阅者模式:">
                先订阅,后发布<br>
            </el-form-item>
            <el-form-item label="模板模式:">
                覆盖重写<br>
            </el-form-item>
            <el-form-item label="代理模式:">
                我的事,别人代我做<br>
                代理人可以代理类似的多种事,也就是多对一
            </el-form-item>
        </el-form>
    </div>
</template>

<script type="es6">
    export default {
        props: [],
        data() {
            /**********状态层**************/
            return  {
                /*******中转变量********/

                /*******model********/
                form: {

                }
            }
        },
        computed: {
            //特征:1.别的属性(内部隐式监控)发生变化,本身才可以变化;2.适用于封装出新的变量;3.改变内部的值后立马生效,不会放到下个周期

        },
        watch: {
            //特征:1.别的属性(外部显示监控)发生变化,本身才可以变化;2适用于触发方法或者值的改变;3改变的方法或者值在$nextTick生效
            param() {
                this.init();
            },
        },
        methods: {
            init(){

            },
            onSubmit() {
                console.log('submit!');
            },
        },
        created() {
            this.init();
        },
        components: {

        },
    }
</script>