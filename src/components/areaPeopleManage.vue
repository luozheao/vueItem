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
        <div class="box">
            <p class="title">区域管理员列表</p>
            <div class="bodyBox">
                <el-row>
                    <el-col :span="24">
                        <el-button type="primary" @click="dialogFormVisible = true">添加区域管理员</el-button>
                        <el-dialog title="添加区域管理员" :visible.sync="dialogFormVisible">
                            <el-form :model="form">
                                <el-form-item label="所属项目" :label-width="formLabelWidth">
                                    <el-select v-model="form.region" placeholder="请选择所属项目">
                                        <el-option label="区域一" value="shanghai"></el-option>
                                        <el-option label="区域二" value="beijing"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="区域名称" :label-width="formLabelWidth">
                                    <el-input v-model="form.name" auto-complete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="区域备注" :label-width="formLabelWidth">
                                    <el-input type="textarea" v-model="form.desc"></el-input>
                                </el-form-item>
                            </el-form>
                            <div slot="footer" class="dialog-footer">
                                <el-button @click="dialogFormVisible = false">取 消</el-button>
                                <el-button type="primary" @click="addarea">确 定</el-button>
                            </div>
                        </el-dialog>
                        <el-select v-model="areaValue" placeholder="请选择区域">
                            <el-option
                                    v-for="item in options"
                                    :key="item.areaValue"
                                    :label="item.areaLabel"
                                    :value="item.areaValue">
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
                            <span v-show='tableData.data.status==0'>未开启</span>
                            <span v-show='tableData.data.status!=1'>开启</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="hasViewModel"
                            label="查看权限"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="createTime"
                            label="创建时间"
                    >
                    </el-table-column>
                    <el-table-column
                            label="操作">
                        <template scope="scope">
                            <el-button type="danger" size="mini" @click="deleteLi(scope)">删除</el-button>
                            <el-button type="info" size="mini" @click="changeLi(scope)">修改</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="block" style="text-align: right;margin-top: 5px;">
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page.sync="currentPageNum"
                            layout="total, prev, pager, next"
                            :total="tableData.length">
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
                formLabelWidth:'120px',
                currentPageNum:1,
                dialogFormVisible:false,
                tableData:{
                    "current_page": '',
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
                    name:'',
                    desc:''
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
                this.$http.get('/area_admin/list',{params:{'page':1}}).then(function(response) {
                    this.tableData=response.data.data={
                        "current_page": 1,
                        "data": [
                            {
                                "id": 6,
                                "username": "dddddd",
                                "phone": "abcddd",
                                "status": 0,
                                "rights": [],
                                "created_at": "2017-09-24 14:28:49"
                            }
                        ],
                        "from": 1,
                        "last_page": 1,
                        "next_page_url": null,
                        "path": "http://localhost:809/area_admin/list",
                        "per_page": 10,
                        "prev_page_url": null,
                        "to": 1,
                        "total": 1
                    }
                },function(response) {
                });
            },
            inputSearchClick(val){
                console.log(this.inputSearch)
            },
            deleteLi(val){
                console.log(val)
            },
            changeLi(val){
                console.log(val)
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            addarea(){
                this.dialogFormVisible = false
                console.log('加多一行')
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