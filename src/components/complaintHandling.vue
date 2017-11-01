<style type="text/less" scoped>
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
    .noMargin{
        margin: 0 2px;
    }
</style>

<template>
    <div>
        <div class="box">
            <p class="title">处理进程</p>
            <div class="bodyBox">
                <el-input v-model="form.WUName" placeholder="请输入昵称" style="width: 200px;"></el-input>
                <el-select v-model="form.state">
                    <el-option
                            v-for="item in listOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-date-picker
                        v-model="form.startTime"
                        type="date"
                        placeholder="选择开始日期"
                        :picker-options="pickerOptions0">
                </el-date-picker>
                <el-date-picker
                        v-model="form.stopTime"
                        type="date"
                        placeholder="选择结束日期"
                        :picker-options="pickerOptions0">
                </el-date-picker>
                <el-button type="primary" @click="searchList">查询</el-button>
                <el-button type="primary" @click="installList" style="margin-left: 5px;">导出</el-button>
                <el-table
                        :data="tableData.data"
                        max-height="400"
                        border
                        style="margin-top: 10px;">
                    <el-table-column
                            prop="username"
                            label="姓名"
                            width="100"
                    >
                    </el-table-column>
                    <el-table-column
                            label="头像"
                            width="100"
                            header-align="center">
                        <template scope="scope">
                            <img :src="scope.row.user.icon" style="width:100%;height: 100%"/>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="question.area.name"
                            label="区域"
                            width="100"
                    >
                    </el-table-column>
                    <el-table-column
                            label="问卷名称"
                            width="300"
                    >
                        <template scope="scope">
                            {{scope.row.question.QName}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="created_at"
                            label="提交时间"
                    >
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            width="270"
                    >
                        <template scope="scope">
                            <el-button v-show="!scope.row.question.isShow" class="noMargin" type="primary" size="mini" @click="installLi(scope.row)">下载</el-button>
                            <el-button  v-show="!scope.row.question.isShow" class="noMargin" type="primary" size="mini" @click="writeLi(scope.row)">填写处理结果</el-button>
                            <el-button  class="noMargin" type="danger" size="mini" @click="deleteLi(scope.row)">删除</el-button>
                            <el-button v-show="!scope.row.question.isShow" class="noMargin" type="primary" size="mini" @click="lookLi(scope.row)">查看</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-dialog title="填写处理结果" :visible.sync="writeLiVisible" size="small">
                    <el-form>
                        <el-form-item label="处理结果：">
                            <el-input type="textarea" v-model="result"></el-input>
                        </el-form-item>
                    </el-form>

                    <div slot="footer" class="dialog-footer">
                        <el-button @click="writeLiVisible = false">取 消</el-button>
                        <el-button type="primary" @click="addWriteResult">确 定</el-button>
                    </div>

                </el-dialog>
                <el-dialog title="问卷查看" :visible.sync="lookLiVisible" size="large">
                    <div slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="lookLiVisibleFn">确定</el-button>
                    </div>

                </el-dialog>
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
//        props: ['param', 'data'],
        data() {
            return  {
                form:{
                    WUName:'',
                    state:-1,
                    startTime:'',
                    stopTime:'',
                    SID:-1
                },
                listOptions:[],
                result:'',
                resultId:'',
                currentPageNum:1,
                writeLiVisible:false,
                lookLiVisible:false,
                tableData:{
                    "current_page": 0,
                    "data":  [{
                        username:'',
                        StudioInfo_SID:'',
                        created_at:'',
                        deal_result:'',
                        deleted_at:'',
                        expand:'',
                        id:'',
                        leader_id:'',
                        progress:'',
                        question:'',
                        question_answer:'',
                        question_id:'',
                        status:'',
                        updated_at:"",
                        user:'',
                        user_id:''
                    }],
                    "from": '',
                    "last_page": '',
                    "next_page_url": null,
                    "path": "http://localhost:809/area_admin/list",
                    "per_page": 10,
                    "prev_page_url": null,
                    "to": 1,
                    "total": 1
                },
                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
                pickerOptions1: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
            }
        },
        methods: {
            init(){
                //获取列表数据
                this.initTable();
                this.listOptions=[{
                    label:'所有',
                    value:-1
                },{
                    label:'未解决',
                    value:0
                },{
                    label:'已解决',
                    value:2
                },{
                    label:'解决中',
                    value:1
                }]
            },
            initTable(){
                //获取列表数据
                this.$http.get('/handle/list').then(function(response) {
                    this.tableData=response.data.data
                    let arr=this.tableData.data
                    for(var i=0;i<arr.length;i++){
                        if(arr[i].progress.length){
                            for(var k=0;k<arr[i].progress.length;k++){
                                if(k==arr[i].progress.length-1){
                                    if(arr[i].progress[k].status==0){
                                        arr[i].question.QName
                                    }else if(arr[i].progress[k].status==1){
                                        arr[i].question.QName+=' 解决中'
                                        arr[i].question.isShow=true
                                    }else if(arr[i].progress[k].status==2){
                                        arr[i].question.QName+=' 已解决'
                                        arr[i].question.isShow=true
                                    }
                                }
                            }
                        }
                    }
                    this.tableData.data=arr
                },function(response) {
                });
            },
            //删除一项
            deleteLi(row){
                let self=this;
                this.$confirm('是否删除'+row.username+'?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(function () {
                    self.$http.post('/handle/delete_answer',{'id':row.id}).then(
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
                }).catch(function () {
//                    this.$message({
//                        type: 'info',
//                        message: '已取消删除'
//                    });
                })
            },
            //下载
            installLi(row){
                this.$http.get('',{params:{'page':1}}).then(function(data) {

                },function (data) {

                })
            },
            //查看一项
            lookLi(row){
                this.lookLiVisible=true
                this.$http.get('/handle/question_info',{params:{'id':row.id}}).then(function(data) {
                    debugger
                },function (data) {

                })
            },
            //查看一项的确定按钮
            lookLiVisibleFn(){
                this.lookLiVisible=false
            },
            //导出
            installList(){
                this.$http.get('',{params:{'page':1}}).then(function(data) {

                },function (data) {

                })
            },
            //填写处理结果
            writeLi(row){
                this.writeLiVisible=true
                this.resultId=row.id;
                this.result=''
            },
            //确定填写处理结果
            addWriteResult(){
                this.$http.post('/handle/write_result',{'id':this.resultId,'result':this.result}).then(
                    function(response) {
                        let isSuccess= response.data.code=='200';
                        if(isSuccess){
                            this.initTable()
                            this.writeLiVisible=false
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
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            //翻页
            handleCurrentChange(val) {
                //获取翻页列表数据
                this.$http.get('/handle/list',{params:{'page':val}}).then(function(response) {
                    this.tableData=response.data.data
                    let arr=this.tableData.data
                    for(var i=0;i<arr.length;i++){
                        if(arr[i].progress.length){
                            for(var k=0;k<arr[i].progress.length;k++){
                                if(k==arr[i].progress.length-1){
                                    if(arr[i].progress[k].status==0){
                                        arr[i].question.QName
                                    }else if(arr[i].progress[k].status==1){
                                        arr[i].question.QName+=' 解决中'
                                        arr[i].question.isShow=true
                                    }else if(arr[i].progress[k].status==2){
                                        arr[i].question.QName+=' 已解决'
                                        arr[i].question.isShow=true
                                    }
                                }
                            }
                        }
                    }
                    this.tableData.data=arr
                },function(response) {
                });
            },
            //点击搜素
            searchList(){
                var a=this.form.startTime.getTime()
               this.form.startTime=new Date(parseInt(a)).toLocaleString().substr(0,10).replace(/\//g, "-");
                var b=this.form.stopTime.getTime()
               this.form.stopTime=new Date(parseInt(b)).toLocaleString().substr(0,10).replace(/\//g, "-");
                this.$http.get('/handle/list',{params:this.form}).then(function(response) {
                    this.tableData=response.data.data
                    let arr=this.tableData.data
                    for(var i=0;i<arr.length;i++){
                        if(arr[i].progress.length){
                            for(var k=0;k<arr[i].progress.length;k++){
                                if(k==arr[i].progress.length-1){
                                    if(arr[i].progress[k].status==0){
                                        arr[i].question.QName
                                    }else if(arr[i].progress[k].status==1){
                                        arr[i].question.QName+=' 解决中'
                                        arr[i].question.isShow=true
                                    }else if(arr[i].progress[k].status==2){
                                        arr[i].question.QName+=' 已解决'
                                        arr[i].question.isShow=true
                                    }
                                }
                            }
                        }
                    }
                    this.tableData.data=arr
                },function(response) {
                });
            },
        },
        created() {
            this.init();
        },

    }
</script>