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
                                <el-input v-model="form.address"></el-input>
                            </el-form-item>
                            <el-form-item label="桌号/房间号">
                                <div class="sub-title">激活即列出输入建议</div>
                                <el-input type="textarea" v-model="form.desc"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                                <el-button>取消</el-button>
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
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                }
            }
        },
        methods: {
            init(){

            },
            onSubmit() {
                console.log('submit!');
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