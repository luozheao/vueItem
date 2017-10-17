<style lang="less" type="text/less" >
    #addQuestionnaire{

    }
</style>
<style lang="less" type="text/less" scoped>
    @import "./main.css";
    @import "./addQuestionnaire.css";
    #addQuestionnaire{

    }
</style>
<template>
    <div>
        <!--选择创建问卷-->
        <div v-if="isShow" id="addQuestionnaire">
            <header>
                <div class="head">
                    <div class="headCon">
                        <div class="headTxt"></div>
                    </div>
                </div>
            </header>
            <article>
                <div class="container">
                    <div class="navDiv">
                        <div class="navTxt"><span>以下是三种问卷创建方式，请选择...</span></div>
                        <div class="navBarDiv">
                            <ul>
                                <li class="navBar rec">创建空白问卷</li>
                                <li class="navBar">选择问卷模版</li>
                                <li class="navBar lastNavBar">导入问卷文本</li>
                            </ul>
                        </div>
                    </div>
                    <div class="navItemDiv">
                        <div class="navItem act">
                            <div class="contain contain1">
                                <span class="wjTitle">问卷名称：</span><input class="wjtTxt" id="QName" type="text" placeholder="问卷名称" title="问卷名称">
                                <div class="creatwjBtn" @click="isok"><span>确定</span></div>
                            </div>
                        </div>
                        <div class="navItem">
                            <div class="contain contain2">
                                <h4 class="muban">问卷创建模版</h4>
                                <div class="mubanDiv">
                                    <ul id="mubanUl"></ul>
                                </div>
                            </div>
                        </div>
                        <div class="navItem">
                            <div class="leadingIn">
                                <form >
                                    <div class="leadingInExplain">
                                        <h4>说明：</h4>
                                        <p>1. 题目标题最好以数字开头</p>
                                        <p>2. 选项与选项之间不要空行</p>
                                        <p>3. 如果无法正确识别，请尝试在题目与题目之间加入空行</p>
                                        <p>4. 如有问题请创建空白问卷</p>
                                    </div>
                                    <div class="leadingInDiv">
                                        <textarea id="QBody" name="QBody" class="leadingInArea"></textarea>
                                    </div>
                                </form>
                                <div class="leadingInBtn" id="isokview">确定</div>
                            </div>

                        </div>
                    </div>
                </div>
            </article>
        </div>
        <!--创建空白问卷-->
        <add-space-questionnaire  :QName="QName" :tqid="tqid" :bodyVal="bodyVal" v-if="!isShow"  @goBack="goBack"></add-space-questionnaire>
    </div>
</template>

