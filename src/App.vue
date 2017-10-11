<style lang="less" type="text/less">
    body {
        font-size: 12px;
    }

    body, h1, h2, h3, h4, h5, h6, hr, p, blockquote, dl, dt, dd, ul, ol, li, pre, form, fieldset, legend, button, input, textarea, th, td {
        margin: 0;
        padding: 0;
    }

    h1, h2, h3, h4, h5, h6 {
        font-size: 100%;
    }

    address, cite, dfn, em, var {
        font-style: normal;
    }

    code, kbd, pre, samp {
        font-family: couriernew, courier, monospace;
    }

    small {
        font-size: 12px;
    }

    ul, ol {
        list-style: none;
    }

    a {
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }

    sup {
        vertical-align: text-top;
    }

    sub {
        vertical-align: text-bottom;
    }

    legend {
        color: #000;
    }

    fieldset, img {
        border: 0;
    }

    button, input, select, textarea {
        font-size: 100%;
    }

    table {
        border-collapse: collapse;
        border-spacing: 0;
    }

    #header {
        height: 40px;
        line-height: 40px;
        background: #212121;
    }

    #container {
        position: absolute;
        left: 220px;
        right: 0px;
    }

    .login {
        height: 15px;
        border-left: 1px solid white;
        line-height: 15px;
        margin-top: 12.5px;
        margin-left: 5px;
        padding-left: 5px;
    }

    #leftMenu {
        position: absolute;
        width: 200px;
        left: 0;
        top: 40px;
        height: 100%;
        background: #3d3d3d;
        & > .el-menu {
            border-radius: 0;
        }
        .el-menu--dark {
            background: #3d3d3d;
        }
        .el-menu-item,
        .el-submenu__title {
            min-width: 100px;
            height: 40px;
            line-height: 40px;

            border-bottom: 1px solid #5c5c5c;
            &:hover {
                background: #303030;
            }
            &.is-active {
                background: #4b8df8;
                color: white;
            }
        }
        .gray {
            color: #bdbdbd;
        }
    }

    .back {
        &:hover {
            border: 1px solid #20a0ff;
            color: #20a0ff;
        }
        background: url("./images/back.png") no-repeat 1px 2px;
        padding-left: 28px;
        width: 76px;
        height: 28px;
        line-height: 28px;
        border: 1px solid #c4c4c4;
        border-radius: 5px;
        cursor: pointer;
    }

    .backWraper {
        background-color: #f5f5f5;
        border-radius: 5px;
        margin-bottom: 5px;
        margin-top: 5px;
        padding: 5px 10px;
    }

    .none {
        display: none;
    }

    .hide {
        display: none !important;
    }

    .pointer {
        cursor: pointer;
    }

    .white {
        color: white
    }

    .pl20 {
        padding-left: 20px;
    }
    .cascaderClassName{
        .green{
            color:dodgerblue;
        }
        .is-active.green{
            color:white;
        }
    }
</style>
<style lang="less" type="text/less" scoped>

</style>
<template>
    <div id="showCascader">
        <div>
            <el-tag
                    v-for="(tag,index) in selectValueList"
                    :key="tag.labelId"
                    :closable="true"
                    type="primary"
                    @close="closeTag(index)"
                    style="margin-right: 10px;"
            >
                {{tag.labelTitle}}
            </el-tag>
        </div>

        <el-button @click="showCascader">请选择标签</el-button>
        <el-cascader
                :options="options"
                :show-all-levels="false"
                expand-trigger="hover"
                v-model="selectValue"
                ref="cascaderRef"
                popper-class="cascaderClassName"
                :props="optionProps"
                @change="changeEvent"
                @active-item-change="itemChangeEvent"
                style="visibility: hidden;margin-top:-30px;position: absolute;top:30px; "
        ></el-cascader>
    </div>
