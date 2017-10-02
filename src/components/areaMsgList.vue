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
</style>

<template>
    <div>
        <div class="box">
            <p class="title">区域信息列表</p>
            <div class="bodyBox">
                <el-row>
                    <el-col :span="24">
                        <el-button type="primary" @click="addAreaMsg">添加区域信息</el-button>
                        <el-dialog title="添加区域信息" :visible.sync="dialogFormVisible">
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
                                <el-form-item label="区域名称" :label-width="formLabelWidth">
                                    <el-input v-model="form.name" auto-complete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="区域备注" :label-width="formLabelWidth">
                                    <el-input type="textarea" v-model="form.remark"></el-input>
                                </el-form-item>
                            </el-form>
                            <div slot="footer" class="dialog-footer">
                                <el-button @click="dialogFormVisible = false">取 消</el-button>
                                <el-button type="primary" @click="addarea">确 定</el-button>
                            </div>
                        </el-dialog>
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
                        style="margin-top: 10px;">
                    <el-table-column
                            prop="name"
                            label="区域名称"
                            >
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
                            <el-button type="info" size="mini"  @click="changeLi(scope.$index, tableData)">修改</el-button>
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
//        props: ['param', 'data'],
        data() {
            return  {
                inputSearch:'',
                isChange:false,
                currentId:'',
                formLabelWidth:'120px',
                current_page:0,
                dialogFormVisible:false,
                tableData:{
                    data:[{
                        name: '',
                        remark:'',
                        created_at: '',
                        id: ''
                        }],
                    current_page: 0,
                    from: 1,
                    last_page: 2,
                    next_page_url: "http://localhost:809/area/area_list?page=2",
                    path: "http://localhost:809/area/area_list",
                    per_page: 2,
                    prev_page_url: null,
                    to: 2,
                    total: 3
                },
                form:{
                    region:[{
                        id:'',
                        project:''
                    }],
                    name:'',
                    remark:'',
                    project_id:'',
                }
            }
        },
        methods: {
            init(){
                //获取列表数据
               this.initTable();

                //获取所属项目下拉框
                this.$http.get('/area/beyond_project',{}).then(function(response) {
                    this.form.region=response.data.data
                    console.log(this.form.region)
                },function(response) {
                });

            },
            initTable(){
                //获取列表数据
                this.$http.get('/area/area_list',{params:{'page':1}}).then(function(response) {
                    this.tableData=response.data.data
                },function(response) {

                });
            },
            //点击添加区域
            addAreaMsg(){
                this.dialogFormVisible = true
                this.isChange=false
            },
            //搜索按钮
            inputSearchClick(val){
                this.$http.get('/area/search',{params:{'keyword':this.inputSearch}}).then(function(response) {
                    if(response.data.data.length){
                        this.tableData.data=response.data.data
                    }

                },function(response) {
                });
            },
            //删除一项
            deleteLi(index, data){
                if(data){
                    this.$http.post('/area/delete',{'id':data.id}).then(
                        function(response) {
                    let isSuccess= response.data.code=='200';
                            if(isSuccess){
                                this.initTable();
                            }
                    this.$message({
                        message: response.data.message,
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
            //修改一项
            changeLi(index, rows){
               this.dialogFormVisible = true
                this.isChange=true
                this.currentId=this.tableData.data[index].id;
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            //添加页面的确定按钮
            addarea(){
                if(this.isChange){
                    var data=JSON.parse(JSON.stringify(this.form));
                    data.id= this.currentId;
                    this.$http.post('/area/edit',data).then(function(response) {
                        this.form.region=response.data.data
                        let isSuccess= response.body.code=='200';
                        if(isSuccess){
                            this.initTable();
                        }
                        this.$message({
                            message: response.data.data,
                            type:isSuccess?'success':'error'
                        });
                    },function(response) {
                        this.$message({
                            message: response.data,
                            type: 'error'
                        });
                    });
                }else{
                    this.$http.post('/area/add',this.form).then(function(response) {
                        this.form.region=response.data.data
                        let isSuccess= response.code=='200';
                        if(isSuccess){
                            this.initTable();
                        }
                        this.$message({
                            message: response.data.data,
                            type:isSuccess?'success':'error'
                        });
                        this.initTable();
                    },function(response) {
                        this.$message({
                            message: response.data,
                            type: 'error'
                        });
                    });
                }

                this.dialogFormVisible = false
            }
        },
        created() {
            this.init();
        },
    }
</script>