<style lang="less" type="text/less">
    #test{
        .el-table .cell{
            padding-left: 5px;
            padding-right: 5px;
        }
    }
</style>
<style  lang="less" type="text/less" scoped>
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
    <div id="test">
        <div class="box">
            <p class="title">领导账号列表</p>
            <div class="bodyBox">
                <el-row>
                    <el-col :span="24">
                        <el-button type="primary" @click="addAdminNum">添加领导账号</el-button>
                        <el-dialog :title="title" :visible.sync="dialogFormVisible" size="small">
                            <el-form :model="form">
                                <el-row>
                                <el-col :span="16">
                                    <el-form-item label="所属项目">
                                        <el-select v-model="form.project_id" placeholder="请选择所属项目">
                                            <el-option
                                                    v-for="item in form.region"
                                                    :key="item.id"
                                                    :label="item.project"
                                                    :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="所属区域">
                                        <el-select v-model="form.area_id" placeholder="请选择区域">
                                            <el-option
                                                    v-for="item in options"
                                                    :key="item.id"
                                                    :label="item.name"
                                                    :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="绑定号码">
                                        <el-row>
                                            <el-col :span="14">
                                                <el-input v-model="form.bind_number" style="width: 240px"></el-input>
                                                <div style="font-size: 12px;color: red;">请将该号码发给对应的区域领导，在微信里绑定即可！</div>
                                            </el-col>
                                            <el-col :span="3">
                                                <el-button type="primary" @click="getNum">生成</el-button>
                                            </el-col>
                                        </el-row>
                                    </el-form-item>
                                    <el-form-item label="领导姓名">
                                        <el-input v-model="form.username" style="width: 300px"></el-input>
                                    </el-form-item>
                                    <el-form-item label="领导手机">
                                        <el-input v-model="form.phone" style="width: 300px"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-col :span="24">
                                        <img :src="erweima" style="width:78%">
                                        <div style="font-size: 12px;color: red;">
                                            <!--注意：首先领导用手机微信关注服务号或者查找添加 “扫码点评”微信公众号，并绑定刚生成的绑定号码就能在有投诉的时候接收到微信提醒。-->
                                            扫描二维码
                                        </div>
                                    </el-col>
                                    <el-col :span="12" style="display: none">
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
                        <el-select v-model="id" placeholder="请选择区域">
                            <el-option
                                    v-for="item in options"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                        <el-input style="display: inline-block;width:300px;"
                                  placeholder="手机号/姓名"
                                  icon="search"
                                  v-model="inputSearch"
                                  :on-icon-click="inputSearchClick">
                        </el-input>
                    </el-col>
                </el-row>
                <el-table
                        :data="tableData.data"
                        max-height="250"
                        border
                        style="width: 100% ;margin-top: 10px;">
                    <el-table-column
                            prop="username"
                            label="姓名"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="phone"
                            label="手机号码"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="bind_number"
                            label="绑定号码"
                    >
                    </el-table-column>
                    <el-table-column
                            label="二维码"
                    >
                        <template scope="scope">
                            <img :src="scope.row.qc_src" style="width:100%;height: 100%"/>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="是否开启发送"
                    >
                        <template scope="scope">
                            <el-button type="primary" size="small" @click="isSendFn(scope.row)" v-show="scope.row.is_send==1">已开启</el-button>
                            <el-button type="primary" size="small" @click="isSendFn(scope.row)" v-show="scope.row.is_send==0">未开启</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="是否绑定"
                    >
                        <template scope="scope">
                            <el-button type="primary" size="small" @click="isBindFn(scope.row)"  v-show="scope.row.is_bind==1">绑定</el-button>
                            <el-button type="primary" size="small" @click="isBindFn(scope.row)"  v-show="scope.row.is_bind==0">未绑定</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="是否开启追评提醒"
                    >
                        <template scope="scope">
                            <el-button type="primary" size="small" @click="isCommentMsgFn(scope.row)" v-show="scope.row.is_chase_remind==1">已开启</el-button>
                            <el-button type="primary" size="small" @click="isCommentMsgFn(scope.row)" v-show="scope.row.is_chase_remind==0">未开启</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="是否开启统计"
                    >
                        <template scope="scope">
                            <el-button type="primary" size="small" @click="isStatistics(scope.row)" v-show="scope.row.is_statistics==1">已开启</el-button>
                            <el-button type="primary" size="small" @click="isStatistics(scope.row)" v-show="scope.row.is_statistics==0">未开启</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="openid"
                            label="OpenID"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="created_at"
                            label="创建时间"
                    >
                    </el-table-column>
                    <el-table-column
                         label="操作" style="padding: 0;">
                        <template  scope="scope">
                            <el-button type="danger" size="mini" @click="deleteLi(scope.$index, scope.row)">删除</el-button>
                            <el-button type="info" size="mini" @click="changeLi(scope.$index, tableData, scope.row)" style="margin: 0">修改</el-button>
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
    </div>
</template>

