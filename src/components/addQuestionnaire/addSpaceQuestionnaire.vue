<style lang="less" type="text/less" >
    #addSpaceQuestionnaire{

    }
</style>
<style lang="less" type="text/less" scoped>
    #addSpaceQuestionnaire{

    }
</style>
<template>
      <div id="addSpaceQuestionnaire">
          <el-row  >
              <el-col :span="24" class="backWraper"><div class="back" :plain="true" size="small" @click="goBack">返回上一页</div></el-col>
          </el-row>
          <iframe ref="MainBody" id="MainBody" width="100%" scrolling="auto" frameborder="0" src="" height="600"></iframe>
      </div>
</template>

<script>
    import $ from 'jquery';
    export default {
        props:['QName'],
        components: {},
        data() {
            return {}
        },
        methods:{
            //返回上一页
            goBack(){
                this.$emit('goBack');
            },

        },
        created(){},
        mounted(){

            if(document.domain=='localhost'){
                document.getElementById('MainBody').src="/questionnaire/questionnaire.html";
            }else {
                document.getElementById('MainBody').src="http://101.200.39.173/lza/questionnaire/questionnaire.html";
            }

            //赋值问卷名
            window.QName=this.QName;
        },
    }
</script>


