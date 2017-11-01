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
        background:no-repeat;
        background-size:100% 100%;
        height: 100px;
        width: 100px;
        float: left;
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
                                    <el-input v-model.number.trim="stater" placeholder="开始"></el-input>
                                </el-col>
                                <el-col :span="2">
                                    --
                                </el-col>
                                <el-col :span="6">
                                    <el-input v-model.number.trim="ender" placeholder="结束"></el-input>
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
                    <el-col :span="12" style="height:450px;overflow: auto;">
                        <el-col :span="24">
                        <div>地址：{{codeNum}}</div>

                        </el-col>
                        <el-row :span="24">

                                <div  v-for="item in imgList" class='img' @mouseenter="hoverChangeAddress(item.codeUrl)" v-html="item.imgStr"></div>

                        </el-row>
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
                codeNum:"",
                textarea:'',
                stater:'',
                ender:'',
                QKey:'',
                imgList:[],
                form: {
                    address:''
                }
            }
        },
        methods: {
            init(){

            },
            onSubmit() {
                if(this.form.address!=""){

                    this.Qkey=this.form.address.split('?')[1].split('&')[0].split('=')[1];

                    var reg=/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
                    if(!reg.test(this.form.address)){
                        this.$message('输入网址不正确')
                    }else{
                       let arr=this.textarea.split('\n');
                       let arr2=[];
                       for(var i=0;i<arr.length;i++){
                           let val=arr[i];
                           if(val){
                               arr2.push({
                                   codeUrl:this.getCodeImgUrl(val),
                                   imgStr:this.getCodeImg(val),
                               })
                           }
                       }

                       //注入
                       this.imgList=arr2;
                    }
                }
                else{
                    this.$message.error('请输入问卷地址!');
                }
            },
            getCodeImg(data){
                return '<img src="http://scan.luampm.com/question/get_question_qrc?url=http://scan.luampm.com/lza/weixinQuestionnaire/index.html?QKey='+this.Qkey+'&expand='+data+'" style="width:100%;height: 100%"/>'
            },
            getCodeImgUrl(data){
                return "http://scan.luampm.com/lza/weixinQuestionnaire/index.html?QKey="+this.Qkey+"&expand="+data;
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
            },
            hoverChangeAddress(num){
                this.codeNum=num
            }
        },
        created() {
            this.init();
        },
        mounted() {

        }

    }
</script>