<style type="text/less" scoped>
 ul{
  list-style-type:none;
 }
.box{
 border:1px solid #7a95ff;
}
 .title{
  font-size:20px;
  background-color: #4b8df8 !important;
  padding:10px;
  color: #fff;
  margin:0px;
  text-align: left;
 }
 .pInfoItem{
  padding-left: 16px;
  text-align: left;
 }
 .pInfoItemTop{
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  color: #00A8E8;
  margin:0;
 }
 .pInfoUl{
  padding: 4px 8px 16px;
  margin:0;
 }
 .pInfoUl .pInfoLi{
  line-height: 24px;
  color: #5E5E5E;
  padding: 4px 0;
 }
 .pInfoUl .pInfoLi .pInfoOption{
  font-size: 14px;
  font-weight: bolder;
 }
 .pInfoUl .pInfoLi .pInfoTxt{
  font-size: 12px;
 }
 .pInfoUl .pInfoLi .pInfoTxtRed{
  font-size: 12px;
  color: #FF0000;
  margin-left: 4px;
 }
</style>

<template>
 <div>
  <div class="box">
   <p class="title">个人中心</p>
   <div class="bodyBox">
    <div class="pInfoItem">
     <h3 class="pInfoItemTop">注册信息</h3>
     <ul class="pInfoUl">
      <li class="pInfoLi"><span class="pInfoOption">公司名称：</span><span class="pInfoTxt">{{ registerMsg.name }}</span></li>
      <li class="pInfoLi"><span class="pInfoOption">姓名：</span><span class="pInfoTxt">{{ registerMsg.hName }}</span></li>
      <li class="pInfoLi"><span class="pInfoOption">登录帐号：</span><span class="pInfoTxt">{{ registerMsg.account }}</span> &nbsp;<el-button type="primary" size="mini" @click="dialogFormVisible = true">修改</el-button></li>
      <el-dialog title="更换手机号码" :visible.sync="dialogFormVisible">
       <el-form :model="form">
        <el-button type="primary" @click="getNum" :loading="isGetNumLoad">点击获取验证码</el-button>
        <el-form-item label="验证码" :label-width="formLabelWidth">
         <el-input v-model="form.num" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="新的手机号码" :label-width="formLabelWidth">
         <el-input v-model="form.phone" auto-complete="off"></el-input>
        </el-form-item>
       </el-form>
       <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeNum">确 定</el-button>
       </div>
      </el-dialog>
      <li class="pInfoLi"><span class="pInfoOption">密码：</span><span class="pInfoTxt"></span> &nbsp;<el-button type="primary" size="mini" @click="changePassword=true">修改密码</el-button></li>
      <el-dialog title="修改密码" :visible.sync="changePassword">
       <el-form :model="passwordForm">
        <el-form-item label="旧密码" :label-width="formLabelWidth">
         <el-input v-model="passwordForm.oldPassword" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" :label-width="formLabelWidth">
         <el-input v-model="passwordForm.newPassword" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" :label-width="formLabelWidth">
         <el-input v-model="passwordForm.aglinNewPassword" auto-complete="off"></el-input>
        </el-form-item>
       </el-form>
       <div slot="footer" class="dialog-footer">
        <el-button @click="changePassword = false">取 消</el-button>
        <el-button type="primary" @click="changePasswordFn">确 定</el-button>
       </div>
      </el-dialog>
     </ul>
    </div>
    <div class="pInfoItem">
     <h3 class="pInfoItemTop">账户信息</h3>
     <ul class="pInfoUl">
      <li class="pInfoLi"><span class="pInfoOption">会员状态：</span><span class="pInfoTxt">{{accountMsg.account}}</span></li>
      <li class="pInfoLi"><span class="pInfoOption">会员到期时间：</span><span class="pInfoTxt">{{accountMsg.endTime}}</span></li>
      <li class="pInfoLi"><span class="pInfoOption">续费会员：</span><span class="pInfoTxt"></span><span class="pInfoTxtRed">{{accountMsg.renew}}</span><a style="display:none;" href="Pay/openVip.aspx" class="inlineBtn">点击支付</a></li>
     </ul>
    </div>
    <div class="pInfoItem">
     <h3 class="pInfoItemTop">功能状态</h3>
     <ul class="pInfoUl">
      <li class="pInfoLi"><span class="pInfoOption">可建区域数量：</span><span class="pInfoTxt">{{abilityMsg.area}}</span><span class="pInfoTxtRed">（如需更多请咨询客服电话）</span></li>
      <li class="pInfoLi"><span class="pInfoOption">可建问卷数量：</span><span class="pInfoTxt">{{abilityMsg.question}}</span><span class="pInfoTxtRed">（如需更多请咨询客服电话）</span></li>
      <li class="pInfoLi"><span class="pInfoOption">领导微信提醒：</span><span class="pInfoTxt">{{abilityMsg.Prompt}}</span></li>
      <li class="pInfoLi"><span class="pInfoOption">可查看统计功能：</span><span class="pInfoTxt">{{abilityMsg.statistics}}</span></li>
      <li class="pInfoLi"><span class="pInfoOption">区域位置设置：</span><span class="pInfoTxt">{{abilityMsg.areaSet}}</span></li>
     </ul>
    </div>
   </div>
  </div>
 </div>
</template>

<script type="es6">
    export default {
//        props: ['param', 'data'],
        data() {
            return  {
                registerMsg:{
                    name:'',
                    hName:'',
                    account:''
                },
                accountMsg:{
                    account:'',
                    endTime:'',
                    renew:''
                },
                abilityMsg:{
                    area:'',
                    question:'',
                    Prompt:'',
                    statistics:'',
                    areaSet:''
                },
                isGetNumLoad:false,
                dialogFormVisible: false,
                changePassword: false,
                form: {
                    num: '',
                    phone:''
                },
                passwordForm:{
                    oldPassword:'',
                    newPassword:'',
                    aglinNewPassword:'',
                },
                formLabelWidth: '120px'
            }
        },
        methods: {
            init(){
                this.registerMsg={
                    name:'维多利亚酒店同济路店',
                    hName:'同济路地铁店',
                    account:'wdlyjdtjd'
                };
                this.accountMsg={
                    account:'是',
                    endTime:'2022-07-06 00:00',
                    renew:'（请联系客服续费！）'
                },
                this.abilityMsg={
                    area:'2个',
                    question:'50个',
                    Prompt:'正常',
                    statistics:'正常',
                    areaSet:'正常'
                }
            },
            changeNum(){
                this.dialogFormVisible = false
                console.log('账户已改');
            },
            changePasswordFn(){
                this.changePassword = false
                console.log('密码已改');
            },
            getNum(){
                this.isGetNumLoad=true;
                let self=this;
                setTimeout(function () {
                    self.isGetNumLoad=false;
                },5000)
                console.log('验证码是111');
            }
        },
        created() {
            this.init();
        },

    }
</script>