</template>
<script>
    import Vue from 'vue'

    export default {
        data() {
            return {
                maxNum: 5,
                selectValue: [],
                selectValueList: [],
                options: [],
                optionProps: {
                    label: 'labelTitle',
                },
            }
        },
        methods: {
            init() {
                var data = {
                    "msgCode": 200,
                    "message": "请求成功",
                    "data": {
                        "records": [{
                            "labelId": 1,
                            "labelType": 1,
                            "labelTitle": "启动",
                            "useCount": 1,
                            "description": "启动",
                            "labelTypeName": "通用标签"
                        }, {
                            "labelId": 3,
                            "labelType": 1,
                            "labelTitle": "添加",
                            "useCount": null,
                            "description": "添加",
                            "labelTypeName": "通用标签"
                        }, {
                            "labelId": 4,
                            "labelType": 1,
                            "labelTitle": "修改",
                            "useCount": null,
                            "description": "修改",
                            "labelTypeName": "通用标签"
                        }, {
                            "labelId": 5,
                            "labelType": 2,
                            "labelTitle": "删除",
                            "useCount": null,
                            "description": "删除",
                            "labelTypeName": "场景"
                        }, {
                            "labelId": 6,
                            "labelType": 2,
                            "labelTitle": "查看",
                            "useCount": null,
                            "description": "查看",
                            "labelTypeName": "场景"
                        }, {
                            "labelId": 7,
                            "labelType": 2,
                            "labelTitle": "安装",
                            "useCount": null,
                            "description": "安装",
                            "labelTypeName": "场景"
                        }, {
                            "labelId": 8,
                            "labelType": 2,
                            "labelTitle": "部署",
                            "useCount": null,
                            "description": "安装",
                            "labelTypeName": "场景"
                        }, {
                            "labelId": 9,
                            "labelType": 1,
                            "labelTitle": "请求",
                            "useCount": null,
                            "description": "请求",
                            "labelTypeName": "通用标签"
                        }, {
                            "labelId": 10,
                            "labelType": 1,
                            "labelTitle": "关闭",
                            "useCount": null,
                            "description": "关闭",
                            "labelTypeName": "通用标签"
                        }, {
                            "labelId": 11,
                            "labelType": 1,
                            "labelTitle": "分发",
                            "useCount": null,
                            "description": "分发",
                            "labelTypeName": "通用标签"
                        }, {
                            "labelId": 12,
                            "labelType": 6,
                            "labelTitle": "其他",
                            "useCount": null,
                            "description": "其他",
                            "labelTypeName": "其他"
                        }, {
                            "labelId": 13,
                            "labelType": 5,
                            "labelTitle": "软件包",
                            "useCount": null,
                            "description": "软件包",
                            "labelTypeName": "文件"
                        }, {
                            "labelId": 14,
                            "labelType": 5,
                            "labelTitle": "文件",
                            "useCount": null,
                            "description": "软件包",
                            "labelTypeName": "文件"
                        }, {
                            "labelId": 15,
                            "labelType": 4,
                            "labelTitle": "虚拟机",
                            "useCount": null,
                            "description": "虚拟机",
                            "labelTypeName": "对象"
                        }, {
                            "labelId": 16,
                            "labelType": 3,
                            "labelTitle": "linux",
                            "useCount": null,
                            "description": "linux",
                            "labelTypeName": "环境"
                        }, {
                            "labelId": 17,
                            "labelType": 3,
                            "labelTitle": "unix",
                            "useCount": null,
                            "description": "unix",
                            "labelTypeName": "环境"
                        }, {
                            "labelId": 18,
                            "labelType": 3,
                            "labelTitle": "windows",
                            "useCount": null,
                            "description": "windows",
                            "labelTypeName": "环境"
                        }, {
                            "labelId": 19,
                            "labelType": 3,
                            "labelTitle": "网络",
                            "useCount": null,
                            "description": "网络",
                            "labelTypeName": "环境"
                        }, {
                            "labelId": 20,
                            "labelType": 2,
                            "labelTitle": "巡检",
                            "useCount": null,
                            "description": "网络",
                            "labelTypeName": "场景"
                        }, {
                            "labelId": 21,
                            "labelType": 2,
                            "labelTitle": "编排",
                            "useCount": null,
                            "description": "编排",
                            "labelTypeName": "场景"
                        }, {
                            "labelId": 22,
                            "labelType": 2,
                            "labelTitle": "软件安装",
                            "useCount": null,
                            "description": "软件安装",
                            "labelTypeName": "场景"
                        }, {
                            "labelId": 23,
                            "labelType": 2,
                            "labelTitle": "安全扫描",
                            "useCount": null,
                            "description": "安全扫描",
                            "labelTypeName": "场景"
                        }, {
                            "labelId": 24,
                            "labelType": 3,
                            "labelTitle": "环境配置",
                            "useCount": null,
                            "description": "安全扫描",
                            "labelTypeName": "环境"
                        }], "rowCount": 23, "totalPage": 1
                    }
                }
                this.changeData(data.data.records);
            },
            changeData(data) {
                //转换
                let optionsObj = {};
                for (let i in data) {
                    let obj = data[i];
                    if (!optionsObj[obj.labelTypeName]) {
                        optionsObj[obj.labelTypeName] = [];
                    }
                    optionsObj[obj.labelTypeName].push({
                        value:{
                            labelId:obj.labelId,
                            labelTitle:obj.labelTitle,
                        },
                        labelTitle: obj.labelTitle,
                    })
                }
                //再转换
                let options = [];
                for (let j in optionsObj) {
                    options.push({
                        value: {
                            labelId:j,
                            labelTitle:j,
                        },
                        labelTitle: j,
                        children: optionsObj[j]
                    })
                }

                this.options = options;
            },
            closeTag(index) {
                this.selectValueList.splice(index, 1);
            },
            showCascader() {
                //点击按钮,触发级联显示
                this.$refs.cascaderRef.$el.click();
            },
            itemChangeEvent(item){
                //提示选中项的颜色
                let str=JSON.stringify(this.selectValueList);
                this.$nextTick(function () {
                    let arr=document.querySelectorAll('.cascaderClassName>.el-cascader-menu');
                    let obj=arr[arr.length-1];
                    for(let i=0;i<obj.children.length;i++){
                        let li=obj.children[i];
                        if(str.indexOf(li.innerText)>=0){
                            li.classList.add('green');
                        }else{
                            li.classList.remove('green');
                        }
                    }



                })
            },
            changeEvent(arr) {
                this.$nextTick(() => {
                    this.showCascader();
                    this.itemChangeEvent();
                });

                //点击后,不收起来,改写事件
                let len = arr.length;
                let value = arr[len - 1];
                let index = this.selectValueList.indexOf(value);
                if (index >= 0) {
                    this.selectValueList.splice(index, 1);
                } else {
                    if (this.selectValueList.length >= this.maxNum) {
                        this.$message.warning('最多选择' + this.maxNum + "条");
                        return;
                    }
                    this.selectValueList.push(value);
                }

            },
            loaded() {
                const contentWindow = this.$refs.iframe.contentWindow;
                console.log(contentWindow, 2);
                window.luojie = function () {
                    alert(123);
                }
                contentWindow.luozheao()

            }
        },
        components: {},
        created() {
            this.init();
        },
        mounted() {

            console.log(this.$refs.cascaderRef.$el, 11);
        }
    }
</script>


