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

</style>
<style lang="less" type="text/less" scoped>

</style>
<template>
    <div id="main">
        <el-form  :rules="rules" :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">

            <el-form-item>
                <div>
                    <el-form-item v-for="(domain, index) in dynamicValidateForm.domains" :label="'域名' + index" :key="index"
                                 >

                        <el-form-item  :prop="'domains.' + index + '.value1'" :rules="rules.haha"><el-input v-model="domain.value1"></el-input></el-form-item>
                        <el-form-item  :prop="'domains.' + index + '.value2'" :rules="rules.haha"><el-input v-model="domain.value2"></el-input></el-form-item>
                        <el-form-item  :prop="'domains.' + index + '.value3'" :rules="rules.haha"><el-input v-model="domain.value3"></el-input></el-form-item>
                        <!--<el-input v-model="domain.value1"></el-input>-->
                        <!--<el-input v-model="domain.value2"></el-input>-->
                        <!--<el-input v-model="domain.value3"></el-input>-->

                    </el-form-item>
                </div>
            </el-form-item>

            <el-form-item>
                <el-button @click="addDomain">新增域名</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                dynamicValidateForm: {
                    domains: [{
                        value1: '',
                        value2: '',
                        value3: '',
                    }],
                    email: ''
                },
                rules: {
                    name: [
                        {required: true, message: '请输入巡检项名称', trigger: 'blur'}
                    ],
                    classify: [
                        {required: true, message: '请选择类别', trigger: 'change'}
                    ],
                    outParamValue: [
                        {required: true, message: '请选择操作输出参数', trigger: 'change'}
                    ],
                    objectType:[
                        {required: true, message: '请选择对象类型', trigger: 'blur'}
                    ],

                    errorStandard:[
                        { required:true,validator: (rule, value, callback)=>{
                            let tag= value.arr.length==0;
                            if(!tag){
                                value.arr.forEach(item=>{
                                    if(!(item.joiner&&item.value&&item.operator)){
                                        tag=true;
                                    }
                                });
                            }
                            if(value.text){
                                callback('请输入操作出参异常标准');
                            }
                            else if(tag){
                                callback('请添加并完善操作出参异常标准的表达式');
                            }
                            else{
                                callback();
                            }
                        }, trigger: 'change' }
                    ],
                    haha:[
                        {
                            required: true,
                            validator:(rule, value, callback)=> {
                                console.log(rule, value);
                                callback(value);
                            },
                            trigger: 'blur'
                        }
                    ]
                },


            }
        },
        methods: {

            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            removeDomain(item) {
                var index = this.dynamicValidateForm.domains.indexOf(item)
                if (index !== -1) {
                    this.dynamicValidateForm.domains.splice(index, 1)
                }
            },
            addDomain() {
                this.dynamicValidateForm.domains.push({
                    value: '',
                    key: Date.now()
                });
            }
        },

        components: {},
        created() {

        }
    }
</script>


