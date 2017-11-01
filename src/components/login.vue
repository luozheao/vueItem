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
                                  <el-input placeholder="密码"  type="password" v-model="ruleForm.login.password"></el-input>
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
                                  <el-button v-loading="loading" style="width:100%;background-color: #F36847;color:white;font-size:18px;" @click="loginEvent">登录</el-button>
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
                                    <el-button type="primary"   style="float: right" @click="getCode">{{ruleForm.register.getCodeBtn}}</el-button>
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
                            <el-button style="width:100%;background-color: #F36847;color:white;font-size:18px;" v-loading="loading" @click="registerEvent">立即注册</el-button>
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
                captcahImg:'<img src="http://scan.luampm.com/system/get_captcha" />',
                loading:false,
                /******model层******/
                ruleForm:{

                    login:{
                        phone:'',
                        password:'',
                        captcha:'',
                    },
                    register:{
                        getCodeBtn:'点击获取',
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
                this.captcahImg='<img src="http://scan.luampm.com/system/get_captcha?'+Math.random().toString(32).sub(2)+'" />';
            },
            //获取短信验证码
            getCode(){
                let self=this;
                let phone=self.ruleForm.register.phone;
                if(!(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(phone))){
                    self.$message({
                        showClose: false,
                        message: "请输入正确的手机号码",
                        type:'error'
                    });
                    return;
                }
                this.$http.post('/system/sendSmsCode',{phone:phone}).then(
                    function(response){
                        if(response.body.code==200){
                            //发送成功
                            self.ruleForm.register.getCodeBtn="发送成功(9)";
                            let i=9;
                            let T=setInterval(function () {
                                if(i==0){
                                    clearInterval(T);
                                    self.ruleForm.register.getCodeBtn="点击发送";
                                }else{
                                    self.ruleForm.register.getCodeBtn="发送成功("+(--i)+")";
                                }
                            },1000);
                        }
                        else{

                            self.$message({
                                showClose: false,
                                message: response.body.message,
                                type:'error'
                            });
                        }
                    },function(response){

                    });
            },
            //登录
            loginEvent(){
                this.loading=true;
                this.$http.get('/login',{params:this.ruleForm.login}).then(
                    (response) => {
                        this.loading=false;
                        response=response.body;
                        let isCuccess= response.code=='200';
                        this.$message({
                            showClose: false,
                            message: isCuccess?'登陆成功':(response.data||response.message),
                            type:isCuccess?'success':'error'
                        });
                        if(isCuccess){
                              localStorage.setItem('XSRF-TOKEN',response.data);
                            this.$emit('login');
                        }
                    },
                    (response) => {
                        response=response.body;
                        this.loading=false;
                        this.$message({
                            showClose: false,
                            message: response.data,
                            type: 'error'
                        });
                    });
            },
            //注册
            registerEvent(){
                this.loading=true;
                this.$http.get('/register',{params:this.ruleForm.register}).then(
                    (response) => {
                        this.loading=false;
                        response=response.body;
                        let isSuccess= response.code=='200';
                        this.$message({
                            showClose: false,
                            message: response.data,
                            type:isSuccess?'success':'error'
                        });
                        if(isSuccess){
                            this.$refs['ruleForm'].resetFields();//清空
                            this.activeName='login';
                        }
                    },
                    (response) => {
                        response=response.body;
                        this.loading=false;
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