<script type="es6">

    export default {
        data() {
            return  {
                title:"添加领导账号",
                inputSearch:'',
                currentPageNum:1,
                currentListId:{'isChange':false,'id':''},//修改一项的当前id
                erweima:'src/images/erweima2.jpg',
                weixin:'src/images/tsxxt.jpg',
                dialogFormVisible:false,
                tableData:{
                    "current_page": 0,
                    "data": [
                        {
                            "id": '',
                            "username": "",
                            "phone": "",
                            "bind_number": "",
                            "openid": '',
                            "is_send": '',
                            "is_bind": '',
                            "is_chase_remind": '',
                            "is_statistics": '',
                            "created_at": "",
                            "qc_src": ""
                        }
                    ],
                    "from": '',
                    "last_page": '',
                    "next_page_url": '',
                    "path": '',
                    "per_page": '',
                    "prev_page_url": null,
                    "to": '',
                    "total": 0
                },
                form:{
                    region:'',
                    project_id:'',
                    area_id:'',
                    bind_number:'',
                    username:'',
                    phone:''
                },
                options:[{
                    id: '',
                    name: ''
                }],
                id:'',
            }
        },
        methods: {
            init(){
                //获取列表数据
               this.initTable();
                //获取所属项目下拉框
                this.$http.get('/area/beyond_project',{}).then(function(response) {
                    this.form.region=response.data.data
                },function(response) {
                });
                //获取区域下拉框
                this.$http.get('/area/simple_list',{}).then(function(response) {
                    this.options=response.data.data
                },function(response) {
                });
            },
            //获取列表数据
            initTable(){
                this.$http.get('/leader/leader_list',{params:{'page':1}}).then(function(response) {
                    this.tableData=response.data.data
                },function(response) {
                });
            },
            //点击搜素
            inputSearchClick(val){
                this.$http.get('/leader/search',{params:{'keyword':this.inputSearch,'area_id':this.id}}).then(function(response) {
                        this.tableData=response.data.data
                },function(response) {
                });
            },
            //删除一项
            deleteLi(index, row){
                this.$confirm('是否删除'+row.username+'?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.post('/leader/delete',{'id':row.id}).then(
                        function(response) {
                            let isSuccess= response.data.code=='200';
                            if(isSuccess){
                                this.initTable()
                            }
                            this.$message({
                                message: response.data.data,
                                type:isSuccess?'success':'error'
                            });
                        },
                        function(response) {
                            this.$message({
                                message: response.data.data,
                                type: 'error'
                            });
                        });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                })
            },
            //修改一项
            changeLi(index,data,row){
                this.title="修改领导账号"
                this.currentListId.id=row.id;
                this.currentListId.isChange=true;
                this.dialogFormVisible=true
                this.form.username=row.username;
                this.form.phone=row.phone;
                this.form.bind_number=row.bind_number;
                this.form.project_id=row.project_id;
                this.form.area_id=row.area_id;

            },
            //添加领导账号
            addAdminNum(){
                this.title="添加领导账号"
                this.dialogFormVisible = true
                this.currentListId.isChange=false;
                this.form.project_id='';
                this.form.area_id='';
                this.form.username='';
                this.form.phone='';
                this.form.bind_number='';
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                //获取翻页列表数据
                this.$http.get('/leader/leader_list',{params:{'page':val}}).then(function(response) {
                    this.tableData=response.data.data
                },function(response) {
                });
            },
            addarea(){
                if(this.currentListId.isChange){
                    var data=JSON.parse(JSON.stringify(this.form));
                    data.id= this.currentListId.id;
                    this.$http.post('/leader/edit',data).then(
                        (response) => {
                            this.dialogFormVisible = false
                            response=response.body;
                            let isSuccess= response.code==200;
                            if(isSuccess){
                                //获取列表数据
                                this.initTable();
                                this.$message({
                                    message: response.data,
                                    type:isSuccess?'success':'error'
                                });
                            }else{
                                this.$message({
                                    message: response.message,
                                    type:'error'
                                });
                            }
                        },
                        (response) => {
                            this.$message({
                                message: response.data,
                                type: 'error'
                            });
                        });
                }else{
                    this.$http.post('/leader/add',this.form).then(
                        (response) => {
                            this.dialogFormVisible = false
                            response=response.body;
                            let isSuccess= response.code==200;
                            if(isSuccess){
                                this.initTable();
                                this.$message({
                                    message: response.data,
                                    type:isSuccess?'success':'error'
                                });
                            }else{
                                this.$message({
                                    message: response.message,
                                    type:'error'
                                });
                            }

                        },
                        (response) => {
                            this.$message({
                                message: response.data,
                                type: 'error'
                            });
                        });
                }
            },
            //开启发送
            isSendFn(data){
                this.$http.post('/leader/is_send',{'id':data.id}).then(
                    (response) => {
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
                    (response) => {
                        this.$message({
                            message: response.data,
                            type: 'error'
                        });
                    });
            },
            //设置绑定
            isBindFn(data){
                this.$http.post('/leader/is_bind',{'id':data.id}).then(
                    (response) => {
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
                    (response) => {
                        this.$message({
                            message: response.data,
                            type: 'error'
                        });
                    });
            },
            //设置追评提醒
            isCommentMsgFn(data){
                this.$http.post('/leader/is_chase_remind',{'id':data.id}).then(
                    (response) => {
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
                    (response) => {
                        this.$message({
                            message: response.data,
                            type: 'error'
                        });
                    });
            },
            //设置开启统计
            isStatistics(data){
                this.$http.post('/leader/is_statistics',{'id':data.id}).then(
                    (response) => {
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
                    (response) => {
                        this.$message({
                            message: response.data,
                            type: 'error'
                        });
                    });
            },
            //生成绑定号码
            getNum(){
                this.$http.get('/leader/generate_code').then(
                    function(response) {
//                        let isSuccess= response.data.code=='200';
                        let isSuccess= response.data?true:false;
                        this.form.bind_number=response.data
                        this.$message({
                            message: '生成成功',
                            type:isSuccess?'success':'error'
                        });
                    },
                    function(response) {
                        this.$message({
                            message: response.data,
                            type: 'error'
                        });
                    });
            }
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