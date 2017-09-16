<style   lang="less" type="text/less">
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
    #container{
        position: absolute;
        left: 220px;
        right: 0px;
    }
    .login{
        height:15px;border-left:1px solid white;line-height: 15px;margin-top:12.5px;margin-left:5px;padding-left:5px;
    }
    #leftMenu{
        position: absolute;
        width: 200px;
        left: 0;
        top: 40px;
        height: 100%;
        background: #3d3d3d;
        &>.el-menu{border-radius: 0;}
        .el-menu--dark{background: #3d3d3d;}
        .el-menu-item,
        .el-submenu__title{
            min-width: 100px;
            height: 40px;
            line-height: 40px;
            a{
                color: white;
                display:block;
                &:hover{
                    text-decoration: none;
                }
            }
            border-bottom: 1px solid #5c5c5c;
            &:hover{
                background: #303030;
            }
            &.is-active{background: #4b8df8;}
        }
        .gray{
            color:#bdbdbd;
        }
    }
    .back{
        &:hover{
            border: 1px solid #20a0ff;
            color:#20a0ff;
        }
        background:url("./images/back.png") no-repeat 1px 2px;
        padding-left: 28px;
        width: 76px;
        height: 28px;
        line-height: 28px;
        border: 1px solid #c4c4c4;
        border-radius: 5px;
        cursor: pointer;
    }
    .backWraper{
        background-color:#f5f5f5 ;
        border-radius: 5px;margin-bottom:5px;margin-top:5px;
        padding: 5px 10px;
    }
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
    .pl20{padding-left: 20px;}

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
            <!--左侧栏-->
            <div id="leftMenu" :span="3">
                <el-menu default-active="1" class="el-menu-vertical-demo" @open="" @close="" theme="dark">
                    <el-menu-item index="1"><router-link to="/peopleCenter">个人中心</router-link></el-menu-item>
                    <el-menu-item index="2"><router-link to="/areaMsgList">区域信息管理</router-link></el-menu-item>
                    <el-menu-item index="3"><router-link to="/areaPeopleManage">区域管理员管理</router-link></el-menu-item>
                    <el-menu-item index="4">领导账号管理</el-menu-item>
                    <el-menu-item index="5">调查问卷</el-menu-item>
                    <el-menu-item index="6">投诉处理进程</el-menu-item>
                    <el-menu-item index="7">问卷分数统计排行</el-menu-item>
                    <el-menu-item index="8">区域位置设置</el-menu-item>
                </el-menu>
            </div>
            <!--主内容-->
            <div id="container">
                <el-row >
                    <el-col :span="24" class="backWraper"><div class="back" :plain="true" size="small">返回上一页</div></el-col>
                </el-row>
               <router-view ></router-view>
            </div>



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


