<template>
<div class="page-body">
  <div class="page-header">
    <h1 class="page-title">审核日志</h1>
    <el-breadcrumb>
      <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item >审核日志</el-breadcrumb-item>
    </el-breadcrumb>
  </div>

  <div class="box">
    <!-- <el-form ref="form" :model="form" label-width="180px">
      <el-form-item label="创建时间" label-width="80px">
         <el-col :span="3">
           <el-date-picker type="date" placeholder="选择日期"  v-model="form.date1" style="width: 100%"></el-date-picker>
        </el-col>
        <el-col class="line" :span="0.7">- </el-col>
        <el-col :span="3">
           <el-date-picker type="date" placeholder="选择日期" v-model="form.date2" style="width: 100%"></el-date-picker>
        </el-col>
     
        
        <el-col class="line" :span="2" style="text-align:center">用户名</el-col>
        <el-col class="line" span="3">
           <el-input v-model="form.userId" placeholder="请输入用户名" span="3"></el-input>
        </el-col>
        <el-col class="line" :span="2" style="text-align:center">审核</el-col>
        <el-switch v-model="form.state"></el-switch>
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
     
     
      
    </el-form> -->
    
 



     <!-- <Row>
      
        <Col span="12">
            <DatePicker type="daterange" placement="bottom-end" placeholder="Select date" style="width: 200px"></DatePicker>
        </Col>
    </Row> -->
    <el-table :data='pageSizesList'>
      <!-- <el-table-column label="#" type="index"></el-table-column> -->
     
      <el-table-column label="ID" prop="id"></el-table-column>
      <el-table-column label="论文名称" prop="paperName"></el-table-column>
      <el-table-column label="创建时间" prop="createdtime"></el-table-column>
    
      <el-table-column label="审核者ID" prop="checkuserid"></el-table-column>
      <el-table-column label="审核结果" prop="updatedstate"></el-table-column>
    

    </el-table>
  </div>
<div style="margin: 5em 1em 1em 50em">
<el-pagination
  background
  @current-change="handleCurrentChange"
  @prev-click="prev"
  @next-click="next"
 :current-page.sync="form.pageNo"

  layout="prev, pager, next"
   :page-sizes="pageSizesList"
  :page-size=30
  :total="total">
</el-pagination>
</div>
   
</div>


</template>



<script>
import $ from 'jquery'
export default{
  data() {
    return {
     pageSizesList: [],
     form:{
       pageNo:1   
     }
    
    }
    total:''
  },
  methods:{
       handleCurrentChange(val) {
        console.log('当前页:',val)
        this.form.pageNo=val;
        this.getLog()
        console.log("bbb",this.pageSizesList)
      
    },
    prev:function(val) {
      var self=this
      console.log("re1",val)
      this.form.pageNo=val;
        this.getLog()
    },
     next:function(val) {
      // self.form.pageNo=self.form.pageNo+1
      console.log("re2",val)
      this.form.pageNo=val;
        this.getLog()
    },
    dateChange: function (deliveryDate) {
     var time = deliveryDate;//获取当前日期空间时间
     if (time) {
     var date = new Date(Date.parse(time));
     var newDate = date.getFullYear() + "-" + (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + "-" + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
      return newDate ;
         }
        },  
      getLog:function(){
        var self=this
         $.ajax({
          url: 'http://localhost:9090/getLogs',
          type: 'post',
          data:this.form,
          dataType: "text",
          async:false,
          success: function(data) {
            data=JSON.parse(data)
            console.log(data)
            self.pageSizesList=data
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
          url: 'http://localhost:9090/getLogs',
          type: 'post',
          data:this.form,
          dataType: "text",
          async:false,
          success: function(data) {
            data=JSON.parse(data)
            console.log(data)
            self.pageSizesList=data
          },
          error: function(data) {
            //TODO 失败
            console.log("error", data)
          }
        })
        $.ajax({
          url: 'http://localhost:9090/getTotal',
          type: 'post',
          dataType: "text",
          async:false,
          success: function(data) {
            data=JSON.parse(data)
            console.log(data)
            self.total=data
          },
          error: function(data) {
            //TODO 失败
            console.log("error", data)
          }
        })
        console.log("aaa",self.total)
  },
}
</script>

<style>
  .box-body{
    width: 100%;
    overflow: auto;
  }
</style>