<script>
    import $ from 'jquery';
    import addSpaceQuestionnaire from './addSpaceQuestionnaire.vue'
    export default {
        components: {addSpaceQuestionnaire},
        data() {
            return {
                isShow:true,
                QName:'',
                tqid:0,//查询问卷数据的id
                bodyVal:"",//批量导入的数据
            }
        },
        methods:{
            //返回按钮的显示与隐藏控制
             setGoBackBtnHide(bool){
                 $('#goBackRef')[bool?'hide':'show']();
             },
            ///创建试卷
              isok() {
                  var QName = $("#QName").val() == "" ? "问卷名称" : $("#QName").val();
                  this.isShow=false;
                  this.setGoBackBtnHide(true);
                  this.QName=QName;
              },
            //返回
            goBack(){
                this.isShow=true;
                this.setGoBackBtnHide(false);
            },

        },
        mounted() {
                var self=this;
                $(function () {
                    //查看选择问卷模版
                    $('#mubanUl').on('click','.mubanTitle',function(){
                        showMuban(this);
                    });
                    //查看选择问卷模版
                   function showMuban(obj) {
                        //先要加载问卷
                        //显示问卷
                        if ($(obj).parent().next('.mubanCont').hasClass('show')) {
                            $(obj).parent().next('.mubanCont').removeClass('show');
                        } else {
                            $('.mubanCont').removeClass('show');
                            //加载问卷
                            var tqid=  $(obj).next('.preview').attr('tqid')
                            setMubancont(tqid,$(obj));
                        }
                    }
                    //获取问卷具体内容
                    function setMubancont(qid,$mubanTitle) {

                        self.$http.get('/answer_template/detail',{params:{'id':qid}}).then(function(response) {
                            console.log(response);

//                            var TQBody = eval('(' + data.Data[i].TQBody + ')');
                            var TQBody=response.data.data;
                            var qid=response.data.data.QID;
                            var mubanList="";
                            mubanList += '<div class="mubanCont"><div class="mubanContDiv"><div class="mubanContTxt"><div class="surveyhead" title="编辑问卷标题"><h1 id="pater_title">' + TQBody.QName + '</h1><div id="pater_desc" class="surveydescription">' + TQBody.QRem + '</div></div>';
                            for (var j = 0; j < TQBody.item.length; j++) {
                                var type = TQBody.item[j].QIType;
                                if (type != 2) {
                                    mubanList += '<div class="div_question "><div class="div_preview"><div class="div_title_question_all"><div class="div_topic_question">'+(j+1)+'.</div><div class="div_title_question"><span>' + TQBody.item[j].QITitle + '</span></div></div>';
                                } else {
                                    mubanList += '<div class="div_question "><div class="div_preview"><div class="div_title_question_all"><div class="div_topic_question">' + (j + 1) + '.</div><div class="div_title_question"><span>' + TQBody.item[j].QITitle + '</span><span class="qtypetip">[多选]</span></div></div>';
                                }
                                mubanList += '<div class="div_table_radio_question">';
                                switch (type) {
                                    case 1:
                                        var optionList = '';
                                        for (var n = 0; n < TQBody.item[j].Option.length; n++) {
                                            if (TQBody.item[j].Option[n].OPType == 1) {
                                                optionList += '<li><input type="radio">' + TQBody.item[j].Option[n].OTitle + '<input type="text" class="underline" value="请注示..."></li>';
                                            } else {
                                                optionList += '<li><input type="radio">' + TQBody.item[j].Option[n].OTitle + '</li>';
                                            }

                                        }
                                        mubanList += '<ul>' + optionList + '</ul>';
                                        break;
                                    case 2:
                                        var optionList = '';
                                        for (var n = 0; n < TQBody.item[j].Option.length; n++) {
                                            if (TQBody.item[j].Option[n].OPType == 1) {
                                                optionList += '<li><input type="checkbox">' + TQBody.item[j].Option[n].OTitle + '<input type="text" class="underline" value="请注示..."></li>';
                                            } else {
                                                optionList += '<li><input type="checkbox">' + TQBody.item[j].Option[n].OTitle + '</li>';
                                            }
                                            //optionList += '<li><input type="checkbox">' + TQBody.item[j].Option[n].OTitle + '</li>';
                                        }
                                        mubanList += '<ul>' + optionList + '</ul>';
                                        break;
                                    case 3:
                                        mubanList += '<textarea wrap="soft" rows="1" class="inputtext"></textarea>';
                                        break;
                                    case 4:
                                        var optionList = '';
                                        for (var n = 0; n < TQBody.item[j].Option.length; n++) {
                                            optionList += '<li><div class="voteLeft"><input type="radio">' + TQBody.item[j].Option[n].OTitle + '</div><div class="voteRight"><span>' + TQBody.item[j].Option[n].PCount + '票</span></div></li>';
                                        }
                                        mubanList += '<ul>' + optionList + '</ul>';
                                        break;
                                    case 5:
                                        var optionList = '';
                                        for (var n = 0; n < TQBody.item[j].Option.length; n++) {
                                            optionList += '<li class="shop-item"><div class="text_place"><div class="item_name">' + TQBody.item[j].Option[n].OTitle + '</div><p class="item_price">' + TQBody.item[j].Option[n].OPrice + '</p><p class="item_select"><span class="operation remove">-</span><input class="operation itemnum" value="0" disabled="disabled"><span class="operation add">+</span></p></div><div class="divclear"></div></li>';
                                            //TQBody.item[j].Option[n].OPrice 商品题单价
                                        }
                                        mubanList += '<ul>' + optionList + '</ul>';
                                        break;
                                    default:
                                        break;

                                }
                                mubanList += '</div></div></div>';
                            }
                            mubanList += '<div class="mubanContBtn" onclick="creatQM(this)" TQID="' + qid + '" >以此问卷为模板创建问卷</div></div>';

                            $mubanTitle.parents('.mubanItem').append(mubanList);
                            $mubanTitle.parent().next('.mubanCont').addClass('show');
                        },function(response) {
                            console.log(response);
                        });
                    }
                    //添加问卷模板
                    $('#mubanUl').on('click','.preview',function(){
                        preview(this);
                    });
                   //添加问卷模板
                    function preview(obj) {
                        //有自定义属性TQID
                        var tqid=$(obj).attr("TQID");
                        //跳转到添加空白问卷
                        self.isShow=false;
                        self.setGoBackBtnHide(true);
                        self.tqid=tqid;
                    }

                    //导入问卷文本
                    $('body').on('click','#isokview',function(){
                        isokviewLink();
                    });
                    function isokviewLink() {
//                        var bodyVal = encodeURI($("#QBody").val());
                        var bodyVal = $("#QBody").val();
                        //跳转到问卷,并赋值
                        self.isShow=false;
                        self.setGoBackBtnHide(true);
                        self.tqid=0;
                        self.bodyVal=bodyVal;
                    }

                    $('body').on('click','.navBar',function () {
                        if ($(this).hasClass('rec')) {
                            return;
                        } else {
                            $('.navBar').removeClass('rec');
                            $('.navItem').removeClass('act');
                            $(this).addClass('rec');
                            $($('.navItem')[$(this).index()]).addClass('act');
                        }

                        //注入问卷
                        var index=$(this).index();
                        if(index==1){
                            loadMUban();
                        }
                        else if(index==2){
                           if( window.QKey){
                               self.$http.get('/question/content',{params:{'QKey': window.QKey}}).then(function(data) {
//
                                  var  data1=data.data.data[0].item
                                   debugger
                                       $("#QBody").empty().val(data1);
//                                  $("#isokview").click()
                               },function(response) {

                               });
                           }else{
                               var defValue = "题目1\n选项1\n选项2\n选项3\n\n题目2[多选]\n选项4\n选项5\n选项6\n\n单行文本题";
                               var QBodyValue=$('#QBody').val();
                               if(!QBodyValue){
                                   $("#QBody").val(defValue);
                               }
                           }

                        }

                    });



                });
            //加载模版
            function loadMUban(){
                    var data=''
                //获取问卷模板-列表
                var mubanList = '';
                self.$http.get('/answer_template/list').then(function(response) {
                    data=response.data

//                    var len = data.Data.length;
                    var len = data.data.length;

                    for (var i = 0; i < len; i++) {
                        mubanList += '<li class="mubanItem"><div class="mubanTitleDiv"><p class="mubanTitle"  >' + data.data[i].QName+ '</p>' +
                            '<span class="preview"   TQID="' + data.data[i].QID + '">添加</span></div>'
                            +"</li>"
                    }
                    $('#mubanUl').html(mubanList); //选择问卷模版
                },function(response) {

                });



            }

            //以此模版创建问卷
            function creatQM(obj) {
                //有自定义属性TQID
                window.location = "questionnaireManager.aspx?TQID=" + $(obj).attr("TQID");
            }

        }
    }
</script>



