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
                        <el-button type="primary">添加区域信息</el-button>
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
                        height="250"
                        border
                        style="width: 100% ;margin-top: 10px;">
                    <el-table-column
                            prop="areaName"
                            label="区域名称"
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
                tableData: [{
                    areaName: '',
                    createTime: '',
                    doning: ''
                }]
            }
        },
        methods: {
            init(){
                this.tableData=[{
                    areaName: '客房',
                    createTime: '2017/7/5 14:06:28',
                },{
                    areaName: '客房',
                    createTime: '2017/7/5 14:06:28',
                },{
                    areaName: '客房',
                    createTime: '2017/7/5 14:06:28',
                },{
                    areaName: '客房',
                    createTime: '2017/7/5 14:06:28',
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
            }
        },
        created() {
            this.init();
        },

    }
</script>