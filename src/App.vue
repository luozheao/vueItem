<style   lang="less" type="text/less">
    .none {
        display: none;
    }
    .hide{
        display: none !important;
    }
    .pointer{
        cursor: pointer;
    }
    .white{color:white}

    body{font-size:12px;}
    body, h1, h2, h3, h4, h5, h6, hr, p, blockquote, dl, dt, dd, ul, ol, li, pre, form, fieldset, legend, button, input, textarea, th, td {
        margin: 0;
        padding: 0;
    }

    h1, h2, h3, h4, h5, h6 {
        font-size: 100%;
    }

    address, cite, dfn, em, var {
        font-style: normal;
    }

    code, kbd, pre, samp {
        font-family: couriernew, courier, monospace;
    }

    small {
        font-size: 12px;
    }

    ul, ol {
        list-style: none;
    }

    a {
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }

    sup {
        vertical-align: text-top;
    }

    sub {
        vertical-align: text-bottom;
    }

    legend {
        color: #000;
    }

    fieldset, img {
        border: 0;
    }

    button, input, select, textarea {
        font-size: 100%;
    }

    table {
        border-collapse: collapse;
        border-spacing: 0;
    }

    #header {
        height: 40px;
        line-height: 40px;
        background: #212121;
    }
    .login{
        height:15px;border-left:1px solid white;line-height: 15px;margin-top:12.5px;margin-left:5px;padding-left:5px;
    }
    #leftMenu{
        &>.el-menu{border-radius: 0;}
        .el-menu--dark{background: #3d3d3d;}
        .el-menu-item,
        .el-submenu__title{
            min-width: 100px;
            height: 40px;
            line-height: 40px;
            color: white;
            border-bottom: 1px solid #5c5c5c;
            &:hover{
                background: #303030;
            }
        }
        .gray{
            color:#bdbdbd;
        }
    }
</style>
<style lang="less" type="text/less" scoped>

</style>
<template>
    <div id="main">
        <!--顶部-->
        <div id="header">
            <el-row class="white" >
                <el-col :span="10"  >
                    &nbsp;
                </el-col>
                <el-col :span="12"  >
                    <div style="text-align: right;">同济路地铁店</div>
                </el-col>
                <el-col :span="2"  >
                    <div class="pointer login">退出登录</div>
                </el-col>
            </el-row>
        </div>

        <el-row>
            <!--左侧栏-->
            <el-col id="leftMenu" :span="3">
                <el-menu default-active="2" class="el-menu-vertical-demo" @open="" @close="" theme="dark">
                    <el-menu-item index="2"><router-link to="/peopleCenter">个人中心</router-link></el-menu-item>
                    <el-menu-item index="3"><router-link to="/areaMsgList">区域信息管理</router-link></el-menu-item>
                    <el-menu-item index="3">区域管理员管理</el-menu-item>
                    <el-menu-item index="3">领导账号管理</el-menu-item>
                    <el-menu-item index="3">调查问卷</el-menu-item>
                    <el-menu-item index="3">投诉处理进程</el-menu-item>
                    <el-menu-item index="3">问卷分数统计排行</el-menu-item>
                    <el-menu-item index="3">区域位置设置</el-menu-item>
                </el-menu>
            </el-col>
            <!--主内容-->
            <el-col :span="21">
               <router-view></router-view>
            </el-col>
        </el-row>


    </div>
</template>

<script>

    export default {
        data() {
            return {

            }
        },
        methods: {

        },

        components: {

        },
    }
</script>


