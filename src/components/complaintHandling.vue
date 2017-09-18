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
                        :data="tableData"
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
                            <el-button class="noMargin" type="primary" size="mini" @click="installLi(scope)">下载</el-button>
                            <el-button class="noMargin" type="primary" size="mini" @click="writeLi(scope)">填写处理结果</el-button>
                            <el-button class="noMargin" type="danger" size="mini" @click="deleteLi(scope)">删除</el-button>
                            <el-button class="noMargin" type="primary" size="mini" @click="lookLi(scope)">查看</el-button>
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
                nameInput:'',
                listValue:0,
                dateValue:'',
                listOptions:[],
                currentPageNum:1,
                tableData: [{
                    name:'',
                    img:'',
                    area:'',
                    queationName: '',
                    time:'',
                    doning: ''
                }],
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
                this.tableData=[{
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
            deleteLi(val){
                console.log(val)
            },
            lookLi(val){
                console.log(val)
            },
            installList(){
                console.log('2');
            },
            writeLi(){

            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            searchList(){
                console.log('1');
            },
        },
        created() {
            this.init();
        },

    }
</script>