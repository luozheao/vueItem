<style>
    #app {
        font-family: Helvetica, sans-serif;
        text-align: center;
    }
</style>

<template>
    <div id="app">
        <el-table
                ref="multipleTable"
                :data="tableData3"
                border
                tooltip-effect="dark"
                style="width: 100%"
               >
            <el-table-column type="expand">
                <template scope="scoped">
                    <el-table
                            ref="multipleTable2"
                            :data="scoped.row.table"
                            border
                            tooltip-effect="dark"
                            style="width: 100%"
                            >
                        <el-table-column
                                type="selection"
                                reserve-selection="true"
                                width="55">
                        </el-table-column>
                        <el-table-column
                                label="姓名"
                                prop="name"
                               >
                        </el-table-column>
                        <el-table-column
                                label="年龄"
                                prop="age"
                                >
                        </el-table-column>
                    </el-table>


                </template>
            </el-table-column>
            <el-table-column
                    label="日期"
                    width="120">
                <template scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="姓名"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="地址"
                    show-overflow-tooltip>
            </el-table-column>
        </el-table>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>

        <el-button @click.native="startHacking">Yes!</el-button>
        <router-link to="/test">test</router-link>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData3: [
                    {
                        date: '2016-05-03',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄',
                        table:[
                            {
                                name:'luojie',
                                age:18
                            },
                            {
                                name:'luozheao',
                                age:28
                            },
                        ]
                    },
                    {
                        date: '2016-05-02',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄',
                        table:[
                            {
                                name:'luojie',
                                age:18
                            },
                            {
                                name:'luozheao',
                                age:28
                            },
                        ]
                    }
                ]
            }
        },

        methods: {
            startHacking() {
                this.$notify({
                    title: 'Shhh',
                    message: 'Just be patient...',
                    duration: 6000
                })
            }
        }
    }
</script>


