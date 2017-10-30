<style type="text/less" scoped>
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
    #mapBox{
        margin-left: 200px;
        height: 400px;
        width: 600px;
        border: 1px solid #333;
    }
</style>

<template>
    <div>
        <div class="box">
            <p class="title">定位范围限制</p>
            <div class="bodyBox">
                <el-row>
                    <el-col :span="24">
                        <el-button type="primary" @click="addPositionFn">添加位置</el-button>
                        <el-dialog title="添加位置" :visible.sync="dialogFormVisible" size="large">
                            <el-form :model="form">
                                <el-form-item label="范围名称" :label-width="formLabelWidth">
                                    <el-input v-model="form.range_name" auto-complete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="坐标" :label-width="formLabelWidth">
                                    <el-input v-model="form.coordinate" auto-complete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="半径" :label-width="formLabelWidth">
                                    <el-input v-model="form.radius" auto-complete="off"></el-input>
                                </el-form-item>
                            </el-form>
                            <div id='mapBox' style="margin-bottom: 10px">

                            </div>
                            <el-form :inline="true">
                                <el-form-item label="城市名称" :label-width="formLabelWidth">
                                    <el-input v-model="cityName" auto-complete="off" ></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary"  @click="searchCity">查询</el-button>
                                </el-form-item>
                            </el-form>
                            <div slot="footer" class="dialog-footer">
                                <el-button @click="dialogFormVisible = false">取 消</el-button>
                                <el-button type="primary" @click="addarea">确 定</el-button>
                            </div>
                        </el-dialog>
                        <el-input style="display: inline-block;width:300px;"
                                  placeholder="位置名称"
                                  icon="search"
                                  v-model="inputSearch"
                                  :on-icon-click="inputSearchClick">
                        </el-input>
                    </el-col>
                </el-row>
                <el-table
                        :data="tableData.data"
                        max-height="250"
                        border
                        style="margin-top: 10px;">
                    <el-table-column
                            prop="name"
                            label="位置名称"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="range"
                            label="范围"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="longitude"
                            label="经度"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="latitude"
                            label="纬度"
                    >
                    </el-table-column>
                    <el-table-column
                            label="操作">
                        <template scope="scope">
                            <el-button type="danger" size="mini" @click="deleteLi(scope.$index, scope.row)">删除</el-button>
                            <el-button type="info" size="mini"  @click="changeLi(scope.$index, scope.row)">修改</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="block" style="text-align: right;margin-top: 5px;">
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page.sync="tableData.current_page"
                            layout="total, prev, pager, next"
                            :total="tableData.total">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="es6">
    export default {
//        props: ['param', 'data'],
        data() {
            return  {
                map:'',
                cityName:'',
                inputSearch:'',
                isChange:false,
                currentId:'',
                formLabelWidth:'120px',
                current_page:0,
                dialogFormVisible:false,
                tableData:{
                    data:[{
                        name: '',
                        remark:'',
                        range: '',
                        longitude:'',
                        latitude:'',
                        id: ''
                    }],
                    current_page: 0,
                    from: 1,
                    last_page: 2,
                    next_page_url: "http://localhost:809/area/area_list?page=2",
                    path: "http://localhost:809/area/area_list",
                    per_page: 2,
                    prev_page_url: null,
                    to: 2,
                    total: 3
                },
                form:{
                    qid:'',
                    range_name:'',
                    coordinate:'',
                    radius:''
                }
            }
        },
        methods: {
            init(){
                this.form.qid=window.QID;
                //获取列表数据
                this.initTable();

                //获取所属项目下拉框
                this.$http.get('/area/beyond_project',{}).then(function(response) {
                    this.form.region=response.data.data
                    console.log(this.form.region)
                },function(response) {
                });
            },
            initTable(){
                //获取列表数据
                this.$http.get('/question/range_list',{params:{'page':1,'qid':window.QID}}).then(function(response) {
                    this.tableData=response.data.data
                },function(response) {

                });
            },
            //点击添加位置
            addPositionFn(){
                let self=this;
                    this.form.range_name='',
                  this.form.coordinate='',
                    this.form.radius=''
                this.dialogFormVisible = true
                this.isChange=false
                setTimeout(function () {
                    //生成百度地图
                    self.showBaiduMap()
                })

            },
            //搜索按钮
            inputSearchClick(val){
                this.$http.get('',{params:{'keyword':this.inputSearch,'qid':window.QID}}).then(function(response) {
                    if(response.data.data.length){
                        this.tableData.data=response.data.data
                    }

                },function(response) {
                });
            },
            //删除一项
            deleteLi(index, data){
                if(data){
                    this.$confirm('是否删除'+data.name+'?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$http.post('/question/del_range',{'id':data.id}).then(
                            function(response) {
                                let isSuccess= response.data.code=='200';
                                if(isSuccess){
                                    this.initTable();
                                    this.$message({
                                        message: response.data.data,
                                        type:isSuccess?'success':'error'
                                    });
                                }else{
                                    this.$message({
                                        message: response.data.message,
                                        type:isSuccess?'success':'error'
                                    });
                                }
                            },
                            function(response) {
                                this.$message({
                                    message: response.data,
                                    type: 'error'
                                });
                            });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    })
                }
            },
            //修改一项
            changeLi(index, rows){
                let self =this
                this.dialogFormVisible = true
                this.isChange=true
                setTimeout(function () {
                    //生成百度地图
                    self.showBaiduMap()
                })
                this.form.id=window.QID
                this.form.range_name=rows.name
                    this.form.coordinate=rows.longitude+','+rows.latitude
                    this.form.radius=rows.range
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                //获取翻页列表数据
                this.$http.get('/question/range_list',{params:{'page':val,'qid':window.QID}}).then(function(response) {
                    this.tableData=response.data.data
                },function(response) {

                });
            },
            //添加页面的确定按钮
            addarea(){
                if(this.isChange){
                    this.$http.post('/question/edit_range',this.form).then(function(response) {
                        this.form.region=response.data.data
                        let isSuccess= response.body.code=='200';
                        if(isSuccess){
                            this.initTable();
                            this.$message({
                                message: response.data.data,
                                type:isSuccess?'success':'error'
                            });
                        }else{
                            this.$message({
                                message: response.data.message,
                                type:'error'
                            });
                        }

                    },function(response) {
                        this.$message({
                            message: response.data,
                            type: 'error'
                        });
                    });
                }else{
                    this.$http.post('/question/add_range',this.form).then(function(response) {
                        this.form.region=response.data.data
                        let isSuccess= response.data.code=='200';
                        if(isSuccess){
                            this.initTable();
                            this.$message({
                                message: response.data.data,
                                type:'success'
                            });
                        }else {
                            this.$message({
                                message: response.data.message,
                                type:'error'
                            });
                        }
                    },function(response) {
                        this.$message({
                            message: response.data,
                            type: 'error'
                        });
                    });
                }

                this.dialogFormVisible = false
            },
            //生成百度地图
            showBaiduMap(){
                let self=this;
                // 百度地图API功能
                var map = new BMap.Map("mapBox");          // 创建地图实例
                var point = new BMap.Point(116.404, 39.915);  // 创建点坐标
                map.centerAndZoom(point, 15);                 // 初始化地图，设置中心点坐标和地图级别
                map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
                map.addEventListener("click", function(e){
                    self.form.coordinate=e.point.lng+','+e.point.lat

                    var point = new BMap.Point(e.point.lng, e.point.lat);
                    var infoWindow = new BMap.InfoWindow(self.form.coordinate);  // 创建信息窗口对象
                    map.openInfoWindow(infoWindow,point);
                });
                self.map=map;
            },
            searchCity(){
                let self=this;
                this.map.centerAndZoom(self.cityName,11);
            }
        },
        created() {
            this.init();
        },
    }
</script>