<style lang="less" type="text/less" >
    .captchaImg{
        width: 80px;
        height: 30px;
        float: right;
        margin-right: 10px;
        margin-top: 3px;
        cursor: pointer;
        img{
            width: 100%;
            height: 100%;
        }
    }
</style>
<style lang="less" type="text/less" scoped>
    #Login {
        background: #293955;
        height: 100%;
        width:100%;
        .login {
            position: fixed;
            left: 50%;
            margin-left: -165px;
            top: 100px;
            width: 330px;
            background: white;
            border-radius: 5px;
            padding: 20px;
            border: 1px solid #DBDBDB;
        }
        .mh150{
            min-height: 270px;
        }
        .mh450{
            min-height: 450px;
        }
    }

</style>
<template>
        <div id="Login">
            <el-form :class="getLoginClassObj()"
                     ref="ruleForm"
                     :model="ruleForm"
            >
                <el-tabs v-model="activeName">
                    <el-tab-pane label="登录" name="login">
                        <el-form-item
                                :rules="rules.phone"
                                prop="login.phone"
                        >
                            <el-input placeholder="手机号码"  v-model="ruleForm.login.phone"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-input placeholder="密码" v-model="ruleForm.login.password"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-row>
                                <el-col :span="16">
                                    <el-input placeholder="验证码" v-model="ruleForm.login.captcha"></el-input>
                                </el-col>
                                <el-col :span="8">
                                    <div class="captchaImg"    @click="changecaptchaImgEvent" v-html="captcahImg"></div>
                                </el-col>
                            </el-row>
                        </el-form-item>
                        <el-form-item>
                            <el-button style="width:100%;background-color: #F36847;color:white;font-size:18px;" @click="loginEvent">登录</el-button>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="注册" name="register">
                        <el-form-item>
                            <el-input placeholder="公司名称" v-model="ruleForm.register.company"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-input placeholder="姓名"  v-model="ruleForm.register.username"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-input placeholder="手机号码"  v-model="ruleForm.register.phone"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-row :gutter="5">
                                <el-col :span="16">
                                    <el-input placeholder="验证码"  v-model="ruleForm.register.code"></el-input>
                                </el-col>
                                <el-col :span="8">
                                    <el-button type="primary"   style="float: right" @click="getCode">点击获取</el-button>
                                </el-col>
                            </el-row>

                        </el-form-item>
                        <el-form-item>
                            <el-input placeholder="密码"  v-model="ruleForm.register.password"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-input placeholder="再次输入密码"   v-model="ruleForm.register.password_confirmation"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button style="width:100%;background-color: #F36847;color:white;font-size:18px;" @click="registerEvent">立即注册</el-button>
                        </el-form-item>
                    </el-tab-pane>
                </el-tabs>
            </el-form>
        </div>
</template>

<script>
    export default {
        data() {
            return {

                activeName:'login',
                captcahImg:'<img src="http://101.200.39.173/system/get_captcha" />',
                loading:false,
                /******model层******/
                ruleForm:{
                    login:{
                        phone:'',
                        password:'',
                        captcha:'',
                    },
                    register:{
                        phone:'',
                        company:'',
                        username:'',
                        code:'',
                        password:'',
                        password_confirmation:'',
                    }
                },
                rules:{
                    phone:[
                        { require:true,  validator:function (a,b,callback) {
                            console.log(a,b);
                            callback();
                        }, trigger: 'blur' },
                    ]
                }
            }
        },
        methods: {
            getLoginClassObj(){
                let isLogin=this.activeName=='login';
                return {
                    login:true,

                    mh150:isLogin,
                    mh450:!isLogin
                }
            },
            //切换图形验证码
            changecaptchaImgEvent(){
                this.captcahImg='<img src="http://101.200.39.173/system/get_captcha?'+Math.random().toString(32).sub(2)+'" />';
            },
            //获取短信验证码
            getCode(){

            },
            //登录
            loginEvent(){
                this.$http.get('http://101.200.39.173/login',{params:this.ruleForm.login}).then(
                    (response) => {
                        console.log(response);
                        response=response.body;
                        let isCuccess= response.code=='200';
                        this.$message({
                            showClose: false,
                            message: response.message,
                            type:isCuccess?'success':'error'
                        });
                        if(!isCuccess){
                              this.$emit('login');
                        }
                    },
                    (response) => {
                        response=response.body;
                        this.$message({
                            showClose: false,
                            message: response.data,
                            type: 'error'
                        });
                    });
            },
            //注册
            registerEvent(){
                this.$http.get('http://101.200.39.173/register',{params:this.ruleForm.register}).then(
                    (response) => {
                        console.log(response);
                        response=response.body;
                        this.$message({
                            showClose: false,
                            message: response.data,
                            type: response.code=='200'?'success':'error'
                        });
                    },
                    (response) => {
                        response=response.body;
                        this.$message({
                            showClose: false,
                            message: response.data,
                            type: 'error'
                        });
                    });
            }
        },
        components: {},
        created() {

        }
    }
</script>


