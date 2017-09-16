<style type="text/less" scoped>
 *{
  padding:0;
  margin:0;
 }
 ul{
  list-style-type:none;
 }
.box{
 width:100%;
 height:100%;
 border:1px solid #7a95ff;
}
 .title{
  font-size:20px;
  background-color: #7a95ff;
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
      <li class="pInfoLi"><span class="pInfoOption">公司名称：</span><span class="pInfoTxt">维多利亚酒店同济路店</span></li>
      <li class="pInfoLi"><span class="pInfoOption">姓名：</span><span class="pInfoTxt">同济路地铁店</span></li>
      <li class="pInfoLi"><span class="pInfoOption">登录帐号：</span><span class="pInfoTxt">wdlyjdtjd</span><el-button type="text" @click="open1">修改</el-button></li>
      <li class="pInfoLi"><span class="pInfoOption">密码：</span><span class="pInfoTxt"></span><span class="inlineBtn" style="cursor:pointer;" onclick="showpop();">修改密码</span></li>
     </ul>
    </div>
    <div class="pInfoItem">
     <h3 class="pInfoItemTop">功能状态</h3>
     <ul class="pInfoUl">
      <li class="pInfoLi"><span class="pInfoOption">可建区域数量：</span><span class="pInfoTxt">2个</span><span class="pInfoTxtRed">（如需更多请咨询客服电话）</span></li>
      <li class="pInfoLi"><span class="pInfoOption">可建问卷数量：</span><span class="pInfoTxt">50个</span><span class="pInfoTxtRed">（如需更多请咨询客服电话）</span></li>
      <li class="pInfoLi"><span class="pInfoOption">领导微信提醒：</span><span class="pInfoTxt">正常</span></li>
      <li class="pInfoLi"><span class="pInfoOption">可查看统计功能：</span><span class="pInfoTxt">正常</span></li>
      <li class="pInfoLi"><span class="pInfoOption">区域位置设置：</span><span class="pInfoTxt">正常</span></li>
     </ul>
    </div>
    <div class="pInfoItem">
     <h3 class="pInfoItemTop">功能状态</h3>
     <ul class="pInfoUl">
      <li class="pInfoLi"><span class="pInfoOption">可建区域数量：</span><span class="pInfoTxt">2个</span><span class="pInfoTxtRed">（如需更多请咨询客服电话）</span></li>
      <li class="pInfoLi"><span class="pInfoOption">可建问卷数量：</span><span class="pInfoTxt">50个</span><span class="pInfoTxtRed">（如需更多请咨询客服电话）</span></li>
      <li class="pInfoLi"><span class="pInfoOption">领导微信提醒：</span><span class="pInfoTxt">正常</span></li>
      <li class="pInfoLi"><span class="pInfoOption">可查看统计功能：</span><span class="pInfoTxt">正常</span></li>
      <li class="pInfoLi"><span class="pInfoOption">区域位置设置：</span><span class="pInfoTxt">正常</span></li>
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

            }
        },
        methods: {
            init(){

            },
            open1() {
                const h = this.$createElement;
                this.$msgbox({
                    title: '消息',
                    message: h('p', null, [
                        h('span', null, '内容可以是 '),
                        h('i', { style: 'color: teal' }, 'VNode')
                    ]),
                    showCancelButton: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    beforeClose: (action, instance, done) => {
                        if (action === 'confirm') {
                             done();
                        } else {
                            done();
                        }
                    }
                }).then(action => {

                });
            },
        }

    }
</script>