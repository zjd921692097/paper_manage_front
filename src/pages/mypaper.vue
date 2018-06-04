<template>
<div class="page-body">
  <div class="page-header">
    <h1 class="page-title">我的论文</h1>
    <el-breadcrumb>
      <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item >我的论文</el-breadcrumb-item>

      
    </el-breadcrumb>
    
  </div>

  <div class="box">
   
 
    <el-button type="primary" icon="el-icon-edit" circle @click="addpp"></el-button>
 



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
    
      
      <el-table-column label="阅读次数" prop="readNum"></el-table-column>
      <el-table-column label="状态" prop="state"></el-table-column>
      
      <el-table-column label="操作" >
        <template slot-scope="scope">
            <el-button icon="el-icon-search" circle @click="view(scope.$index, scope.row)"></el-button>
          
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
          state: false,
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
        addpp:function(){
        this.$router.push({name: 'addpaper'});
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
          type: 'get',
          data: self.form,
          dataType: "text",
          crossDomain: true,
  
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
    view:function(index,row){
         console.log(row.title,row.id)
        //  $.ajax({
        //   url: 'http://localhost:9090/delatepaper',
        //   type: 'get',
        //   data: row,
        //   dataType: "text",
        //   async:false,
        //   success: function(data) {
        //     data=JSON.parse(data)
        //     // console.log(data)
        //     self.tableData=data
        //   },
        //   error: function(data) {
        //     //TODO 失败
        //     console.log("error", data)
        //   }
        // })
        
         this.$router.push({name: 'viewpaper',params:{paperid:row.id}});
    }
    

  },

  created: function() {
    var self = this;
    $.ajax({
          url: 'http://localhost:9090/getPaperListByUser',
          type: 'get',
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

<style>
  .box-body{
    width: 100%;
    overflow: auto;
  }
</style>
