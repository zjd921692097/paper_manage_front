<template>
<div class="page-body">
  <div class="page-header">
    <h1 class="page-title">论文类型</h1>
    <el-breadcrumb>
      <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item >论文类型</el-breadcrumb-item>     
    </el-breadcrumb>  
  </div>
  <div class="box">
    <el-button type="primary" icon="el-icon-edit" circle @click="dialogVisible = true"  style="margin: 0.5em 1em 1em 0em"></el-button>
    <el-dialog title="请输入类型"  :visible.sync="dialogVisible"  width="30%" :before-close="handleClose">
      <el-form :model="form">
    <el-form-item label="类型名称" :label-width="formLabelWidth">
      <el-input v-model="form.name" auto-complete="off"></el-input>
    </el-form-item>

  </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false;addType()">确 定</el-button>
      </span>
</el-dialog>
    <el-table :data='tableData'>  
      <!-- <el-table-column label="#" type="index"></el-table-column> -->
      <!-- <el-table-column label="ID" prop="id" ></el-table-column> -->
      <el-table-column label="类型" prop="name"></el-table-column>  
      <el-table-column label="操作" >
        <template slot-scope="scope">
            <m-button type="danger" @click="del(scope.$index, scope.row)">删除</m-button>
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
      dialogVisible: false,
      tableData: [],
      name:'',
      form:{
          id:'',        
          name:'',
        },
    }
    
  },
   methods: {
     addType:function(){
       console.log("12345");
       var self = this;
       $.ajax({
          url: 'http://localhost:9090/addPaperType',
          type: 'post',
          dataType: "text",
          data:self.form,
           async:false,
          xhrFields: {
           withCredentials: true
           },
          crossDomain: true,
          success: function(data) {
            data=JSON.parse(data)
            console.log(data)
            self.tableData=data;
            
          },
          error: function(data) {
            //TODO 失败
            console.log("error", data)
          }
        })
     },
     del:function(index,row){
       console.log("111");
       var self = this;
       self.form.name=row.name;
       $.ajax({
          url: 'http://localhost:9090/deletePaperType',
          type: 'post',
          dataType: "text",
          data:self.form,
           async:false,
          xhrFields: {
           withCredentials: true
           },
          crossDomain: true,
          success: function(data) {
            data=JSON.parse(data)
            console.log(data)
            self.tableData=data;
            
          },
          error: function(data) {
            //TODO 失败
            console.log("error", data)
          }
        })


     }
    
    
     
    },
  
  
    created: function() {
    var self = this;
    $.ajax({
          url: 'http://localhost:9090/getPaperTypes',
          type: 'post',
          dataType: "text",
          xhrFields: {
           withCredentials: true
           },
          crossDomain: true,
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