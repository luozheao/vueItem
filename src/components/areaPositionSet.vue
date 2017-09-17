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
    .img{
        background:url("../images/erweima.jpg") no-repeat;
        background-size:100% 100%;
        height: 400px;
    }
    .titleFont{
        font-size: 12px;
        line-height: 20px;
        color: #666666;
    }
</style>

<template>
    <div>
        <div class="box">
            <p class="title">桌号/房间号</p>
            <div class="bodyBox">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form ref="form" :model="form" label-width="100px">
                            <el-form-item label="问卷地址">
                                <el-col :span="24">
                                <el-input v-model="form.address"></el-input>
                                </el-col>
                            </el-form-item>
                            <el-form-item label="桌号/房间号">
                                <el-col :span="24">
                                <div class="sub-title titleFont">(如输入：01--50或01桌--50桌，可以批量生成编号。)最多生成100个编号(一个编号对应一个二维码)</div>
                                </el-col>
                                <el-col :span="6">
                                    <el-input v-model="stater" placeholder="开始"></el-input>
                                </el-col>
                                <el-col :span="2">
                                    --
                                </el-col>
                                <el-col :span="6">
                                    <el-input v-model="ender" placeholder="结束"></el-input>
                                </el-col>
                                <el-col :span="6">
                                    <el-button type="primary" @click="getNum">生成编号</el-button>
                                </el-col>

                            </el-form-item>
                            <el-form-item label="编号">
                                <el-col :span="24">
                                    <div class="sub-title titleFont">(注：如果桌号房间号是汉字，可以直接在下方输入汉字，多个用换行区分不需要任何标点符号，汉字不能超过5个，否则无法生成。)</div>
                                </el-col>
                                <el-col :span="24">
                                    <el-input
                                            type="textarea"
                                            :rows="10"
                                            v-model="textarea">
                                    </el-input>
                                </el-col>
                            </el-form-item>
                            <el-form-item>
                                <el-col :span="24">
                                <el-button type="primary" @click="onSubmit">生成二维码</el-button>
                                </el-col>
                            </el-form-item>
                        </el-form>
                    </el-col>
                    <el-col :span="12">
                        <div class='img'></div>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script type="es6">
    export default {
        data() {
            return {
                textarea:'',
                stater:'',
                ender:'',
                form: {
                    address:''
                }
            }
        },
        methods: {
            init(){

            },
            onSubmit() {
                console.log('submit!');
            },
            getNum(){
                if(this.stater>this.ender){
                    this.$message.error('结束要大于开始哦');
                }else{
                    var html='';
                    for(var i=0;i<=(this.ender-this.stater);i++){
                        html+=(i+parseInt(this.stater))+'\n'
                    }
                   this.textarea=html
                }
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