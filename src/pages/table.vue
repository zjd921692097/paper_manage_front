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
    <el-form ref="form" :model="form" label-width="180px">
      <el-form-item label="创建时间" label-width="80px">
         <el-col :span="3">
           <el-date-picker type="date" placeholder="选择日期"  v-model="form.date1" style="width: 100%"></el-date-picker>
        </el-col>
        <el-col class="line" :span="0.7">- </el-col>
        <el-col :span="3">
           <el-date-picker type="date" placeholder="选择日期" v-model="form.date2" style="width: 100%"></el-date-picker>
        </el-col>
     
        
        <el-col class="line" :span="2" style="text-align:center">用户ID</el-col>
        <el-col class="line" span="3">
           <el-input v-model="form.userId" placeholder="请输入用户名" span="3"></el-input>
        </el-col>
       
        
      </el-form-item>
     
      <el-form-item label="更新时间" label-width="80px">
         <el-col :span="3">
           <el-date-picker type="date" placeholder="选择日期"  v-model="form.date3" style="width: 100%"></el-date-picker>
        </el-col>
        <el-col class="line" :span="0.7">- </el-col>
        <el-col :span="3">
           <el-date-picker type="date" placeholder="选择日期" v-model="form.date4" style="width: 100%"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2" style="text-align:center">标题</el-col>
        
        <el-col class="line" span="3">
           <el-input v-model="form.title" placeholder="请输入标题" span="3"></el-input>
        </el-col>
        <el-col class="line" span="7" style="text-align:right">
           <el-button type="primary" @click="onSubmit" >查询</el-button>
        </el-col>
      </el-form-item>
     
     
      
    </el-form>
    
 



     <!-- <Row>
      
        <Col span="12">
            <DatePicker type="daterange" placement="bottom-end" placeholder="Select date" style="width: 200px"></DatePicker>
        </Col>
    </Row> -->
    <el-table :data='tableData'>
      <!-- <el-table-column label="#" type="index"></el-table-column> -->
      <el-table-column label="ID" prop="id" >
        {scope.row.id}
        <!-- <p>{{ scope.row.id}}</p> -->
      </el-table-column>
      <el-table-column label="标题" prop="title"></el-table-column>
      <el-table-column label="类型" prop="typeName"></el-table-column>
      <el-table-column label="创建时间" prop="createdtime"></el-table-column>
      <el-table-column label="更新时间" prop="updatedtime"></el-table-column>
    
      <el-table-column label="用户id" prop="userid"></el-table-column>
      <el-table-column label="阅读次数" prop="readNum"></el-table-column>
      <el-table-column label="状态" prop="state"></el-table-column>
 
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button icon="el-icon-search" circle @click="view(scope.$index, scope.row)"></el-button>   
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
       pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
        },
        form:{
          date1: '',
          date2: '',
          date3: '',
          date4: '',
          title:'',
          userId:'',
          
        },
     
      timer: null,
      activeName: '论文表格',
      tableData: [],
    }
  },
  methods:{
    dateChange: function (deliveryDate) {
     var time = deliveryDate;//获取当前日期空间时间
     if (time) {
     var date = new Date(Date.parse(time));
     var newDate = date.getFullYear() + "-" + (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + "-" + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
      return newDate ;
         }
        },   
    onSubmit:function(){
      var self=this;
      var datein;
    
      self.form.date1=this.dateChange(self.form.date1);
      self.form.date2=this.dateChange(self.form.date2);
      self.form.date3=this.dateChange(self.form.date3);
      self.form.date4=this.dateChange(self.form.date4);
      console.log(self.form.date1);

      console.log(self.form)
       $.ajax({
          url: 'http://localhost:9090/getPaperListByCon',
          type: 'post',
          data: self.form,
          dataType: "text",
          async:false,
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
    del:function(index,row){
      console.log(row)
         $.ajax({
          url: 'http://localhost:9090/deletePaper',
          type: 'post',
          data: row,
          dataType: "text",
          async:false,
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
        });
          var self = this;
    $.ajax({
          url: 'http://localhost:9090/getPaperList',
          type: 'post',
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
       view:function(index,row){
         console.log(row.title,row.id)        
         this.$router.push({name: 'viewpapermanage',params:{id:row.id}});
    }
    
    

  },

  created: function() {
    var self = this;
    $.ajax({
          url: 'http://localhost:9090/getPaperList',
          type: 'post',
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
