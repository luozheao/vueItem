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
            <p class="title">问卷列表</p>
            <div class="bodyBox">
                <el-row>
                    <el-col :span="24">
                        <el-button type="primary" @click="dialogFormVisible = true">添加问卷</el-button>
                        <el-dialog title="添加问卷" :visible.sync="dialogFormVisible" size="large">
                            <el-form :model="form">
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item label="所属项目">
                                            <el-select v-model="form.region" placeholder="请选择所属项目" style="width: 400px">
                                                <el-option label="一" value="shanghai"></el-option>
                                                <el-option label="二" value="beijing"></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="所属区域">
                                            <el-select v-model="form.area" placeholder="请选择所属区域" style="width: 400px">
                                                <el-option label="区域一" value="shanghai"></el-option>
                                                <el-option label="区域二" value="beijing"></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="绑定号码">
                                            <el-row>
                                                <el-col :span="14">
                                                    <el-input v-model="form.bindPhoneNum" style="width: 320px"></el-input>
                                                    <div style="font-size: 12px;color: red;">请将该号码发给对应的区域领导，在微信里绑定即可！</div>
                                                </el-col>
                                                <el-col :span="3">
                                                    <el-button type="primary" @click="getNum">生成</el-button>
                                                </el-col>
                                            </el-row>
                                        </el-form-item>
                                        <el-form-item label="领导姓名">
                                            <el-input v-model="form.name" style="width: 400px"></el-input>
                                        </el-form-item>
                                        <el-form-item label="领导手机">
                                            <el-input v-model="form.phoneNum" style="width: 400px"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-col :span="12">
                                            <img :src="erweima" style="width:78%">
                                            <div style="font-size: 12px;color: red;">
                                                注意：首先领导用手机微信关注服务号或者查找添加 “扫码点评”微信公众号，并绑定刚生成的绑定号码就能在有投诉的时候接收到微信提醒。
                                            </div>
                                        </el-col>
                                        <el-col :span="12">
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
                        <el-select v-model="areaValue" placeholder="请选择区域">
                            <el-option
                                    v-for="item in options"
                                    :key="item.areaValue"
                                    :label="item.areaLabel"
                                    :value="item.areaValue">
                            </el-option>
                        </el-select>
                        <el-input style="display: inline-block;width:300px;"
                                  placeholder="问卷名称"
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
                            prop="name"
                            label="问卷名称(点击名称快速修改)"
                    >
                    </el-table-column>
                    <el-table-column
                            label="二维码"
                    >
                        <template scope="scope">
                            <img :src="scope.row.img" style="width:100%;height: 100%"/>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="questionAddres"
                            label="问卷地址"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="isSend"
                            label="是否开启"
                    >
                        <template scope="scope">
                            <el-button type="primary" size="small" @click="isSendFn(scope)">已开启</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="peopleNum"
                            label="参与人数"
                    >
                    </el-table-column>

                    <el-table-column
                            prop="lookAll"
                            label="查看统计"
                    >
                        <template scope="scope">
                            <el-button type="primary" size="small" @click="lookAllFn(scope)">查看统计</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="setCustomPage"
                            label="设置自定义页面"
                    >
                        <template scope="scope">
                            <el-button type="primary" size="small" @click="setCustomPageFn(scope)">自定义页面</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="whiteList"
                            label="白名单"
                    >
                        <template scope="scope">
                            <el-button type="primary" size="small" @click="whiteListFn(scope)">管理白名单</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="blackList"
                            label="黑名单"
                    >
                        <template scope="scope">
                            <el-button type="primary" size="small" @click="blackListFn(scope)">管理黑名单</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="managementPosition"
                            label="定位限制"
                    >
                        <template scope="scope">
                            <el-button type="primary" size="small" @click="managementPositionFn(scope)">管理位置</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="createTime"
                            label="创建时间"
                    >
                    </el-table-column>
                    <el-table-column
                            label="操作" style="padding: 0;">
                        <template scope="scope">
                            <el-button type="info" size="mini" @click="changeLi(scope)" style="margin: 0">修改</el-button>
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
                currentPageNum:1,
                erweima:'src/images/smdpfwh.jpg',
                weixin:'src/images/tsxxt.jpg',
                dialogFormVisible:false,
                tableData: [{
                    name:'',
                    questionAddres:'',
                    img:'',
                    isSend:'',
                    peopleNum:'',
                    lookAll:'',
                    setCustomPage:'',
                    whiteList:'',
                    blackList:'',
                    managementPosition:'',
                    createTime:''
                }],
                form:{
                    region:'',
                    area:'',
                    bindPhoneNum:'',
                    name:'',
                    phoneNum:''
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
                this.tableData=[{
                    name:'维多利亚酒店同济地铁店私人管家服务',
                    img:'src/images/erweima.png',
                    questionAddres:'http://www.4ajf.cn/WebServer/webphone/questionnaire.aspx?QKey=a397074e985d4b6083e4d68f0d1d8420',
                    isSend:'',
                    peopleNum:'101',
                    lookAll:'',
                    setCustomPage:'',
                    whiteList:'',
                    blackList:'',
                    managementPosition:'',
                    createTime:'2017/9/16 11:25:18'
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
            },
            isSendFn(){

            },
            isBindFn(){

            },
            isCommentMsgFn(){

            },
            isStatistics(){

            },
            getNum(){

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