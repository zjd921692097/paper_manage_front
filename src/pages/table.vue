<template>
<div class="page-body">
  <div class="page-header">
    <h1 class="page-title">论文统计</h1>
    <el-breadcrumb>
      <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item >论文统计</el-breadcrumb-item>
    </el-breadcrumb>
  </div>

  <div class="box">
     <!-- <Row>
      
        <Col span="12">
            <DatePicker type="daterange" placement="bottom-end" placeholder="Select date" style="width: 200px"></DatePicker>
        </Col>
    </Row> -->
    <el-table :data='tableData'>
      <!-- <el-table-column label="#" type="index"></el-table-column> -->
      <el-table-column label="ID" prop="id" ></el-table-column>
      <el-table-column label="标题" prop="title"></el-table-column>
      <el-table-column label="创建时间" prop="createdtime"></el-table-column>
      <el-table-column label="更新时间" prop="updatedtime"></el-table-column>
    
      <el-table-column label="用户id" prop="userid"></el-table-column>
      <el-table-column label="状态" prop="state"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <m-button type="danger" v-on:click="del">删除</m-button>
        </template>
      </el-table-column>
    </el-table>
  </div> 
</div>


</template>

<script>
import $ from 'jquery'
export default{
  data() {
    return {
      timer: null,
      activeName: '论文表格',
      tableData: [],
    }
  },
  methods:{
    del:function(event){
      console.log("delete")
    }
    

  },

  created: function() {
    var self = this;
    $.ajax({
          url: 'http://localhost:9090/getPaperList',
          type: 'get',
          dataType: "text",
          async:false,
          success: function(data) {
            data=JSON.parse(data)
            console.log(data)
            self.tableData=data
          },
          error: function(data) {
            //TODO 失败
            console.log("error", data)
          }
        })
  },
}
</script>

<style>
  .box-body{
    width: 100%;
    overflow: auto;
  }
</style>
