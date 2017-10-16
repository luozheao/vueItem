<style  type="text/less" scoped>
    ul{
        list-style-type:none;
    }
    .box{
        border:1px solid #7a95ff;
    }
    .title {
        font-size: 20px;
        background-color: #4b8df8 !important;
        padding: 10px;
        color: #fff;
        margin: 0px;
        text-align: left;
    }
    .bodyBox{
        padding:10px;
    }
</style>

<template>
    <div>
        <!--问卷列表-->
        <div  v-if="isShow" class="box">
            <p class="title">问卷列表</p>
            <div class="bodyBox">
                <el-row>
                    <el-col :span="24">
                        <el-button type="primary" @click="addQuestionnaireEvent">添加问卷</el-button>
                        <el-dialog title="添加问卷" :visible.sync="dialogFormVisible" size="large">
                            <el-form :model="form">
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item label="所属项目">
                                            <el-select v-model="form.region" placeholder="请选择所属项目" style="width: 400px">
                                                <el-option label="一" value="shanghai"></el-option>
                                                <el-option label="二" value="beijing"></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="所属区域">
                                            <el-select v-model="form.area" placeholder="请选择所属区域" style="width: 400px">
                                                <el-option label="区域一" value="shanghai"></el-option>
                                                <el-option label="区域二" value="beijing"></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="绑定号码">
                                            <el-row>
                                                <el-col :span="14">
                                                    <el-input v-model="form.bindPhoneNum" style="width: 320px"></el-input>
                                                    <div style="font-size: 12px;color: red;">请将该号码发给对应的区域领导，在微信里绑定即可！</div>
                                                </el-col>
                                                <el-col :span="3">
                                                    <el-button type="primary" @click="getNum">生成</el-button>
                                                </el-col>
                                            </el-row>
                                        </el-form-item>
                                        <el-form-item label="领导姓名">
                                            <el-input v-model="form.name" style="width: 400px"></el-input>
                                        </el-form-item>
                                        <el-form-item label="领导手机">
                                            <el-input v-model="form.phoneNum" style="width: 400px"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-col :span="12">
                                            <img :src="erweima" style="width:78%">
                                            <div style="font-size: 12px;color: red;">
                                                注意：首先领导用手机微信关注服务号或者查找添加 “扫码点评”微信公众号，并绑定刚生成的绑定号码就能在有投诉的时候接收到微信提醒。
                                            </div>
                                        </el-col>
                                        <el-col :span="12">
                                            <img :src="weixin" style="width:70%">
                                        </el-col>
                                    </el-col>
                                </el-row>
                            </el-form>

                            <div slot="footer" class="dialog-footer">
                                <el-button @click="dialogFormVisible = false">取 消</el-button>
                                <el-button type="primary" @click="addarea">确 定</el-button>
                            </div>

                        </el-dialog>
                        <el-dialog title="修改名称和描述" :visible.sync="changeNameAndMsg" size="small">
                            <el-form :model="changeNameForm">
                                <el-form-item label="问卷名称" :label-width="formLabelWidth">
                                    <el-input v-model="changeNameForm.name" auto-complete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="问卷描述" :label-width="formLabelWidth">
                                    <el-input type="textarea" v-model="changeNameForm.msg"></el-input>
                                </el-form-item>
                            </el-form>
                            <div slot="footer" class="dialog-footer">
                                <el-button @click="changeNameAndMsg = false">取 消</el-button>
                                <el-button type="primary" @click="changeNameAndMsgFn">确 定</el-button>
                            </div>

                        </el-dialog>
                        <el-select v-model="form.area_id" placeholder="请选择区域">
                            <el-option
                                    v-for="item in options"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                        <el-input style="display: inline-block;width:300px;"
                                  placeholder="问卷名称"
                                  icon="search"
                                  v-model="inputSearch"
                                  :on-icon-click="inputSearchClick">
                        </el-input>
                    </el-col>
                </el-row>
                <el-table
                        :data="tableData.data"
                        max-height="400"
                        border
                        style="width: 100% ;margin-top: 10px;">
                    <el-table-column
                            prop="QName"
                            label="问卷名称(点击名称快速修改)"
                    >
                        <template scope="scope">
                          <p @click="changeName(scope.row)">{{scope.row.QName}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="二维码"
                    >
                        <template scope="scope">
                            <img :src="scope.row.img" style="width:100%;height: 100%"/>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="questionAddres"
                            label="问卷地址"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="IsOpen"
                            label="是否开启"
                    >
                        <template scope="scope">
                            <el-button type="primary" size="small" @click="isSendFn(scope.row)" v-show="scope.row.IsOpen==1">已开启</el-button>
                            <el-button type="primary" size="small" @click="isSendFn(scope.row)" v-show="scope.row.IsOpen==0">未开启</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="traveller_count"
                            label="参与人数"
                    >
                    </el-table-column>

                    <el-table-column
                            prop="lookAll"
                            label="查看统计"
                    >
                        <template scope="scope">
                            <el-button type="primary" size="small" @click="lookAllFn(scope)">查看统计</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="setCustomPage"
                            label="设置自定义页面"
                    >
                        <template scope="scope">
                            <el-button type="primary" size="small" @click="setCustomPageFn(scope)">自定义页面</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="whiteList"
                            label="白名单"
                    >
                        <template scope="scope">
                            <el-button type="primary" size="small" @click="whiteListFn(scope)">管理白名单</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="blackList"
                            label="黑名单"
                    >
                        <template scope="scope">
                            <el-button type="primary" size="small" @click="blackListFn(scope)">管理黑名单</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="managementPosition"
                            label="定位限制"
                    >
                        <template scope="scope">
                            <el-button type="primary" size="small" @click="managementPositionFn(scope)">管理位置</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="CrTime"
                            label="创建时间"
                    >
                    </el-table-column>
                    <el-table-column
                            label="操作" style="padding: 0;">
                        <template scope="scope">
                            <el-button type="info" size="mini" @click="changeLi(scope.row)" style="margin: 0">修改</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="block" style="text-align: right;margin-top: 5px;">
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page.sync="tableData.current_page"
                            layout="total, prev, pager, next"
                            :total="tableData.total">
                    </el-pagination>
                </div>
            </div>
        </div>
        <!--添加问卷-->
        <div v-if="!isShow">
            <el-row id="goBackRef">
                <el-col :span="24" class="backWraper"><div class="back" :plain="true" size="small" @click="goBack">返回上一页</div></el-col>
            </el-row>
            <add-questionnaire  ></add-questionnaire>
        </div>

    </div>
</template>

<script type="es6">
    import addQuestionnaire from './addQuestionnaire/addQuestionnaire.vue'

    export default {
        components: {addQuestionnaire},
        data() {
            return  {
                formLabelWidth:'120px',
                isShow:true,
                inputSearch:'',
                currentPageNum:1,
                erweima:'src/images/smdpfwh.jpg',
                weixin:'src/images/tsxxt.jpg',
                dialogFormVisible:false,
                changeNameAndMsg:false,
                tableData:{
                    "current_page": 0,
                    "data": [
                        {
                            "QID": '',
                            "QKey": "",
                            "StudioInfo_SID": '',
                            "SubbranchInfo_SID": '',
                            "AdminUserInfo_AUID": '',
                            "QName": "",
                            "QRem": "",
                            "IsOpen": '',
                            "IsDelete": '',
                            "CrTime": "",
                            "updated_at": "",
                            "traveller_count": ''
                        }
                    ],
                    "from": '',
                    "last_page": '',
                    "next_page_url": null,
                    "path": "http://localhost:809/area_admin/list",
                    "per_page": 10,
                    "prev_page_url": null,
                    "to": 1,
                    "total": 1
                },
                form:{
                    region:'',
                    area_id:'',
                    username:'',
                    password:'',
                    project_id:'',
                    account:'',
                },
                changeNameForm:{
                  name:'',
                    msg:'',
                    id:''
                },
                options:[{
                    areaValue: '',
                    areaLabel: ''
                }],
                areaValue:'',//
            }
        },
        methods: {
            init(){
                //获取列表数据
                this.initTable();
                //获取区域下拉框
                this.$http.get('/area/simple_list',{}).then(function(response) {
                    this.options=response.data.data
                },function(response) {
                });
            },
            initTable(){
                //获取列表数据
                this.$http.get('/question/list',{params:{'page':1}}).then(function(response) {
                    this.tableData=response.data.data
                    localStorage.setItem('StudioInfo_SID',this.tableData.data[0].StudioInfo_SID)
                },function(response) {
                });
            },
            //点击搜素
            inputSearchClick(val){
                this.$http.get('',{params:{'keyword':this.inputSearch,'area_id':this.id}}).then(function(response) {
                    this.tableData=response.data.data
                },function(response) {
                });
            },
            //修改名字
            changeName(data){
                this.changeNameAndMsg=true;
                this.changeNameForm.name=data.QName;
                this.changeNameForm.msg=data.QRem;
                this.changeNameForm.id=data.QID;
            },
            //确认修改名字和描述
            changeNameAndMsgFn:function () {
                var obj={};
                obj.qid=this.changeNameForm.id
                obj.qname=this.changeNameForm.name
                obj.qrem=this.changeNameForm.msg
                this.$http.post('/question/update_name',obj).then(
                    function(response){
                        response=response.body;
                        let isSuccess= response.code==200;
                        if(isSuccess){
                            this.initTable();
                            this.changeNameAndMsg=false;
                        }
                        this.$message({
                            message: response.data,
                            type:isSuccess?'success':'error'
                        });
                    },
                    function(response){
                        this.$message({
                            message: response.data,
                            type: 'error'
                        });
                    });
            },
            changeLi(val){
                console.log(val)
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            //翻页
            handleCurrentChange(val) {
                //获取翻页列表数据
                this.$http.get('/question/list',{params:{'page':val}}).then(function(response) {
                    this.tableData=response.data.data
                },function(response) {
                });
            },
            addarea(){
                this.dialogFormVisible = false
                console.log('加多一行')
            },
            isSendFn(data){
                var isOpen=data.IsOpen==0?1:0;
                this.$http.post('/question/set_state',{'id':data.QID,'state':isOpen}).then(
                    function(response){
                    response=response.body;
                let isSuccess= response.code==200;
                if(isSuccess){
                    this.initTable();
                }
                this.$message({
                    message: response.data,
                    type:isSuccess?'success':'error'
                });
            },
                function(response){
                    this.$message({
                        message: response.data,
                        type: 'error'
                    });
                });
            },
            isBindFn(){

            },
            isCommentMsgFn(){

            },
            isStatistics(){

            },
            getNum(){

            },
            //添加问卷
            addQuestionnaireEvent(){
                this.isShow=false;
            },
            //返回上一页
            goBack(){
              this.isShow=true;
            },

        },
        created() {
            this.init();
        },
        mounted() {
            this.$nextTick(function () {

            })
        }
    }
</script>