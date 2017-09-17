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
            <p class="title">区域问卷分数统计排行</p>
            <div class="bodyBox">

                <el-table
                        :data="tableData"
                        max-height="250"
                        border
                        style="margin-top: 10px;">
                    <el-table-column
                            prop="queationName"
                            label="问卷名称"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="queationNum"
                            label="问卷目前总分数"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="queationListNum"
                            label="当前名次"
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
                currentPageNum:1,
                tableData: [{
                    queationName: '',
                    queationNum: '',
                    queationListNum:'',
                    doning: ''
                }]
            }
        },
        methods: {
            init(){
                this.tableData=[{
                    queationName: '客房问卷',
                    queationNum: '100',
                    queationListNum:'1',
                }]
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
            }
        },
        created() {
            this.init();
        },

    }
</script>