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
                        :data="tableData"
                        max-height="250"
                        border
                        style="width: 100% ;margin-top: 10px;">
                    <el-table-column
                            prop="adminName"
                            label="管理员名字"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="adminNum"
                            label="管理账号"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="isTure"
                            label="是否开启"
                    >
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
//        props: ['param', 'data'],
        data() {
            return  {
                inputSearch:'',
                formLabelWidth:'120px',
                currentPageNum:1,
                dialogFormVisible:false,
                tableData: [{
                    adminName: '',
                    adminNum:'',
                    isTure:'',
                    hasViewModel:'',
                    createTime: '',
                    doning: ''
                }],
                form:{
                    region:'',
                    name:'',
                    desc:''
                },
                options:[{
                    areaValue: '',
                    areaLabel: ''
                }]
            }
        },
        methods: {
            init(){
                this.tableData=[{
                    adminName: '客房',
                    adminNum:'123456',
                    isTure:'是',
                    hasViewModel:'有',
                    createTime: '2017/7/5 14:06:28',
                }];
                this.options= [{
                    areaValue: '选项1',
                    areaLabel: '黄金糕'
                }, {
                    areaValue: '选项2',
                    areaLabel: '双皮奶'
                }]
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