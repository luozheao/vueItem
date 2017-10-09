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
          <iframe id="MainBody" width="100%" scrolling="auto" frameborder="0" src="http://www.4ajf.cn/AdminWeb/ManagerPage/Questionnaire/questionnaireManager.aspx" height="332"></iframe>
      </div>
</template>

<script>
    import $ from 'jquery';
    export default {
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
        created(){}
    }
</script>


