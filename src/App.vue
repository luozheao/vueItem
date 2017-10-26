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
        <el-tree
                ref="tree"
                :data="data3"
                node-key="id"
                accordion
                check-strictly
                show-checkbox
                @check-change="checkChange"
                @node-click="nodeClick"
                :default-expanded-keys="[1,3]"
               >
        </el-tree>
        <el-button @click="sure">确定</el-button>
        <el-button @click="checkClear">清空</el-button>
    </div>
</template>
<script>
    import $ from 'jquery';
    export default {
        data() {
            return {
                currentChecked:[],
                data3: [{
                    id: 1,
                    label: 'A',
                    disabled: true,
                    children: [{
                        id: 3,
                        label: 'B',
                        disabled: true,
                        children: [{
                            id: 4,
                            label: 'C1'
                        }, {
                            id: 5,
                            label: 'C2',
                        }]
                    }
                    ]
                }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }

            }
        },
        methods: {
            sure(){
               console.log( this.$refs.tree.getCheckedKeys());
            },
            nodeClick(node,$node){
                console.log(node,$node);
            },
            //清空
            checkClear(){
                this.$refs.tree.setCheckedKeys([]);
            },
            checkChange(node,isChecked){
                //单选功能实现
                if(isChecked){
                    this.$refs.tree.setCheckedKeys([node.id]);
                    //选中后,触发点击
                    this.$nextTick(function(){
                        $('.el-checkbox__input.is-checked').parents('.el-tree-node')[0].click();
                    });
                }

            }
        },
        components: {},
        created() {

        },
        mounted() {

        }
    }
</script>


