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
    .alarm{
        display: block;
    }
    .el-checkbox+.el-checkbox{
        margin: 0;
    }
</style>

<template>
    <div>
        <div class="box">
            <p class="title">区域管理员列表</p>
            <div class="bodyBox">
                <el-row>
                    <el-col :span="24">
                        <el-button type="primary" @click="addAdmin">添加区域管理员</el-button>
                        <el-dialog :title="title" :visible.sync="dialogFormVisible">
                            <el-form :model="form">
                                <el-form-item label="所属项目" :label-width="formLabelWidth">
                                    <el-select v-model="form.project_id" placeholder="请选择所属项目">
                                        <el-option
                                                v-for="item in form.region"
                                                :key="item.id"
                                                :label="item.project"
                                                :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="所属区域" :label-width="formLabelWidth">
                                    <el-select v-model="form.area_id" placeholder="请选择区域">
                                        <el-option
                                                v-for="item in options"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="账号" :label-width="formLabelWidth">
                                    <el-input type="text" v-model="form.account"></el-input>
                                </el-form-item>
                                <el-form-item label="密码" :label-width="formLabelWidth">
                                    <el-input type="password" v-model="form.password"></el-input>
                                </el-form-item>
                                <el-form-item label="姓名" :label-width="formLabelWidth">
                                    <el-input type="text" v-model="form.username"></el-input>
                                </el-form-item>
                            </el-form>
                            <div slot="footer" class="dialog-footer">
                                <el-button @click="dialogFormVisible = false">取 消</el-button>
                                <el-button type="primary" @click="addarea">确 定</el-button>
                            </div>
                        </el-dialog>
                        <el-dialog title="权限查看" :visible.sync="lookAlarmBox">
                            <div  v-for="item in alarmList" :key="item.id" @click="changeAlarm(item.id)">
                                <el-checkbox :checked="item.isChange" class="alarm">{{item.name}}</el-checkbox>
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
                                  placeholder="区域名称"
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
                            label="管理员名字"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="phone"
                            label="管理账号"
                    >
                    </el-table-column>
                    <el-table-column
                            label="是否开启"
                    >
                        <template scope='scope'>
                            <el-button type="primary" size="small" @click="isCommentMsgFn(scope.row)" v-show="scope.row.status==1">已开启</el-button>
                            <el-button type="primary" size="small" @click="isCommentMsgFn(scope.row)" v-show="scope.row.status==0">未开启</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="查看权限"
                    >
                        <template scope='scope'>
                            <el-button type="info" size="mini" @click="lookAlarm(scope.row)">查看</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="created_at"
                            label="创建时间"
                    >
                    </el-table-column>
                    <el-table-column
                            label="操作">
                        <template scope="scope">
                            <el-button type="danger" size="mini" @click="deleteLi(scope.$index, scope.row)">删除</el-button>
                            <el-button type="info" size="mini" @click="changeLi(scope.$index, tableData, scope.row)">修改</el-button>
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
                inputSearch:'',
                title:"添加区域管理员",
                formLabelWidth:'120px',
                currentPageNum:1,
                currentListId:{'isChange':false,'id':''},//修改一项的当前id
                dialogFormVisible:false,
                lookAlarmBox:false,
                tableData:{
                    "current_page": 0,
                    "data": [
                        {
                            "id": '',
                            "username": "",
                            "phone": "",
                            "status": '',
                            "rights": [],
                            "created_at": ""
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
                options:[{
                    id: '',
                    name: ''
                }],
                id:'',
                alarmId:'',
                alarmList:[],
                currentAlarm:[],
                num:0,
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
            initTable(){
                //获取列表数据
                this.$http.get('/area_admin/list',{params:{'page':1}}).then(function(response) {
                    this.tableData=response.data.data
                },function(response) {
                });
            },
            //点击搜素
            inputSearchClick(val){
                this.$http.get('/area_admin/search',{params:{'keyword':this.inputSearch,'area_id':this.id}}).then(function(response) {
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
                    this.$http.post('/area_admin/delete',{'id':row.id}).then(
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

                this.title="修改区域管理员"
               this.currentListId.id=row.id;
               this.form.username=row.username;
               this.form.project_id=row.project_id;
               this.form.area_id=row.area_id;
               this.form.account=row.phone;
               this.currentListId.isChange=true;
                this.dialogFormVisible=true
            },
            //查看权限
            lookAlarm(row){
                let self=this;
                this.lookAlarmBox=true;
                this.alarmId=row.id;
                this.currentAlarm=row.rights
                self.alarmList=[];
                this.$http.get('/area_admin/right_list',{}).then(function(response) {
                    let alarmList=response.data.data;
                    var str=self.currentAlarm.toString();
                    let arr=[];
                    for(var i=0;i<alarmList.length;i++){
                        var obj={}
                        if(str.indexOf(alarmList[i].id)>-1){
                            obj.id=alarmList[i].id
                            obj.name=alarmList[i].name
                            obj.isChange=true
                        }else{
                            obj.id=alarmList[i].id
                            obj.name=alarmList[i].name
                            obj.isChange=false
                        }
                        arr.push(obj)
                    }
                        self.alarmList=arr;

                },function(response) {
                });
            },
            //设置权限
            changeAlarm(data){
                let self=this
                var currentArr=[]
                if(self.num==1){
                    self.num=0
                    return false
                }
                if(self.currentAlarm.length){
                    var arrA=[]
                    for(var l=0;l<self.currentAlarm.length;l++){
                            arrA.push(self.currentAlarm[l])
                    }
                    var str=self.currentAlarm.toString();
                    for(var i=0;i<self.currentAlarm.length;i++){
                        if(str.indexOf(data)==-1){
                            arrA.push(data)
                        }else{
                            if(self.currentAlarm.length==1){
                                currentArr='nothing'
                            }else{
                                var arr=[]
                                for(var l=0;l<self.currentAlarm.length;l++){
                                    if(self.currentAlarm[l]!=data){
                                        arr.push(self.currentAlarm[l])
                                    }
                                }
                                self.currentAlarm= arr
                                currentArr= arr
                            }
                        }
                    }
                    if(arrA.length){
                        self.currentAlarm=arrA
                    }
                }else{
                    self.currentAlarm.push(data)
                }
                Array.prototype.unique3 = function(){
                    var res = [];
                    var json = {};
                    for(var i = 0; i < this.length; i++){
                        if(!json[this[i]]){
                            res.push(this[i]);
                            json[this[i]] = 1;
                        }
                    }
                    return res;
                }
                if(currentArr.length&&currentArr!='nothing'){
                    self.currentAlarm=currentArr
                }else if(currentArr=='nothing'){
                    self.currentAlarm=[]
                }
                self.currentAlarm=self.currentAlarm.unique3()
               var obj={
                   id:self.alarmId,
                   rights:'['+self.currentAlarm.toString()+']'
               }
                this.$http.post('/area_admin/set_rights',obj).then(
                    (response) => {
                        response=response.body;
                        let isSuccess= response.code==200;
                        if(isSuccess){
                            //获取列表数据
                            this.initTable();
                        }
                        this.$message({
                            message: response.data||response.message,
                            type:isSuccess?'success':'error'
                        });
                    },
                    (response) => {
                        this.$message({
                            message: response.data,
                            type: 'error'
                        });
                    });
                self.num=1;
            },
            handleSizeChange(val) {
                return false
            },
            //翻页
            handleCurrentChange(val) {
                //获取翻页列表数据
                this.$http.get('/area_admin/list',{params:{'page':val}}).then(function(response) {
                    this.tableData=response.data.data
                },function(response) {
                });
            },
            //添加管理员的按钮
            addAdmin(){
                this.title="添加区域管理员"
                this.dialogFormVisible = true
                this.currentListId.isChange=false;
                this.currentListId.id='';
                this.form.username='';
                this.form.password='';
                this.form.account='';
                this.form.project_id='';
                this.form.area_id='';
            },
            //增加和修改一项的弹框确认
            addarea(){
                if(this.currentListId.isChange){
                    var data=JSON.parse(JSON.stringify(this.form));
                    data.id= this.currentListId.id;
                    this.$http.post('/area_admin/edit',data).then(
                        (response) => {
                            this.dialogFormVisible = false
                            response=response.body;
                            let isSuccess= response.code==200;
                            if(isSuccess){
                                //获取列表数据
                                this.initTable();
                            }
                            this.$message({
                                message: response.data||response.message,
                                type:isSuccess?'success':'error'
                            });
                        },
                        (response) => {
                            this.$message({
                                message: response.data,
                                type: 'error'
                            });
                        });
                }else{
                    this.$http.post('/area_admin/add',this.form).then(
                        (response) => {
                            this.dialogFormVisible = false
                            response=response.body;
                            let isSuccess= response.code==200;
                            if(isSuccess){
                                //获取列表数据
                                this.initTable();
                                this.$message({
                                    message: response.data,
                                    type:'success'
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
            //设置是否开启
            isCommentMsgFn(data){
                this.$http.post('/area_admin/set_status',{'id':data.id}).then(
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