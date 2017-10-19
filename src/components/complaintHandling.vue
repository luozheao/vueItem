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
                <el-input v-model="nameInput" placeholder="请输入昵称" style="width: 200px;"></el-input>
                <el-select v-model="listValue">
                    <el-option
                            v-for="item in listOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-date-picker
                        v-model="dateValue"
                        type="daterange"
                        align="right"
                        placeholder="选择日期范围"
                        :picker-options="pickerOptions2">
                </el-date-picker>
                <el-button type="primary" @click="searchList">查询</el-button>
                <el-button type="primary" @click="installList" style="margin-left: 5px;">导出</el-button>
                <el-table
                        :data="tableData.data"
                        max-height="400"
                        border
                        style="margin-top: 10px;">
                    <el-table-column
                            prop="name"
                            label="姓名"
                            width="100"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="img"
                            label="头像"
                            width="100"
                            header-align="center">
                        <template scope="scope">
                            <img :src="scope.row.img" style="width:100%;height: 100%"/>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="area"
                            label="区域"
                            width="100"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="queationName"
                            label="问卷名称"
                            width="300"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="time"
                            label="提交时间"
                    >
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            width="270"
                    >
                        <template scope="scope">
                            <el-button class="noMargin" type="primary" size="mini" @click="installLi(scope.row)">下载</el-button>
                            <el-button class="noMargin" type="primary" size="mini" @click="writeLi(scope.row)">填写处理结果</el-button>
                            <el-button class="noMargin" type="danger" size="mini" @click="deleteLi(scope.row)">删除</el-button>
                            <el-button class="noMargin" type="primary" size="mini" @click="lookLi(scope.row)">查看</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-dialog title="填写处理结果" :visible.sync="writeLiVisible" size="small">
                    <el-form>
                        <el-form-item label="处理结果：">
                            <el-input type="textarea" v-model="writeResult"></el-input>
                        </el-form-item>
                    </el-form>

                    <div slot="footer" class="dialog-footer">
                        <el-button @click="writeLiVisible = false">取 消</el-button>
                        <el-button type="primary" @click="addWriteResult">确 定</el-button>
                    </div>

                </el-dialog>
                <el-dialog title="问卷查看" :visible.sync="lookLiVisible" size="large">
                    <div slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="lookLiVisibleFn">谁谁谁处理中...</el-button>
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
                nameInput:'',
                listValue:0,
                dateValue:'',
                listOptions:[],
                writeResult:'',
                currentPageNum:1,
                writeLiVisible:false,
                lookLiVisible:false,
                tableData:{
                    "current_page": 0,
                    "data":  [{
                        name:'',
                        img:'',
                        area:'',
                        queationName: '',
                        time:'',
                        doning: ''
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
                pickerOptions2: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
            }
        },
        methods: {
            init(){
                //获取列表数据
                this.initTable();
                this.listOptions=[{
                    label:'全部',
                    value:0
                },{
                    label:'未解决',
                    value:1
                },{
                    label:'已解决',
                    value:2
                },{
                    label:'处理中',
                    value:3
                }]
            },
            initTable(){
                //获取列表数据
                this.$http.get('/area_admin/list',{params:{'page':1}}).then(function(response) {
                    this.tableData=response.data.data
                    this.tableData.data=[{
                        name: '风轻扬',
                        img: 'src/images/0.jpg',
                        area: '客房',
                        queationName: '维多利亚酒店同济地铁店私人管家服务',
                        time: '2017-09-18 20:30:04',
                        doning: ''
                    },{
                        name:'大师傅',
                        img:'src/images/1.jpg',
                        area:'客房',
                        queationName: '维多利亚酒店同济地铁店私人管家服务',
                        time:'2017-09-18 20:30:04',
                        doning: ''
                    },{
                        name:'大师傅',
                        img:'src/images/1.jpg',
                        area:'客房',
                        queationName: '维多利亚酒店同济地铁店私人管家服务',
                        time:'2017-09-18 20:30:04',
                        doning: ''
                    }];
                },function(response) {
                });
            },
            //删除一项
            deleteLi(row){
                this.$confirm('是否删除'+row.username+'?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(function () {
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
                }).catch(function () {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                })
            },
            //下载
            installLi(row){
                this.$http.get('',{params:{'page':1}}).then(function(data) {

                },function (data) {

                })
            },
            //查看一项
            lookLi(val){
                this.lookLiVisible=true
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
            },
            //确定填写处理结果
            addWriteResult(){
                return false
                this.$http.post('',{'id':row.id}).then(
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
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            //翻页
            handleCurrentChange(val) {
                //获取翻页列表数据
                this.$http.get('/area_admin/list',{params:{'page':val}}).then(function(response) {
                    this.tableData=response.data.data
                },function(response) {
                });
            },
            //点击搜素
            searchList(){
                this.$http.get('/area_admin/search',{params:{'keyword':this.inputSearch,'area_id':this.id}}).then(function(response) {
                    this.tableData=response.data.data
                },function(response) {
                });
            },
        },
        created() {
            this.init();
        },

    }
</script>