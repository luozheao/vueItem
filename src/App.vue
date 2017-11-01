<style lang="less" type="text/less"  >
   .hello{
       input[disabled='disabled']{
           display: none;
       }
       .el-checkbox__input.is-disabled .el-checkbox__inner{
           display: none;
       }
   }
</style>
<template>
    <div class="hello">
        docsify serve docs
        <el-button @click="hello">sure</el-button>
    </div>
</template>
<script>
    import $ from 'jquery';
    import  {aaa as myMixin} from './App2.js'
    export default {
        components: {},
        data() {
            return {}
        },
        mixins: [myMixin],
        methods: {},
        created() {

        },
        mounted() {

        }
    }
</script>


