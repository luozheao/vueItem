<style lang="less" type="text/less">
    html,
    body {
        height: 100%;
    }

    body {
        font-size: 12px;
    }

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

    #container {
        position: absolute;
        left: 220px;
        right: 0px;
    }

    .loginBtn {
        height: 15px;
        border-left: 1px solid white;
        line-height: 15px;
        margin-top: 12.5px;
        margin-left: 5px;
        padding-left: 5px;
    }

    #leftMenu {
        position: absolute;
        width: 200px;
        left: 0;
        top: 40px;
        height: 100%;
        background: #3d3d3d;
        & > .el-menu {
            border-radius: 0;
        }
        .el-menu--dark {
            background: #3d3d3d;
        }
        .el-menu--dark .el-submenu .el-menu {
            background: #3d3d3d;
            font-size: 12px;
            li {
                color: #bdbdbd;
            }
        }
        .el-menu-item,
        .el-submenu__title {
            min-width: 100px;
            height: 40px;
            line-height: 40px;
            color: white;
            border-bottom: 1px solid #5c5c5c;
            &:hover {
                background: #303030;
            }
            &.is-active {
                background: #4b8df8;
                color: white;
            }
        }
        .gray {
            color: #bdbdbd;
        }
        .el-menu-item-group__title {
            padding-top: 0;
        }
    }

    .back {
        &:hover {
            border: 1px solid #20a0ff;
            color: #20a0ff;
        }
        background: url("./images/back.png") no-repeat 1px 2px;
        padding-left: 28px;
        width:90px;
        height: 28px;
        line-height: 28px;
        border: 1px solid #c4c4c4;
        border-radius: 5px;
        cursor: pointer;
    }

    .backWraper {
        background-color: #f5f5f5;
        border-radius: 5px;
        margin-bottom: 5px;
        margin-top: 5px;
        padding: 5px 10px;
    }

    .none {
        display: none;
    }

    .hide {
        display: none !important;
    }

    .pointer {
        cursor: pointer;
    }

    .white {
        color: white
    }

    .pl20 {
        padding-left: 20px;
    }

</style>
<style lang="less" type="text/less" scoped>

</style>
<template>
    <div style="width: 100%;height: 100%;">
        <!--登录框-->
        <login   v-if="!isHideLoginPop" @login="loginEvent"></login>
        <div   v-else id="main">
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
                        <div class="pointer loginBtn" @click="signOutEvent">退出登录</div>
                    </el-col>
                </el-row>
            </div>
            <!--左侧栏-->
            <div id="leftMenu"  >
                <el-menu :default-active="defaultActive"
                         class="el-menu-vertical-demo"
                         @open=""
                         @close=""
                         @select="selectMenu"
                         theme="dark"
                         :router="true"
                         :default-openeds="defaultOpeneds"
                >
                    <el-menu-item index="peopleCenter">个人中心</el-menu-item>
                    <el-menu-item index="areaMsgList">区域信息管理</el-menu-item>
                    <el-menu-item index="areaPeopleManage">区域管理员管理</el-menu-item>
                    <el-menu-item index="leaderAccountNum">领导账号管理</el-menu-item>
                    <el-submenu
                            index="questionnaireList"
                    >
                        <template slot="title">调查问卷</template>
                        <el-menu-item-group >
                            <el-menu-item index="questionnaireListManager">问卷管理</el-menu-item>
                            <!--<el-menu-item index="questionnaireListMerge">合并问卷管理</el-menu-item>-->
                        </el-menu-item-group>
                    </el-submenu>
                    <el-menu-item index="complaintHandling">投诉处理进程</el-menu-item>
                    <el-menu-item index="questionScoreList">问卷分数统计排行</el-menu-item>
                    <el-menu-item index="areaPositionSet">区域位置设置</el-menu-item>
                    <!--<el-menu-item index="luozheao">luozheao测试页面</el-menu-item>-->
                </el-menu>
            </div>
            <!--主内容-->
            <div id="container">
                <br>
                <router-view ></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    import Login from './components/login.vue'
    export default {
        data() {
            return {
                isHideLoginPop:false,
                defaultActive:'',
                defaultOpeneds:[],
            }
        },
        methods: {
            selectMenu(index,indexPath){
                if(['questionnaireListManager','questionnaireListMerge'].indexOf(index)<0){
                    this.defaultOpeneds=[];
                }
            },
            loginEvent(){
                  this.isHideLoginPop=true;
            },
            signOutEvent(){
                //提示
                this.$message({
                    showClose: false,
                    message: '退出成功',
                    type:'success'
                });
                //显示登录窗
                this.isHideLoginPop=false;
                //清空缓存
                localStorage.clear();
            }
        },
        components: {
            Login
        },
        created(){
           let path=this.$route.path.slice(1);
           this.defaultActive=path?path:'peopleCenter';

           //判断是否出现登录界面
            let token=localStorage.getItem('XSRF-TOKEN');
            if(token){
               this.isHideLoginPop=true;
            }
        }
    }
</script>


